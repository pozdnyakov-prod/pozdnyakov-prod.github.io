// Интро: белый экран с контурным POZDNYAKOV PROD, 3D-кисть по скроллу
// закрашивает его тремя широкими мазками. Сцена в координатах 1440×900
// (slice, как preserveAspectRatio="xMidYMid slice").
//
// Белый слой — статичный SVG. Закрашенный слой (краска с ворсом и бликом,
// чёрный текст, мятная скрепка, обрезанные по форме мазков с рваным краем)
// заранее рисуется в canvas один раз. На каждом кадре в видимом canvas
// рисуется только мазок «докуда дошла кисть» и через него проявляется
// готовая картинка — так скролл держит 60 fps.
//
// После последнего мазка интро уходит вглубь (уменьшается, темнеет), а сайт
// выезжает поверх него отдельной карточкой: прогресс ухода пишется в
// CSS-переменную --intro-exit, по ней первый экран скругляет верх.
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

const VB_W = 1440
const VB_H = 900
const TRAVEL = 1400

const PATH =
  "M -260 200 C 300 120, 1000 240, 1700 160 C 1960 130, 1960 480, 1700 465 C 1100 445, 400 525, -260 455 C -520 440, -520 770, -260 765 C 400 765, 1000 695, 1720 745"

const PAINT = "#E30613"
const INK = "#0E0E10"
const MUTED = "#55555B"

// Рваный край сухой кисти: тот же путь со сдвигом, пунктир, убывающая плотность
const FIBERS: [number, number, number, string, number][] = [
  [-99.3, 2.0, 1.0, "222 36 99 11 54 7 225 41", 148],
  [-104.3, 4.6, 0.93, "133 39 294 29 161 55 108 58", 54],
  [-106.5, 5.3, 0.86, "33 59 348 57 153 57 159 18", 84],
  [-110.2, 4.0, 0.79, "394 60 210 11 330 27 363 30", 259],
  [-113.6, 2.6, 0.72, "163 11 300 59 173 6 169 42", 159],
  [-118.7, 3.6, 0.65, "231 33 326 24 240 34 102 20", 156],
  [-120.8, 4.7, 0.58, "61 8 256 46 163 39 293 47", 241],
  [-125.5, 2.2, 0.51, "364 18 54 32 123 46 343 34", 141],
  [-127.8, 3.3, 0.44, "321 26 344 41 121 26 71 59", 31],
  [100.5, 2.7, 1.0, "318 45 141 13 189 17 168 35", 13],
  [102.4, 4.3, 0.93, "166 53 365 26 29 26 167 26", 78],
  [107.8, 3.2, 0.86, "337 49 59 24 336 18 247 24", 69],
  [110.1, 3.9, 0.79, "101 27 313 6 206 8 252 16", 186],
  [115.0, 3.0, 0.72, "168 42 69 34 126 33 126 13", 30],
  [116.7, 4.5, 0.65, "324 49 96 44 40 40 271 43", 127],
  [121.0, 1.7, 0.58, "290 24 416 32 353 18 264 18", 123],
  [124.8, 3.5, 0.51, "132 32 247 21 351 33 130 37", 96],
  [127.4, 2.6, 0.44, "144 39 126 55 138 32 153 15", 166],
]

// Кисть: 9 кадров изгиба ворса от -0.48 до +0.48, кончик в исходных пикселях
const BRUSH_SCALE = 0.62
const BRUSH_W = 203
const BRUSH_H = 331
const BRUSH_TIPS = [
  [152, 522],
  [134, 510],
  [116, 498],
  [98, 486],
  [81, 474],
  [63, 462],
  [45, 450],
  [27, 438],
  [11, 427],
]

// Надпись: Unbounded 800, 96 при ширине 1440, зазор под скрепку 44
const FONT = 96
const GAP = 44
const BASELINE = 472
const SUB_Y = 556
const SUBTITLE = "Личный бренд для дизайнеров"
const TITLE_FONT = '"Unbounded Variable", Unbounded, sans-serif'
const TEXT_FONT = '"Manrope Variable", Manrope, sans-serif'

const CLIP_BACK = "/intro/clip-long.webp"
const CLIP_FRONT = "/intro/clip-long-front.webp"

const svgUrl = (body: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" width="${VB_W}" height="${VB_H}">${body}</svg>`,
  )}`

// Форма мазков: основной путь + волокна, лёгкое смещение краёв
const STROKES_IMG = svgUrl(
  `<defs><filter id="e" filterUnits="userSpaceOnUse" x="-600" y="-300" width="2700" height="1500">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.035 0.08" numOctaves="2" seed="11" result="n"/>` +
    `<feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter></defs>` +
    `<g filter="url(#e)"><path d="${PATH}" fill="none" stroke="#fff" stroke-width="206" stroke-linecap="round"/>` +
    FIBERS.map(
      ([dy, w, o, dash, off]) =>
        `<path d="${PATH}" transform="translate(0 ${dy})" fill="none" stroke="#fff" stroke-opacity="${o}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${dash}" stroke-dashoffset="${off}"/>`,
    ).join("") +
    `</g>`,
)

// Краска: цвет, волокна ворса, диагональный блик
const PAINT_IMG = svgUrl(
  `<defs><filter id="f" filterUnits="userSpaceOnUse" x="0" y="0" width="${VB_W}" height="${VB_H}">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.0018 0.32" numOctaves="2" seed="5"/>` +
    `<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.72"/></filter>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"/>` +
    `<stop offset="0.45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.18"/></linearGradient></defs>` +
    `<rect width="${VB_W}" height="${VB_H}" fill="${PAINT}"/>` +
    `<rect width="${VB_W}" height="${VB_H}" filter="url(#f)" opacity="0.28"/>` +
    `<rect width="${VB_W}" height="${VB_H}" fill="url(#g)"/>`,
)

// Плёночное зерно
const GRAIN_IMG = svgUrl(
  `<filter id="n" filterUnits="userSpaceOnUse" x="0" y="0" width="${VB_W}" height="${VB_H}">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" stitchTiles="stitch"/>` +
    `<feColorMatrix type="saturate" values="0"/></filter><rect width="${VB_W}" height="${VB_H}" filter="url(#n)"/>`,
)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const qOf = (p: number) => clamp01((p - 0.02) / 0.94)

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

type Layout = { ready: boolean; s: number; x1: number; x2: number; cx: number }

/* Пересчёт координат сцены в пиксели экрана: k px на единицу, сдвиг ox/oy */
type View = { w: number; h: number; dpr: number; k: number; ox: number; oy: number }

function viewOf(el: HTMLElement): View {
  const w = el.clientWidth || window.innerWidth
  const h = el.clientHeight || window.innerHeight
  const k = Math.max(w / VB_W, h / VB_H)
  return { w, h, dpr: Math.min(window.devicePixelRatio || 1, 2), k, ox: (w - VB_W * k) / 2, oy: (h - VB_H * k) / 2 }
}

const clipRect = ({ s, cx }: Layout) => ({
  // 196×35: центр — середина зазора и середина заглавных (высота 72 при кегле 96)
  x: cx - 98 * s,
  y: BASELINE - (36 + 17.5) * s,
  w: 196 * s,
  h: 35 * s,
})

export function Intro() {
  const reduce = Boolean(useReducedMotion())
  const wrapRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const t1Ref = useRef<SVGTextElement>(null)
  const t2Ref = useRef<SVGTextElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brushRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const hintRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)

  const [layout, setLayout] = useState<Layout>({ ready: false, s: 1, x1: 128, x2: 1000, cx: 978 })
  const [assets, setAssets] = useState<HTMLImageElement[] | null>(null)
  const widths = useRef<{ w1: number; w2: number } | null>(null)

  // Общее для кадра: вид, готовая закрашенная картинка, флаг «перерисовать»
  const view = useRef<View | null>(null)
  const painted = useRef<HTMLCanvasElement | null>(null)
  const dirty = useRef(true)

  // Строка по центру; на узком экране кегль уменьшается, чтобы влезла целиком
  useEffect(() => {
    const place = () => {
      const m = widths.current
      const el = stickyRef.current
      if (!m || !el) return
      const v = viewOf(el)
      const visible = Math.min(VB_W, v.w / v.k)
      const full = m.w1 + GAP + m.w2
      const s = Math.min(1, (visible * 0.88) / full)
      const left = VB_W / 2 - (full * s) / 2
      setLayout({ ready: true, s, x1: left, x2: left + (m.w1 + GAP) * s, cx: left + (m.w1 + GAP / 2) * s })
    }
    const measure = () => {
      const a = t1Ref.current
      const b = t2Ref.current
      if (!a || !b) return
      const cur = Number(a.getAttribute("font-size")) || FONT
      const w1 = (a.getComputedTextLength() * FONT) / cur
      const w2 = (b.getComputedTextLength() * FONT) / cur
      if (!w1 || !w2) return
      widths.current = { w1, w2 }
      place()
    }
    let alive = true
    Promise.all([
      document.fonts?.load(`800 ${FONT}px "Unbounded Variable"`),
      document.fonts?.load(`500 20px "Manrope Variable"`),
      document.fonts?.load(`600 20px "Manrope Variable"`),
    ])
      .catch(() => undefined)
      .then(() => document.fonts?.ready)
      .then(() => alive && measure())
    window.addEventListener("resize", place)
    return () => {
      alive = false
      window.removeEventListener("resize", place)
    }
  }, [])

  // Картинки для закрашенного слоя, грузятся один раз
  useEffect(() => {
    let alive = true
    Promise.all([PAINT_IMG, STROKES_IMG, CLIP_BACK, CLIP_FRONT].map(loadImage))
      .then((imgs) => alive && setAssets(imgs))
      .catch(() => undefined)
    return () => {
      alive = false
    }
  }, [])

  // Закрашенный слой целиком: рисуется заново только при смене размера
  useEffect(() => {
    const el = stickyRef.current
    const canvas = canvasRef.current
    const a = t1Ref.current
    const b = t2Ref.current
    if (!layout.ready || !assets || !el || !canvas || !a || !b) return
    const [paintImg, strokesImg, clipBack, clipFront] = assets
    pathLength = pathRef.current?.getTotalLength() || pathLength
    const v = viewOf(el)
    view.current = v

    const W = Math.round(v.w * v.dpr)
    const H = Math.round(v.h * v.dpr)
    canvas.width = W
    canvas.height = H

    const off = document.createElement("canvas")
    off.width = W
    off.height = H
    const g = off.getContext("2d")
    if (!g) return
    g.setTransform(v.dpr * v.k, 0, 0, v.dpr * v.k, v.dpr * v.ox, v.dpr * v.oy)
    g.drawImage(paintImg, 0, 0, VB_W, VB_H)

    const c = clipRect(layout)
    g.drawImage(clipBack, c.x, c.y, c.w, c.h)

    // Буквы ставим в те же точки, что у контурного текста, — совпадают 1 в 1
    g.fillStyle = INK
    g.textBaseline = "alphabetic"
    g.font = `800 ${FONT * layout.s}px ${TITLE_FONT}`
    for (const t of [a, b]) {
      const text = t.textContent ?? ""
      for (let i = 0; i < text.length; i++) {
        const pos = t.getStartPositionOfChar(i)
        g.fillText(text[i], pos.x, pos.y)
      }
    }
    g.font = `600 20px ${TEXT_FONT}`
    g.textAlign = "center"
    g.fillText(SUBTITLE, VB_W / 2, SUB_Y)

    g.drawImage(clipFront, c.x, c.y, c.w, c.h)

    // Обрезать по форме мазков с рваным краем
    g.globalCompositeOperation = "destination-in"
    g.drawImage(strokesImg, 0, 0, VB_W, VB_H)

    painted.current = off
    dirty.current = true

    // Кисть в пикселях экрана
    framesRef.current.forEach((img) => {
      if (!img) return
      img.style.width = `${BRUSH_W * v.k}px`
      img.style.height = `${BRUSH_H * v.k}px`
      img.style.filter = `drop-shadow(0 ${24 * v.k}px ${36 * v.k}px rgba(20, 20, 30, 0.2))`
    })

    if (reduce) drawPaint(canvas, v, off, 1)
  }, [layout, assets, reduce])

  // Кадр: сглаженный прогресс → мазок, кисть, подсказка, уход интро
  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    const canvas = canvasRef.current
    if (!wrap || !path || !canvas) return

    const root = document.documentElement
    if (reduce) {
      root.style.setProperty("--intro-exit", "1")
      if (brushRef.current) brushRef.current.style.opacity = "0"
      if (hintRef.current) hintRef.current.style.opacity = "0"
      return () => root.style.removeProperty("--intro-exit")
    }

    const total = path.getTotalLength()
    pathLength = total
    let sp: number | null = null
    let lastQ = 0
    let bend = 0
    let shownIdx = -1
    let raf = 0
    let running = false
    let last = { q: -1, x: "", op: "", hint: "", exit: "" }

    // Уход интро: 0 — мазки закончены, 1 — сайт целиком на экране
    const writeExit = (e: number) => {
      const val = e.toFixed(3)
      if (val === last.exit) return
      last.exit = val
      root.style.setProperty("--intro-exit", val)
      const k = e * e * (3 - 2 * e)
      if (sceneRef.current) {
        sceneRef.current.style.transform = `translateY(${-6 * k}%) scale(${1 - 0.12 * k})`
        sceneRef.current.style.borderRadius = `${40 * k}px`
      }
      if (dimRef.current) dimRef.current.style.opacity = (0.55 * k).toFixed(3)
    }

    const scrolled = () => -wrap.getBoundingClientRect().top
    const vh = () => stickyRef.current?.offsetHeight ?? window.innerHeight

    const frame = () => {
      const top = scrolled()
      writeExit(clamp01((top - TRAVEL) / vh()))
      const p0 = clamp01(top / TRAVEL)
      sp = sp === null ? p0 : sp + (p0 - sp) * 0.11
      if (Math.abs(sp - p0) < 0.0004) sp = p0
      const p = sp
      const q = qOf(p)
      const dq = q - lastQ
      lastQ = q

      const v = view.current
      const off = painted.current
      if (v && off && (dirty.current || Math.abs(q - last.q) > 0.00005)) {
        drawPaint(canvas, v, off, q)
        last.q = q
        dirty.current = false
      }

      const at = Math.max(0.5, q * total)
      const pt = path.getPointAtLength(at)

      // Ворс тянется против движения и выпрямляется, когда скролл встал
      let target = 0
      if (dq !== 0) {
        const prev = path.getPointAtLength(Math.max(0, at - 8))
        const len = Math.hypot(pt.x - prev.x, pt.y - prev.y) || 1
        const tx = (pt.x - prev.x) / len
        target = tx * Math.sign(dq) * Math.min(1, Math.abs(dq) * 140) * 0.48
      }
      bend += (target - bend) * 0.16
      if (Math.abs(bend) < 0.002) bend = 0
      const idx = Math.max(0, Math.min(8, Math.round((bend + 0.48) / 0.12)))

      const img = framesRef.current[idx]
      if (idx !== shownIdx) {
        const prevImg = framesRef.current[shownIdx]
        if (prevImg) prevImg.style.opacity = "0"
        if (img) img.style.opacity = "1"
        shownIdx = idx
        last.x = ""
      }
      if (img && v) {
        // Кончик кисти в точке пути, на 20 ниже
        const tip = BRUSH_TIPS[idx]
        const x = v.ox + (pt.x - tip[0] * BRUSH_SCALE) * v.k
        const y = v.oy + (pt.y + 20 - tip[1] * BRUSH_SCALE) * v.k
        const tr = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        if (tr !== last.x) img.style.transform = last.x = tr
      }

      const op = (Math.min(1, p / 0.03) * (q >= 1 ? 0 : 1)).toFixed(3)
      if (op !== last.op && brushRef.current) brushRef.current.style.opacity = last.op = op

      const hint = Math.max(0, 1 - p * 25).toFixed(3)
      if (hint !== last.hint && hintRef.current) hintRef.current.style.opacity = last.hint = hint

      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Считаем кадры, только пока интро на экране
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) return start()
      stop()
      // Проскочили интро якорем или вернулись наверх — состояние без анимации
      writeExit(scrolled() > TRAVEL ? 1 : 0)
    })
    io.observe(wrap)
    return () => {
      io.disconnect()
      stop()
      last = { q: -1, x: "", op: "", hint: "", exit: "" }
      root.style.removeProperty("--intro-exit")
    }
  }, [reduce])

  const { s, x1, x2 } = layout
  const clip = clipRect(layout)

  return (
    <div
      ref={wrapRef}
      id="intro"
      className="relative bg-white"
      // +100svh на уход; сайт заезжает на этот последний экран сверху
      style={reduce ? { height: "100svh" } : { height: `calc(200svh + ${TRAVEL}px)`, marginBottom: "-100svh" }}
    >
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden bg-[#0E0E10]">
        <div ref={sceneRef} className="absolute inset-0 overflow-hidden bg-white will-change-transform">
          {/* Белый экран: контурная надпись, скрепка продета в V и P */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="POZDNYAKOV PROD — личный бренд для дизайнеров"
            className="absolute inset-0 block h-full w-full"
          >
            <path ref={pathRef} d={PATH} fill="none" stroke="none" />
            <image
              href="/intro/clip-long-outline.webp"
              x={clip.x}
              y={clip.y}
              width={clip.w}
              height={clip.h}
              preserveAspectRatio="none"
            />
            {[
              { ref: t1Ref, x: x1, text: "POZDNYAKOV" },
              { ref: t2Ref, x: x2, text: "PROD" },
            ].map((t) => (
              <text
                key={t.text}
                ref={t.ref}
                x={t.x}
                y={BASELINE}
                fontFamily={TITLE_FONT}
                fontWeight={800}
                fontSize={FONT * s}
                letterSpacing={-2 * s}
                fill="#FFFFFF"
                // Обводка под заливкой: внутренние перекрытия контуров шрифта не видны
                stroke={INK}
                strokeWidth={3}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {t.text}
              </text>
            ))}
            <text
              x={VB_W / 2}
              y={SUB_Y}
              textAnchor="middle"
              fontFamily={TEXT_FONT}
              fontWeight={500}
              fontSize={20}
              fill={MUTED}
            >
              {SUBTITLE}
            </text>
            <image
              href="/intro/clip-long-front-outline.webp"
              x={clip.x}
              y={clip.y}
              width={clip.w}
              height={clip.h}
              preserveAspectRatio="none"
            />
          </svg>

          {/* Закрашенный слой */}
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />

          {/* 3D-кисть: виден один кадр изгиба, остальные загружены заранее */}
          <div ref={brushRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
            {BRUSH_TIPS.map((_, i) => (
              <img
                key={i}
                ref={(img) => {
                  framesRef.current[i] = img
                }}
                src={`/intro/brush-b${i}.webp`}
                alt=""
                draggable={false}
                className="absolute top-0 left-0 max-w-none opacity-0 will-change-transform select-none"
                style={{ width: BRUSH_W * 0.62, height: BRUSH_H * 0.62, transform: "translate3d(-999px, -999px, 0)" }}
              />
            ))}
          </div>

          {/* Плёночное зерно поверх сцены */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
            style={{ backgroundImage: `url("${GRAIN_IMG}")`, backgroundSize: "cover", backgroundPosition: "center" }}
          />

          {/* Верхняя строка поверх краски */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-9 md:px-12 md:pt-12">
            <span className="font-display text-[18px] font-bold text-[#0E0E10]">P-PROD</span>
            <span
              className="text-[11px] font-semibold tracking-[0.2em] text-[#55555B] uppercase md:text-[12px]"
              style={{ fontFamily: TEXT_FONT }}
            >
              Продюсирование дизайнеров
            </span>
          </div>

          <div
            ref={hintRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-[#55555B] uppercase"
            style={{ fontFamily: TEXT_FONT }}
          >
            Листайте
            <span className="intro-hint-line h-10 w-px bg-[#0E0E10]" />
          </div>

          {/* Затемнение при уходе вглубь */}
          <div
            ref={dimRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#0E0E10] opacity-0"
          />
        </div>
      </div>
    </div>
  )
}

const STROKE = typeof Path2D !== "undefined" ? new Path2D(PATH) : null
/* Длина пути в единицах сцены, берётся у SVG-пути после монтирования */
let pathLength = 6000

/* Мазок до точки q (0…1) с мягким передним краем, через него — готовая краска */
function drawPaint(canvas: HTMLCanvasElement, v: View, paintedLayer: HTMLCanvasElement, q: number) {
  const ctx = canvas.getContext("2d")
  if (!ctx || !STROKE) return
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = "source-over"
  ctx.filter = "none"
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (q <= 0) return

  if (q >= 1) {
    ctx.drawImage(paintedLayer, 0, 0)
    return
  }

  ctx.setTransform(v.dpr * v.k, 0, 0, v.dpr * v.k, v.dpr * v.ox, v.dpr * v.oy)
  // Размытие края только на широких экранах: на телефоне его закрывает кисть
  if (v.w >= 768 && "filter" in ctx) ctx.filter = `blur(${(10 * v.k * v.dpr).toFixed(1)}px)`
  ctx.lineWidth = 300
  ctx.lineCap = "round"
  ctx.strokeStyle = "#fff"
  ctx.setLineDash([q * pathLength, pathLength * 2])
  ctx.stroke(STROKE)

  ctx.filter = "none"
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = "source-in"
  ctx.drawImage(paintedLayer, 0, 0)
}

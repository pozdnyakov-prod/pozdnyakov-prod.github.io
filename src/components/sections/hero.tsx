// Первый экран по макету из фотошопа (2000×1250): бейдж, широкий заголовок,
// подзаголовок, плашка с фактами, огромное POZDNYAKOV-PROD со скрепкой и
// 3D-предметы. Сменяющееся слово выделено рамкой с маркерами и плашкой
// размеров, курсор «Владимир» подъезжает к слову перед каждой сменой.
//
// На десктопе всё лежит на «сцене» в пропорциях макета: 1u = 20 px макета,
// u = min(1vw, 1.6dvh), поэтому композиция масштабируется целиком 1 в 1.
import type { CSSProperties } from "react"
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Model } from "@/components/decor"
import { Header } from "@/components/sections/header"
import { cn } from "@/lib/utils"

const WORDS = ["интерфейсов", "логотипов", "интерьеров", "одежды", "сайтов", "инфографики"]

// Цикл одной смены слова, мс: курсор отъехал → подъехал → слово сменилось
const PERIOD = 3200
const APPROACH_AT = 2100
const SWAP_AT = 2700

/* Узкий экран: курсор крепится к правому нижнему углу рамки зеркально,
   подпись под стрелкой, чтобы не выходить за край экрана */
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return mobile
}

function EditorCursor({ near, isStatic, mobile }: { near: boolean; isStatic: boolean; mobile: boolean }) {
  const target = mobile
    ? near || isStatic
      ? { x: 8, y: -10 }
      : { x: -44, y: 16 }
    : near || isStatic
      ? { x: -10, y: -12 }
      : { x: 64, y: 40 }

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-full z-20 flex font-sans",
        mobile ? "right-0 flex-col items-end" : "left-full items-start"
      )}
      initial={false}
      animate={target}
      transition={isStatic ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 16 }}
    >
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6 md:h-7 md:w-7", mobile && "-scale-x-100")}>
        <path
          d="M3 2 L21 11 L12.5 13 L8.5 21 Z"
          fill="var(--select)"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "rounded-[5px] bg-select px-2 py-0.5 text-[0.75rem] font-semibold tracking-normal whitespace-nowrap text-white md:text-sm",
          mobile ? "-mt-0.5 mr-3" : "mt-4 -ml-1"
        )}
      >
        Владимир
      </span>
    </motion.span>
  )
}

function SelectedWord() {
  // Анимация везде, кроме включённого в системе «уменьшить движение»
  const isStatic = Boolean(useReducedMotion())
  const mobile = useIsMobile()
  const [index, setIndex] = useState(0)
  const [near, setNear] = useState(false)
  const [sizes, setSizes] = useState<{ w: number; h: number }[]>([])
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Ширина каждого слова, чтобы рамка подстраивалась под него
  useLayoutEffect(() => {
    const measure = () =>
      setSizes(
        measureRefs.current.map((el) => ({
          w: el?.offsetWidth ?? 0,
          h: el?.offsetHeight ?? 0,
        }))
      )
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Смена слова; курсор сначала подъезжает к рамке
  useEffect(() => {
    if (isStatic) {
      setNear(false)
      const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), PERIOD)
      return () => clearInterval(id)
    }
    let timers: ReturnType<typeof setTimeout>[] = []
    const cycle = () => {
      timers = [
        setTimeout(() => setNear(true), APPROACH_AT),
        setTimeout(() => setIndex((i) => (i + 1) % WORDS.length), SWAP_AT),
        setTimeout(() => {
          setNear(false)
          cycle()
        }, PERIOD),
      ]
    }
    cycle()
    return () => timers.forEach(clearTimeout)
  }, [isStatic])

  const size = sizes[index]
  const word = WORDS[index]
  const handle = "absolute h-2 w-2 border-[1.5px] border-select bg-white md:h-2.5 md:w-2.5"

  return (
    <span className="relative mt-[0.06em] inline-block">
      {/* Невидимые копии слов для замера ширины */}
      <span aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0">
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              measureRefs.current[i] = el
            }}
            className="absolute top-0 left-0 px-[0.08em] pb-[0.06em] whitespace-nowrap"
          >
            {w}
          </span>
        ))}
      </span>

      <motion.span
        className="relative inline-flex justify-center px-[0.08em] pb-[0.06em] whitespace-nowrap text-red"
        initial={false}
        animate={size ? { width: size.w } : undefined}
        transition={isStatic ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={word}
            initial={{ opacity: 0, y: "35%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-35%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </AnimatePresence>

        {/* Рамка выделения с маркерами */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-[1.5px] border-select">
          <span className={cn(handle, "-top-[5px] -left-[5px]")} />
          <span className={cn(handle, "-top-[5px] -right-[5px]")} />
          <span className={cn(handle, "-bottom-[5px] -left-[5px]")} />
          <span className={cn(handle, "-right-[5px] -bottom-[5px]")} />
        </span>

        {/* Плашка размеров под рамкой */}
        {size && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-full left-0 mt-2.5 rounded-[4px] bg-select px-1.5 py-0.5 font-sans text-[0.7rem] font-medium tracking-normal whitespace-nowrap text-white tabular-nums md:left-1/2 md:-translate-x-1/2 md:text-xs"
          >
            {Math.round(size.w)} × {Math.round(size.h)}
          </span>
        )}

        <EditorCursor near={near} isStatic={isStatic} mobile={mobile} />
      </motion.span>
    </span>
  )
}

/* Единицы сцены: n пикселей макета / 20 */
const u = (n: number) => `calc(var(--u) * ${n})`

const OBJECTS = {
  letter: { src: "/hero/letter-a.webp", alt: "Буква A" },
  tshirt: { src: "/hero/tshirt.webp", alt: "Футболка" },
  bezier: { src: "/hero/bezier.webp", alt: "Кривая Безье с маркерами" },
}

/*
  Скрепка, продетая через буквы, как в макете. Координаты — в пикселях
  при кегле 137.2 (размер надписи на макете 2000 px), поэтому вся скрепка
  масштабируется вместе с текстом. Два слоя: задний лежит под буквами
  (проводки уходят за штрихи и видны в просветах), передний — поверх.
*/
const FONT = 137.2
const WIRE = 9

type ClipGeometry = {
  box: [number, number]
  back: string[]
  front: string[]
  /* смещение блика: свет сверху-слева */
  light: [number, number]
  /* откуда скрепка «надевается» при появлении, в долях кегля */
  from: { x?: string; y?: string }
}

/* Десктоп: горизонтальная, зацеплена за V и продета через P */
const CLIP_DESKTOP: ClipGeometry = {
  box: [276.83, 137.2],
  back: [
    // нижняя петля: из-под V → правый загиб снаружи чаши P → назад под буквы → петля слева от V
    "M55.5 64.5 H259.5 A11.75 11.75 0 0 1 259.5 88 H29.7 A7.2 7.2 0 0 1 29.7 73.6 H44",
    // внутренний проводок: от штриха V до чаши P, весь под буквами
    "M84 79 H235",
  ],
  // верхний проводок поверх V и ножки P, упирается в чашу
  front: ["M51.5 53.5 H243"],
  light: [0, -1.7],
  from: { x: "0.35em" },
}

/* Телефон: вертикальная, сцепляет строки — петля зацеплена за нижнюю
   перекладину D в POZDNYAKOV, скрепка продета через чашу P в PROD */
const CLIP_MOBILE: ClipGeometry = {
  box: [146.35, 320.14],
  back: [
    // из-под D → петля под чашей P → вверх под буквами → петля внутри D
    "M76.17 139.76 V280.99 A11.74 11.74 0 0 1 52.69 280.99 V109.03 A7.2 7.2 0 0 1 67.1 109.03 V120.74",
    // внутренний проводок виден только в просвете чаши P
    "M61.69 215.86 V263.06",
  ],
  // передний проводок поверх перекладины P, упирается в низ чаши
  front: ["M87.08 140.86 V247.69"],
  light: [-1.5, -0.5],
  from: { y: "-0.55em" },
}

function ClipWires({
  paths,
  light,
  shadows = [],
  shadowId,
}: {
  paths: string[]
  light: [number, number]
  shadows?: string[]
  shadowId?: string
}) {
  return (
    <>
      {shadowId &&
        shadows.map((d) => (
          <path
            key={`s${d}`}
            d={d}
            fill="none"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth={WIRE}
            strokeLinecap="round"
            transform="translate(2.5 6)"
            filter={`url(#${shadowId})`}
          />
        ))}
      {/* трубка: тень снизу, тело, блик сверху — как пластиковая скрепка в макете */}
      {paths.map((d) => (
        <g key={d} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={d} stroke="#43b597" strokeWidth={WIRE} transform={`translate(${-light[0] * 0.2} ${-light[1] * 0.2})`} />
          <path d={d} stroke="#62d4bb" strokeWidth={WIRE - 2} transform={`translate(${light[0] * 0.35} ${light[1] * 0.35})`} />
          <path d={d} stroke="#8fe6d4" strokeWidth={WIRE - 4.6} transform={`translate(${light[0] * 0.95} ${light[1] * 0.95})`} />
          <path d={d} stroke="#c4f6eb" strokeWidth={1.6} transform={`translate(${light[0] * 1.4} ${light[1] * 1.4})`} />
        </g>
      ))}
    </>
  )
}

function PaperClip({
  geometry,
  className,
  style,
  delay = 0.9,
}: {
  geometry: ClipGeometry
  className?: string
  style?: CSSProperties
  delay?: number
}) {
  const reduce = useReducedMotion()
  const id = useId().replace(/:/g, "")
  const [w, h] = geometry.box
  const motionProps = reduce
    ? {}
    : {
        // «защёлкивается», когда надпись попадает в экран
        initial: { opacity: 0, ...geometry.from },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, amount: 0.6 },
        transition: { delay, type: "spring" as const, stiffness: 170, damping: 13, opacity: { delay, duration: 0.2 } },
      }
  const layer = (z: string, paths: string[], shadows: string[]) => (
    <motion.svg
      {...motionProps}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-visible", z, className)}
      style={{ width: `${w / FONT}em`, height: `${h / FONT}em`, ...style }}
    >
      {shadows.length > 0 && (
        <defs>
          <filter id={id} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>
      )}
      <ClipWires paths={paths} light={geometry.light} shadows={shadows} shadowId={id} />
    </motion.svg>
  )
  return (
    <>
      {/* тень всей скрепки ложится на бумагу, под буквы */}
      {layer("-z-10", geometry.back, [...geometry.back, ...geometry.front])}
      {layer("z-10", geometry.front, [])}
    </>
  )
}

function Badge({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.6em] rounded-full bg-white px-[1.1em] py-[0.6em] font-medium tracking-[-0.02em] whitespace-nowrap shadow-[0_6px_18px_rgba(0,0,0,0.06)]",
        className
      )}
      style={style}
    >
      <span className="size-[0.5em] rounded-full bg-red" />
      Продюсирование дизайнеров
    </span>
  )
}

/* Аватарки ниш: белые кружки с предметами */
function NicheAvatars({ size }: { size: string }) {
  const items = [OBJECTS.letter, OBJECTS.tshirt, OBJECTS.bezier]
  return (
    <span className="flex shrink-0">
      {items.map((it, i) => (
        <span
          key={it.src}
          className="grid shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          style={{ width: size, height: size, marginLeft: i ? `calc(${size} * -0.18)` : 0 }}
        >
          <img src={it.src} alt="" className="h-[70%] w-[70%] object-contain" />
        </span>
      ))}
    </span>
  )
}

type Fact = { label: string; text: string; big?: string; plus?: boolean; avatars?: boolean }

const facts: Fact[] = [
  { big: "3–5", label: "дней", text: "от брифа до упаковки" },
  { big: "3", plus: true, label: "дизайнеров", text: "уже с упаковкой" },
  { avatars: true, label: "любая ниша", text: "графика, одежда, веб, интерьер" },
]

/* Плашка с фактами. compact — вертикальная версия для телефона */
function Facts({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex border-[1.5px] border-ink/85",
        compact ? "flex-col gap-4 rounded-[22px] px-6 py-5" : "h-full items-center justify-between"
      )}
      // радиус и поля по макету: 35 и 50 px при высоте 113
      style={compact ? undefined : { borderRadius: u(1.75), paddingInline: u(2.5) }}
    >
      {facts.map((f, i) => (
        <div
          key={f.label}
          className={cn(
            "flex items-center",
            !compact && i > 0 && "border-l border-ink/12",
            compact && i > 0 && "border-t border-ink/12 pt-4"
          )}
          style={compact ? { gap: "14px" } : { gap: u(1), paddingLeft: i > 0 ? u(2.4) : 0, height: u(2.6) }}
        >
          {f.avatars ? (
            <NicheAvatars size={compact ? "40px" : u(2.35)} />
          ) : (
            <span
              className="font-display leading-none font-extrabold tracking-[-0.02em]"
              style={{ fontSize: compact ? "2.4rem" : u(2.27) }}
            >
              {f.big}
              {f.plus && <span className="text-red">+</span>}
            </span>
          )}
          <span className="flex flex-col" style={{ gap: compact ? "2px" : u(0.25) }}>
            <span
              className="font-semibold tracking-[0.14em] text-subtle uppercase"
              style={{ fontSize: compact ? "0.72rem" : u(0.78) }}
            >
              {f.label}
            </span>
            <span className="tracking-[-0.01em] text-ink/85" style={{ fontSize: compact ? "0.95rem" : u(0.91) }}>
              {f.text}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

const SUBTITLE =
  "Помогу объяснить клиентам, почему выбирать стоит именно вас. Позиционирование, упаковка профиля и контент-система за 3–5 дней."

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* Десктоп: сцена 100u × 62.5u, координаты из макета */
function Stage() {
  return (
    <div className="relative mx-auto hidden md:block" style={{ width: u(100), height: u(62.5) }}>
      {/* 3D-предметы, едва заметно ходят */}
      <Model
        {...OBJECTS.letter}
        className="absolute"
        style={{ left: u(3), top: u(8.75), width: u(14.5), height: u(19) }}
        drift={[5, 4]}
        duration={10}
        shadow={false}
      />
      <Model
        {...OBJECTS.tshirt}
        className="absolute"
        style={{ left: u(80.75), top: u(18), width: u(19.25), height: u(19.5) }}
        drift={[-6, 3]}
        duration={11}
        shadow={false}
        delay={0.15}
      />
      <Model
        {...OBJECTS.bezier}
        className="absolute"
        style={{ left: u(2.75), top: u(35), width: u(12.75), height: u(12.5) }}
        drift={[5, -3]}
        duration={10.5}
        shadow={false}
        delay={0.3}
      />

      <motion.div {...rise(0.1)} className="absolute inset-x-0 flex justify-center" style={{ top: u(12.5) }}>
        <Badge style={{ fontSize: u(0.9) }} />
      </motion.div>

      <motion.h1
        {...rise(0.2)}
        className="font-display absolute inset-x-0 text-center leading-[0.93] font-extrabold tracking-[-0.035em]"
        style={{ top: u(17.1), fontSize: u(5.61) }}
      >
        Личный бренд
        <br />
        для дизайнеров
        <br />
        <SelectedWord />
      </motion.h1>

      <motion.p
        {...rise(0.35)}
        className="absolute left-1/2 -translate-x-1/2 text-center leading-[1.5] tracking-[-0.015em] text-subtle"
        style={{ top: u(36.35), width: u(38), fontSize: u(1.27) }}
      >
        {SUBTITLE}
      </motion.p>

      <motion.div
        {...rise(0.45)}
        className="absolute"
        style={{ left: u(18.6), top: u(45.4), width: u(62.75), height: u(5.7) }}
      >
        <Facts />
      </motion.div>

      <motion.div {...rise(0.55)} className="absolute inset-x-0" style={{ top: u(53.6) }}>
        <p
          aria-hidden="true"
          className="font-display text-center leading-none font-bold tracking-[-0.01em] whitespace-nowrap select-none"
          style={{ fontSize: u(6.86) }}
        >
          POZDNYAKO
          <span className="relative isolate inline-block">
            V<span className="text-transparent">-</span>P
            <PaperClip geometry={CLIP_DESKTOP} className="top-0 left-0" />
          </span>
          ROD
        </p>
      </motion.div>
    </div>
  )
}

/* Телефон: те же элементы столбиком */
function MobileStack() {
  return (
    <div className="relative px-4 pt-6 pb-10 md:hidden">
      <img src={OBJECTS.letter.src} alt="" className="absolute top-0 -left-1 w-20 object-contain" />
      <img src={OBJECTS.tshirt.src} alt="" className="absolute top-3 -right-3 w-24 object-contain" />

      <div className="relative flex flex-col items-center pt-24 text-center">
        <motion.div {...rise(0.1)}>
          <Badge className="text-[0.85rem]" />
        </motion.div>
        <motion.h1
          {...rise(0.2)}
          className="font-display mt-6 text-[8.6vw] leading-[0.98] font-extrabold tracking-[-0.035em]"
        >
          Личный бренд
          <br />
          для дизайнеров
          <br />
          <SelectedWord />
        </motion.h1>
        <motion.p {...rise(0.35)} className="mt-14 max-w-[34ch] text-[1rem] leading-[1.45] tracking-[-0.01em] text-subtle">
          {SUBTITLE}
        </motion.p>
      </div>

      <motion.div {...rise(0.45)} className="relative mt-8">
        <Facts compact />
        <img src={OBJECTS.bezier.src} alt="" className="absolute -top-12 -right-2 w-16 object-contain" />
      </motion.div>

      <div className="relative mt-14">
        <p
          aria-hidden="true"
          className="font-display relative isolate text-center text-[10vw] leading-[1.25] font-bold tracking-[-0.01em] select-none"
        >
          POZ
          <span className="relative">
            D
            <PaperClip geometry={CLIP_MOBILE} className="top-0 left-0" delay={0.4} />
          </span>
          NYAKOV
          <br />
          PROD
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    // Выезжает поверх интро карточкой: верх скруглён, пока интро уходит
    <section
      className="relative z-10 min-h-[100dvh] overflow-hidden bg-paper shadow-[0_-24px_60px_rgba(0,0,0,0.28)] md:flex md:items-end md:justify-center"
      style={
        {
          "--u": "min(1vw, 1.6dvh)",
          borderTopLeftRadius: "calc((1 - var(--intro-exit, 1)) * 40px)",
          borderTopRightRadius: "calc((1 - var(--intro-exit, 1)) * 40px)",
        } as CSSProperties
      }
    >
      <div className="md:absolute md:inset-x-0 md:top-0 md:z-30">
        <Header />
      </div>
      <Stage />
      <MobileStack />
    </section>
  )
}

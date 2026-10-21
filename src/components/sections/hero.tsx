// Первый экран по макету из фотошопа (2000×1250): бейдж, широкий заголовок,
// подзаголовок, плашка с фактами, огромное POZDNYAKOV-PROD со скрепкой и
// 3D-предметы. Сменяющееся слово выделено рамкой с маркерами и плашкой
// размеров, курсор «Владимир» подъезжает к слову перед каждой сменой.
//
// На десктопе всё лежит на «сцене» в пропорциях макета: 1u = 20 px макета,
// u = min(1vw, 1.6dvh), поэтому композиция масштабируется целиком 1 в 1.
import type { CSSProperties } from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
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

/* Скрепка поверх названия: нарисована вектором в цвет макета */
const CLIP_PATH = "M30 46 H246 a14 14 0 0 0 0 -28 H38 a8 8 0 0 0 0 16 H232"

function Clip({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 280 60"
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-visible", className)}
      style={style}
    >
      <path
        d={CLIP_PATH}
        fill="none"
        stroke="rgba(0,0,0,0.16)"
        strokeWidth="9"
        strokeLinecap="round"
        transform="translate(4 8)"
        style={{ filter: "blur(3px)" }}
      />
      <path d={CLIP_PATH} fill="none" stroke="#4fcfb4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={CLIP_PATH}
        fill="none"
        stroke="#bff4e7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0 -1.6)"
        opacity="0.9"
      />
    </svg>
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
        compact ? "flex-col gap-4 rounded-[28px] px-6 py-5" : "h-full items-center justify-evenly"
      )}
      style={compact ? undefined : { borderRadius: u(2.9) }}
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
            <NicheAvatars size={compact ? "40px" : u(2.75)} />
          ) : (
            <span
              className="font-display leading-none font-extrabold tracking-[-0.02em]"
              style={{ fontSize: compact ? "2.4rem" : u(2.55) }}
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
            <span className="tracking-[-0.01em] text-ink/85" style={{ fontSize: compact ? "0.95rem" : u(0.98) }}>
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
          POZDNYAKOV
          {/* Дефис спрятан под скрепкой, как на макете */}
          <span className="relative inline-block">
            <span className="text-transparent">-</span>
            <Clip className="top-[0.2em] left-[-0.95em] h-[0.46em] w-[2.35em]" />
          </span>
          PROD
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
          className="font-display text-center text-[10vw] leading-[1.05] font-bold tracking-[-0.01em] select-none"
        >
          POZDNYAKOV
          <span className="relative inline-block">
            <span className="text-transparent">-</span>
            <Clip className="top-[0.2em] left-[-0.95em] h-[0.46em] w-[2.35em]" />
          </span>
          <br />
          PROD
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden md:flex md:items-end md:justify-center"
      style={{ "--u": "min(1vw, 1.6dvh)" } as CSSProperties}
    >
      <div className="md:absolute md:inset-x-0 md:top-0 md:z-30">
        <Header />
      </div>
      <Stage />
      <MobileStack />
    </section>
  )
}

// Первый экран в стиле интерфейса графического редактора: сменяющееся слово
// выделено рамкой с маркерами и плашкой размеров, курсор «Владимир»
// подъезжает к слову перед каждой сменой, 3D-предметы стоят вокруг.
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { MODELS } from "@/lib/models"
import { Model } from "@/components/decor"
import { Header } from "@/components/sections/header"
import { cn } from "@/lib/utils"

const WORDS = ["интерфейсов", "логотипов", "интерьеров", "одежды"]

// Цикл одной смены слова, мс: курсор отъехал → подъехал → слово сменилось
const PERIOD = 3200
const APPROACH_AT = 2100
const SWAP_AT = 2700

/* Телефон или «уменьшить движение»: курсор и рамка без анимации */
function useStaticMode() {
  const reduce = useReducedMotion()
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return mobile || Boolean(reduce)
}

function EditorCursor({ near, isStatic }: { near: boolean; isStatic: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-full z-20 flex items-start",
        // На телефоне курсор неподвижен: под рамкой, справа от плашки размеров
        isStatic ? "left-1/2" : "left-full"
      )}
      initial={false}
      animate={isStatic ? { x: 44, y: 22 } : near ? { x: -10, y: -12 } : { x: 64, y: 40 }}
      transition={isStatic ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 16 }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7">
        <path
          d="M3 2 L21 11 L12.5 13 L8.5 21 Z"
          fill="var(--select)"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-4 -ml-1 rounded-[5px] bg-select px-2 py-0.5 text-[0.75rem] font-semibold tracking-normal whitespace-nowrap text-white md:text-sm">
        Владимир
      </span>
    </motion.span>
  )
}

function SelectedWord() {
  const isStatic = useStaticMode()
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

  // Смена слова; на десктопе курсор сначала подъезжает к рамке
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
    <span className="relative mt-[0.08em] inline-block">
      {/* Невидимые копии слов для замера ширины */}
      <span aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0">
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              measureRefs.current[i] = el
            }}
            className="absolute top-0 left-0 px-[0.1em] pb-[0.1em] whitespace-nowrap"
          >
            {w}
          </span>
        ))}
      </span>

      <motion.span
        className="relative inline-flex justify-center px-[0.1em] pb-[0.1em] whitespace-nowrap text-red"
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
            className="pointer-events-none absolute top-full left-1/2 mt-2.5 -translate-x-1/2 rounded-[4px] bg-select px-1.5 py-0.5 font-sans text-[0.7rem] font-medium tracking-normal whitespace-nowrap text-white tabular-nums md:text-xs"
          >
            {Math.round(size.w)} × {Math.round(size.h)}
          </span>
        )}

        <EditorCursor near={near} isStatic={isStatic} />
      </motion.span>
    </span>
  )
}

/* 3D-предметы вокруг заголовка, без рамок; на телефоне только три */
function Objects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Model
        {...MODELS.letter}
        className="absolute top-[2%] left-[3%] h-24 w-20 md:top-[6%] md:left-[4%] md:h-48 md:w-40"
        drift={[4, 3]}
        duration={10}
        rotate={-10}
      />
      <Model
        {...MODELS.skeleton}
        className="absolute bottom-[6%] left-[6%] hidden md:block md:h-64 md:w-48"
        drift={[5, -2]}
        duration={11}
        delay={0.1}
        rotate={-4}
      />
      <Model
        {...MODELS.pin}
        className="absolute top-[3%] right-[5%] h-16 w-16 md:top-[8%] md:right-[9%] md:h-28 md:w-28"
        drift={[-3, 4]}
        duration={9}
        delay={0.15}
        rotate={14}
      />
      <Model
        {...MODELS.hoodie}
        className="absolute right-[3%] bottom-[14%] h-28 w-28 md:top-[36%] md:right-[1.5%] md:bottom-auto md:h-60 md:w-56"
        drift={[-5, 0]}
        duration={11.5}
        delay={0.25}
        rotate={8}
      />
      <Model
        {...MODELS.brush}
        className="absolute right-[15%] bottom-[2%] hidden md:block md:h-44 md:w-44"
        drift={[-4, -3]}
        duration={10.5}
        delay={0.3}
        rotate={-12}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Header />

      <div className="relative flex flex-1 items-center justify-center px-4 pt-28 pb-40 md:px-12 md:py-20">
        <Objects />

        <div className="relative z-10 w-full max-w-[920px] text-center">
          <motion.h1
            className="text-[12.2vw] leading-[0.95] font-extrabold tracking-[-0.055em] md:text-[min(8.2vw,7.4rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Личный бренд
            <br />
            для дизайнеров
            <br />
            <SelectedWord />
          </motion.h1>

          <motion.p
            className="mx-auto mt-16 max-w-[42ch] text-[1.05rem] leading-[1.35] text-subtle md:mt-16 md:text-[1.25rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Помогу объяснить клиентам, почему выбирать стоит именно вас.
            Позиционирование, упаковка профиля и контент-система за 3–5 дней.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

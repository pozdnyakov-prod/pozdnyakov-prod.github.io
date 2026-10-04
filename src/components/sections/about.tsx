// «Кто мы»: слева заголовок и текст, справа бейдж на ленте. Бейдж прижат
// к верхнему краю блока, срез ленты спрятан за краем, за бейджем крупная
// светло-серая фигура. Бейдж медленно покачивается на 2–3 градуса.
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { CHANNEL_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

/* Абстрактная фигура-подложка: мягкий волнистый контур из семи «лепестков».
   Путь строится по формуле, поэтому края гладкие без ручной отрисовки */
function wavyPath(lobes = 7, depth = 0.09, points = 140) {
  const cx = 200, cy = 200, r = 168
  let d = ""
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2
    const rr = r * (1 + depth * Math.sin(lobes * t))
    const x = (cx + rr * Math.cos(t)).toFixed(1)
    const y = (cy + rr * Math.sin(t)).toFixed(1)
    d += (i === 0 ? "M" : "L") + x + " " + y + " "
  }
  return d + "Z"
}
const WAVY = wavyPath()

function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={cn("pointer-events-none absolute aspect-square", className)}>
      <path d={WAVY} fill={color} />
    </svg>
  )
}

/* Бейдж на ленте. Картинка начинается выше контейнера, у которого
   overflow-hidden, поэтому ровный срез ленты не виден */
function HangingBadge({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn("absolute left-1/2 -translate-x-1/2", className)}
      style={{ transformOrigin: "50% 0%" }}
      animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src="/about/badge.webp"
        alt="Бейдж на оранжевой ленте"
        draggable={false}
        className="h-full w-auto max-w-none drop-shadow-[0_24px_30px_rgba(0,0,0,0.16)] select-none"
      />
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="px-4 pt-24 md:px-14 md:pt-32">
      <div className="relative grid overflow-hidden bg-card md:min-h-[620px] md:grid-cols-2">
        <motion.div
          className="relative z-10 flex flex-col justify-center px-6 pt-14 pb-10 md:px-14 md:py-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[1.3rem] font-medium tracking-[-0.05em] uppercase">
            <span className="font-light">[</span> кто мы <span className="font-light">]</span>
          </p>
          <h2 className="caps mt-5 text-[3rem] md:text-[4.2rem] lg:text-[4.6rem]">
            Владимир
            <br />
            Поздняков
          </h2>
          <p className="mt-6 max-w-[30ch] text-[1.35rem] leading-[1.12] tracking-[-0.04em] md:text-[1.6rem]">
            Занимаюсь позиционированием и контентом для дизайнеров, в работе
            использую AI.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-start gap-2 self-start text-[1.1rem] tracking-[-0.035em]"
          >
            <span className="underline decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-transparent">
              Как я думаю и работаю — в канале @vl_content
            </span>
            <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0" />
          </a>
        </motion.div>

        {/* Десктоп: бейдж свисает с верхнего края всего блока */}
        <div className="relative hidden md:block">
          <Blob color="#ececec" className="top-[30%] left-1/2 h-[64%] -translate-x-1/2 rotate-[-8deg]" />
          <HangingBadge className="-top-12 h-[540px] lg:h-[580px]" />
        </div>

        {/* Телефон: бейдж под текстом, свисает с верхнего края своего контейнера */}
        <div className="relative mx-4 mb-4 h-[380px] overflow-hidden rounded-[18px] bg-paper md:hidden">
          <Blob color="#e4e4e4" className="top-[26%] left-1/2 h-[68%] -translate-x-1/2 rotate-[-8deg]" />
          <HangingBadge className="-top-8 h-[360px]" />
        </div>
      </div>
    </section>
  )
}

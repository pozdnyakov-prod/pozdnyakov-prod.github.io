// «Кто мы»: четыре белые карточки квадратом 2×2, весь блок помещается
// в один экран. В каждой карточке текст слева, картинка справа;
// на телефоне картинка под текстом.
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { BrushStroke, Sparkle } from "@/components/doodles"
import { cn } from "@/lib/utils"

function Card({
  title,
  children,
  visual,
  index,
}: {
  title: string
  children: ReactNode
  visual: ReactNode
  index: number
}) {
  return (
    <motion.article
      className="relative grid overflow-hidden bg-card p-6 sm:grid-cols-2 sm:items-center sm:gap-4 lg:p-8 xl:h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="caps text-[1.55rem] sm:text-[1.6rem] xl:text-[1.75rem] 2xl:text-[1.95rem]">{title}</h3>
        <div className="text-[1rem] leading-[1.2] tracking-[-0.035em] xl:text-[1.08rem]">{children}</div>
      </div>
      {visual}
    </motion.article>
  )
}

function Dashes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* Правая колонка с картинкой. Внутри квадрат по меньшей стороне колонки,
   поэтому картинки во всех карточках одного визуального размера */
function Visual({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-4 flex h-[240px] items-center justify-center [container-type:size] sm:mt-0 sm:h-[280px] xl:h-full">
      <div className="relative aspect-square w-[min(100cqw,100cqh)]">{children}</div>
    </div>
  )
}

function Picture({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className="absolute inset-0 z-10 m-auto h-auto max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)] select-none"
    />
  )
}

/* Стрелка маркером из угла в оранжевый кубик и подпись «это вы».
   Координаты в процентах квадрата: кубик занимает x 33–66%, y 19–48% */
function YouArrow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <marker id="you-arrow-head" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M1 1 L10 6 L1 11" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <path d="M95 4 C 88 6, 76 9, 67.5 18.5" fill="none" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" markerEnd="url(#you-arrow-head)" />
      </svg>
      <span className="absolute -top-[7%] right-[-6%] rotate-[-6deg] font-script text-[1.6rem] leading-none whitespace-nowrap xl:text-[1.9rem]">
        это вы
      </span>
    </div>
  )
}

/* Волнистая светло-серая фигура-подложка за бейджем */
function wavyPath(lobes = 7, depth = 0.09, points = 140) {
  const cx = 200, cy = 200, r = 168
  let d = ""
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2
    const rr = r * (1 + depth * Math.sin(lobes * t))
    d += (i === 0 ? "M" : "L") + (cx + rr * Math.cos(t)).toFixed(1) + " " + (cy + rr * Math.sin(t)).toFixed(1) + " "
  }
  return d + "Z"
}
const WAVY = wavyPath()

/* Бейдж на ленте. Колонка тянется до верхнего края карточки, а картинка
   начинается выше него: срез ленты прячется за краем (overflow-hidden).
   Медленно покачивается на ±2,5°, при уменьшении движения стоит. */
function BadgeVisual() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mt-4 h-[300px] overflow-hidden rounded-[18px] bg-paper sm:mt-0 sm:-my-6 sm:h-auto sm:min-h-[300px] sm:self-stretch sm:overflow-visible sm:rounded-none sm:bg-transparent lg:-my-8">
      <svg
        viewBox="0 0 400 400"
        aria-hidden="true"
        className="pointer-events-none absolute top-[34%] left-1/2 aspect-square h-[58%] -translate-x-1/2 -rotate-[8deg]"
      >
        <path d={WAVY} className="fill-[#e6e6e6] sm:fill-[#efefef]" />
      </svg>
      <motion.div
        className="absolute -top-7 left-1/2 h-[92%] -translate-x-1/2"
        style={{ transformOrigin: "50% 0%" }}
        animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/about/badge.webp"
          alt="Бейдж на оранжевой ленте"
          draggable={false}
          className="h-full w-auto max-w-none drop-shadow-[0_20px_26px_rgba(0,0,0,0.16)] select-none"
        />
      </motion.div>
    </div>
  )
}

export function Service() {
  return (
    <section id="service" className="px-4 pt-20 md:px-14 lg:pt-16">
      <motion.h2
        className="display text-[3.2rem] md:text-[4.4rem]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Кто мы
      </motion.h2>

      {/* С 1280 px квадрат 2×2 высотой в экран минус заголовок; уже — по одной карточке в ряд */}
      <div
        className={cn(
          "mt-6 grid gap-3",
          "xl:h-[clamp(640px,calc(100dvh-180px),820px)] xl:grid-cols-2 xl:grid-rows-2"
        )}
      >
        <Card index={0} title="Pozdnyakov-prod: digital-агентство для дизайнеров" visual={<BadgeVisual />}>
          <p>Мы делаем личный бренд, упаковку и позиционирование для дизайнеров.</p>
          <p className="mt-3 text-subtle">
            Одна услуга с фиксированным составом: от брифа до системы, которую вы
            ведёте сами.
          </p>
        </Card>

        <Card
          index={1}
          title="Позиционирование и оффер"
          visual={
            <Visual>
              <BrushStroke
                color="#8fb8ff"
                d="M40 150 C 120 108, 250 160, 360 104"
                className="top-[52%] left-1/2 w-[112%] -translate-x-1/2"
              />
              <Picture src="/services/positioning.png" alt="Кубики, один выделен оранжевым" />
              <YouArrow />
            </Visual>
          }
        >
          <Dashes items={["Чем вы отличаетесь", "Для кого вы работаете", "Оффер, который это объясняет"]} />
        </Card>

        <Card
          index={2}
          title="Упаковка профиля"
          visual={
            <Visual>
              <BrushStroke
                color="#ffd23f"
                d="M60 170 C 140 120, 230 70, 340 30"
                width={78}
                className="top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              />
              <Sparkle className="top-[8%] right-[18%] z-20 h-6 w-6" />
              <Sparkle className="bottom-[12%] left-[18%] z-20 h-4 w-4" />
              <Picture src="/services/profile.png" alt="Телефон с профилем" />
            </Visual>
          }
        >
          <Dashes items={["Структура профиля", "Тексты, которые объясняют ваш подход"]} />
        </Card>

        <Card
          index={3}
          title="Контент-система"
          visual={
            <Visual>
              <BrushStroke
                color="#8fb8ff"
                d="M30 70 C 130 40, 260 160, 372 120"
                className="top-1/2 left-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2"
              />
              <Picture src="/services/calendar.png" alt="Календарь с отмеченными днями" />
            </Visual>
          }
        >
          <Dashes items={["О чём писать", "Как писать", "Чтобы вести контент самостоятельно"]} />
        </Card>
      </div>
    </section>
  )
}

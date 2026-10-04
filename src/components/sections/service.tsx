// «Что мы делаем»: четыре белые карточки во всю ширину. В каждой текст
// слева, картинка справа; на телефоне картинка под текстом.
import type { ReactNode } from "react"
import { motion } from "motion/react"

import { MODELS } from "@/lib/models"
import { BrushStroke, Sparkle } from "@/components/doodles"

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
      className="relative grid items-center gap-6 overflow-hidden bg-card p-7 md:grid-cols-2 md:gap-10 md:px-12 md:py-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index === 0 ? 0 : 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex max-w-[30rem] flex-col gap-5">
        <h3 className="caps text-[1.55rem] sm:text-[1.9rem] md:text-[2.3rem] lg:text-[2.7rem]">{title}</h3>
        <div className="text-[1.05rem] leading-[1.2] tracking-[-0.035em] md:text-[1.2rem]">{children}</div>
      </div>
      <div className="relative h-[280px] md:h-[340px] lg:h-[380px]">{visual}</div>
    </motion.article>
  )
}

function Dashes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* Квадрат под картинку: все картинки в нём одного визуального размера,
   а акценты позиционируются в процентах от этого квадрата */
function Square({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto aspect-square h-full max-w-full">{children}</div>
}

function Picture({ src, alt, inset = "inset-0" }: { src: string; alt: string; inset?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`absolute ${inset} z-10 m-auto h-auto max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)] select-none`}
    />
  )
}

/* Стрелка маркером из угла в оранжевый кубик и подпись «это вы» */
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
      <span className="absolute -top-[7%] right-[-6%] rotate-[-6deg] font-script text-[1.7rem] leading-none whitespace-nowrap md:text-[2rem]">
        это вы
      </span>
    </div>
  )
}

export function Service() {
  return (
    <section id="service" className="px-4 pt-20 md:px-14 md:pt-28">
      <motion.h2
        className="display max-w-[10ch] text-[3.2rem] md:max-w-[14ch] md:text-[5.4rem]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Что мы делаем
      </motion.h2>

      <div className="mt-8 grid gap-3 md:mt-10">
        <Card
          index={0}
          title="Pozdnyakov-prod: digital-агентство для дизайнеров"
          visual={
            <Square>
              <BrushStroke color="var(--red)" className="top-1/2 left-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] opacity-90" />
              <Sparkle className="top-[6%] left-[8%] z-20 h-6 w-6" />
              <Sparkle className="right-[6%] bottom-[12%] z-20 h-4 w-4" />
              {/* у худи нет полей по краям, поэтому ужимаем до тех же 80%, что у остальных */}
              <Picture src={MODELS.hoodie.src} alt={MODELS.hoodie.alt} inset="inset-[10%]" />
            </Square>
          }
        >
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
            <Square>
              <BrushStroke
                color="#8fb8ff"
                d="M40 150 C 120 108, 250 160, 360 104"
                className="top-[52%] left-1/2 w-[112%] -translate-x-1/2"
              />
              <Picture src="/services/positioning.png" alt="Кубики, один выделен оранжевым" />
              <YouArrow />
            </Square>
          }
        >
          <Dashes items={["Чем вы отличаетесь", "Для кого вы работаете", "Оффер, который это объясняет"]} />
        </Card>

        <Card
          index={2}
          title="Упаковка профиля"
          visual={
            <Square>
              <BrushStroke
                color="#ffd23f"
                d="M60 170 C 140 120, 230 70, 340 30"
                width={78}
                className="top-1/2 left-1/2 w-[100%] -translate-x-1/2 -translate-y-1/2"
              />
              <Sparkle className="top-[8%] right-[18%] z-20 h-6 w-6" />
              <Sparkle className="bottom-[12%] left-[18%] z-20 h-4 w-4" />
              <Picture src="/services/profile.png" alt="Телефон с профилем" />
            </Square>
          }
        >
          <Dashes items={["Структура профиля", "Тексты, которые объясняют ваш подход"]} />
        </Card>

        <Card
          index={3}
          title="Контент-система"
          visual={
            <Square>
              <BrushStroke
                color="#8fb8ff"
                d="M30 70 C 130 40, 260 160, 372 120"
                className="top-1/2 left-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2"
              />
              <Picture src="/services/calendar.png" alt="Календарь с отмеченными днями" />
            </Square>
          }
        >
          <Dashes items={["О чём писать", "Как писать", "Чтобы вести контент самостоятельно"]} />
        </Card>
      </div>
    </section>
  )
}

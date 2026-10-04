// «Услуга»: четыре белые карточки 2×2. В каждой картинка по центру,
// под ней заголовок капсом и список через тире.
import type { ReactNode } from "react"
import { motion } from "motion/react"

import { MODELS } from "@/lib/models"
import { BrushStroke, Checks, MarkerArrow, Sparkle } from "@/components/doodles"

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
      className="relative flex flex-col overflow-hidden bg-card p-7 md:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Картинка по центру, текст под ней */}
      <div className="relative h-[220px] md:h-[270px]">{visual}</div>
      <div className="relative z-10 mt-6 flex flex-col gap-5 md:mt-8">
        <h3 className="caps text-[1.55rem] sm:text-[1.9rem] md:text-[2.15rem]">{title}</h3>
        <div className="text-[1.05rem] leading-[1.1] tracking-[-0.035em]">{children}</div>
      </div>
    </motion.article>
  )
}

/* Картинка из public/services: все в одинаковом квадрате, поэтому
   при одной высоте они одного визуального размера */
function ServiceImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`relative z-10 mx-auto block h-full w-auto object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)] select-none ${className ?? ""}`}
    />
  )
}

const center = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"

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
        Три части одной системы
      </motion.h2>

      <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2">
        <Card
          index={0}
          title="Pozdnyakov-prod: личный бренд для дизайнеров"
          visual={
            <>
              <BrushStroke color="var(--red)" className={`${center} w-[92%] max-w-[420px] -rotate-[14deg] opacity-90`} />
              <Sparkle className="top-[6%] left-[18%] h-6 w-6 md:left-[24%]" />
              <Sparkle className="right-[20%] bottom-[10%] h-4 w-4 md:right-[26%]" />
              {/* худи без запаса по краям, поэтому чуть ниже остальных */}
              <ServiceImage src={MODELS.hoodie.src} alt={MODELS.hoodie.alt} className="top-[5%] h-[90%]" />
            </>
          }
        >
          <p>Одна услуга с фиксированным составом.</p>
          <p className="mt-4">Позиционирование. Упаковка профиля. Контент-система.</p>
        </Card>

        <Card
          index={1}
          title="Позиционирование и оффер"
          visual={
            <>
              <BrushStroke
                color="#8fb8ff"
                d="M40 150 C 120 108, 250 160, 360 104"
                className={`${center} mt-[12%] w-[92%] max-w-[420px]`}
              />
              <ServiceImage src="/services/positioning.png" alt="Кубики, один выделен цветом" />
              <MarkerArrow label="это вы" className="top-[2%] right-[2%] z-20 h-[34%] w-[34%] md:right-[8%]" />
            </>
          }
        >
          <Dashes items={["Чем вы отличаетесь", "Для кого вы работаете", "Оффер, который это объясняет"]} />
        </Card>

        <Card
          index={2}
          title="Упаковка профиля"
          visual={
            <>
              <BrushStroke
                color="#ffd23f"
                d="M60 170 C 140 120, 230 70, 340 30"
                width={78}
                className={`${center} w-[80%] max-w-[380px]`}
              />
              <Sparkle className="top-[10%] right-[22%] h-6 w-6 md:right-[30%]" />
              <Sparkle className="bottom-[14%] left-[22%] h-4 w-4 md:left-[30%]" />
              <ServiceImage src="/services/profile.png" alt="Телефон с профилем" />
            </>
          }
        >
          <Dashes items={["Структура профиля", "Тексты, которые объясняют ваш подход"]} />
        </Card>

        <Card
          index={3}
          title="Контент-система"
          visual={
            <>
              <BrushStroke
                color="#8fb8ff"
                d="M30 70 C 130 40, 260 160, 372 120"
                className={`${center} w-[92%] max-w-[420px]`}
              />
              <ServiceImage src="/services/calendar.png" alt="Календарь с отмеченными днями" />
              <Checks className="bottom-[6%] left-[8%] z-20 h-10 w-24 -rotate-6 md:left-[16%]" />
            </>
          }
        >
          <Dashes items={["О чём писать", "Как писать", "Чтобы вести контент самостоятельно"]} />
        </Card>
      </div>
    </section>
  )
}

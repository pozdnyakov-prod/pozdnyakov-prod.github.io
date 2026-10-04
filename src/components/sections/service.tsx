// «Услуга»: четыре белые карточки 2×2. В каждой картинка по центру,
// под ней заголовок капсом и список через тире.
import type { ReactNode } from "react"
import { motion } from "motion/react"

import { MODELS } from "@/lib/models"

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
function ServiceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className="relative mx-auto block h-full w-auto object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)] select-none"
    />
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

/* Полароид с подписью от руки */
function Polaroid({
  children,
  caption,
  className,
}: {
  children: ReactNode
  caption?: string
  className?: string
}) {
  return (
    <div
      className={`absolute bg-white p-3 pb-9 shadow-[0_18px_40px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="flex h-full items-center justify-center bg-[#f4f4f4]">{children}</div>
      {caption && (
        <span className="absolute bottom-2 left-4 font-hand text-[1.05rem] tracking-tight">
          {caption}
        </span>
      )}
    </div>
  )
}

const modelImg = "object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.16)]"

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
              <div className="absolute top-1/2 left-1/2 h-[92%] w-[46%] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] rounded-[45%] bg-[#ededed]" />
              <ServiceImage src="/services/profile.png" alt="Телефон с профилем" />
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
              <div className="absolute top-1/2 left-1/2 aspect-square h-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eef1f6]" />
              <ServiceImage src="/services/positioning.png" alt="Кубики, один выделен цветом" />
            </>
          }
        >
          <Dashes items={["Чем вы отличаетесь", "Для кого вы работаете", "Оффер, который это объясняет"]} />
        </Card>

        <Card
          index={2}
          title="Упаковка профиля"
          visual={
            <div className="relative mx-auto h-full w-[300px] max-w-full">
              <Polaroid className="top-[4%] left-[2%] h-[78%] w-[56%] -rotate-6">
                <img src={MODELS.letter.src} alt="" className={`h-[70%] w-[70%] -rotate-6 ${modelImg}`} />
              </Polaroid>
              <Polaroid caption="профиль" className="right-[2%] bottom-[2%] h-[80%] w-[56%] rotate-[7deg]">
                <img src={MODELS.skeleton.src} alt="" className={`h-[78%] w-[78%] ${modelImg}`} />
              </Polaroid>
            </div>
          }
        >
          <Dashes items={["Структура профиля", "Тексты, которые объясняют ваш подход"]} />
        </Card>

        <Card
          index={3}
          title="Контент-система"
          visual={<ServiceImage src="/services/calendar.png" alt="Календарь с отмеченными днями" />}
        >
          <Dashes items={["О чём писать", "Как писать", "Чтобы вести контент самостоятельно"]} />
        </Card>
      </div>
    </section>
  )
}

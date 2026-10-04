// «Услуга»: четыре белые карточки 2×2 с заголовком капсом, списком
// через тире и предметом справа, как блок «Чем мы занимаемся?» у референса.
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
      className="group relative grid min-h-[360px] overflow-hidden bg-card p-7 md:min-h-[400px] md:grid-cols-[1.05fr_1fr] md:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex flex-col justify-between gap-8">
        <h3 className="caps text-[1.55rem] sm:text-[1.9rem] md:text-[2.15rem]">{title}</h3>
        <div className="text-[1.05rem] leading-[1.1] tracking-[-0.035em]">{children}</div>
      </div>
      <div className="relative mt-6 min-h-[220px] md:mt-0">{visual}</div>
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
      className={`absolute bg-white p-3 pb-9 shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
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
              <div className="absolute top-1/2 left-1/2 h-[85%] w-[70%] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] rounded-[45%] bg-[#ededed]" />
              <img
                src={MODELS.hoodie.src}
                alt={MODELS.hoodie.alt}
                draggable={false}
                className={`absolute inset-0 m-auto h-[92%] w-[92%] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 ${modelImg}`}
              />
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
              <div className="absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eef1f6]" />
              <img
                src={MODELS.letter.src}
                alt={MODELS.letter.alt}
                draggable={false}
                className={`absolute inset-0 m-auto h-[78%] w-[78%] rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 ${modelImg}`}
              />
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
              <Polaroid className="top-[6%] left-[2%] h-[70%] w-[58%] -rotate-6 group-hover:-rotate-9">
                <img src={MODELS.letter.src} alt="" className={`h-[70%] w-[70%] -rotate-6 ${modelImg}`} />
              </Polaroid>
              <Polaroid caption="профиль" className="right-[0%] bottom-[2%] h-[72%] w-[58%] rotate-[7deg] group-hover:rotate-[10deg]">
                <img src={MODELS.skeleton.src} alt="" className={`h-[78%] w-[78%] ${modelImg}`} />
              </Polaroid>
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
              <Polaroid caption="схема" className="inset-x-[8%] top-[10%] bottom-[2%] rotate-3 group-hover:rotate-0">
                <div className="relative h-full w-full">
                  <img src={MODELS.pencil.src} alt="" className={`absolute top-[8%] left-[14%] h-[78%] w-[36%] -rotate-12 ${modelImg}`} />
                  <img src={MODELS.brush.src} alt="" className={`absolute right-[8%] bottom-[6%] h-[64%] w-[50%] ${modelImg}`} />
                </div>
              </Polaroid>
              <img
                src={MODELS.pin.src}
                alt=""
                className={`absolute top-[2%] left-[12%] h-14 w-14 -rotate-12 ${modelImg}`}
              />
            </>
          }
        >
          <Dashes items={["О чём писать", "Как писать", "Чтобы вести контент самостоятельно"]} />
        </Card>
      </div>
    </section>
  )
}

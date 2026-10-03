// Блок «Проблема» на основе Card Stack (21st.dev), как в демо:
// веер карточек, автопрокрутка, точки снизу. Фото в карточках нет,
// поэтому карточка рисуется через renderCard.
import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

import { CardStack, type CardStackItem } from "@/components/ui/card-stack"

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Портфолио есть, а внятного ответа «почему именно вы» нет",
  },
  {
    id: 2,
    title: "Профиль показывает работы, но не объясняет ваш подход",
  },
  {
    id: 3,
    title: "Клиент сравнивает вас с другими по цене, потому что больше не по чему",
  },
]

const backgrounds = [
  "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700",
  "bg-gradient-to-br from-[#0015ff] via-[#2a3bff] to-[#5b67ff]",
  "bg-gradient-to-br from-neutral-200 via-neutral-100 to-white",
]

function ProblemCard({ item }: { item: CardStackItem }) {
  const index = Number(item.id) - 1
  const light = index === 2
  return (
    <div className={`relative flex h-full w-full flex-col justify-end p-6 sm:p-8 ${backgrounds[index]}`}>
      <p
        className={`font-calendas text-[1.6rem] leading-[1.15] sm:text-[2.1rem] ${
          light ? "text-neutral-900" : "text-white"
        }`}
      >
        {item.title}
      </p>
    </div>
  )
}

export function Problem() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(520)

  // Карточки в демо шириной 520px; на телефоне ужимаем под экран.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.min(520, Math.round(entry.contentRect.width - 24)))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const compact = width < 480

  return (
    <section id="problem" className="w-full overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center font-calendas text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Хорошие работы не продают себя сами
        </motion.h2>

        <div ref={wrapRef} className="mt-12 md:mt-16">
          <CardStack
            items={items}
            initialIndex={0}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
            cardWidth={width}
            cardHeight={compact ? 300 : 320}
            overlap={compact ? 0.72 : 0.48}
            spreadDeg={compact ? 28 : 48}
            renderCard={(item) => <ProblemCard item={item} />}
          />
        </div>
      </div>
    </section>
  )
}

// «Процесс»: заголовок по центру и четыре карточки-стикера из промта
// How It Works, по горизонтали слева направо. Предметы шагов стоят
// внутри цветных плашек и не двигаются.
import { motion } from "motion/react"

import { MODELS } from "@/lib/models"
import HowItWorks, { type Step } from "@/components/ui/how-it-works"

const steps: Step[] = [
  {
    title: "Бриф",
    description: "Разбираю работы, клиентов и текущий профиль.",
    colorTheme: "orange",
    prop: { src: MODELS.pencil.src, rotate: 35 },
  },
  {
    title: "Анализ",
    description: "Нахожу, чем вы отличаетесь.",
    colorTheme: "blue",
  },
  {
    title: "Упаковка",
    description: "Собираю позиционирование, оффер и профиль.",
    colorTheme: "purple",
    prop: { src: MODELS.brush.src, rotate: -10 },
  },
  {
    title: "Передача",
    description: "Вы получаете систему и ведёте её сами.",
    colorTheme: "orange",
  },
]

export function Process() {
  return (
    <section id="process" className="relative pt-24 pb-10 md:pt-28">
      <div className="px-4 text-center md:px-14">
        <motion.h2
          className="display text-[3.2rem] md:text-[5.4rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Процесс
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-[30ch] text-[1.25rem] leading-[1.15] tracking-[-0.04em] text-subtle md:text-[1.5rem]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Четыре шага, после которых вы ведёте систему сами
        </motion.p>
      </div>

      <div className="mt-10 md:mt-12">
        <HowItWorks features={steps} />
      </div>
    </section>
  )
}

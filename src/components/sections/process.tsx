// Блок «Процесс» на основе How It Works (21st.dev): четыре карточки-стикера
// на линованном фоне, соединённые бегущей пунктирной линией.
import { motion } from "motion/react"

import HowItWorks, { type Step } from "@/components/ui/how-it-works"

const steps: Step[] = [
  {
    title: "Бриф",
    description: "Разбираю работы, клиентов и текущий профиль.",
    colorTheme: "orange",
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
  },
  {
    title: "Передача",
    description: "Вы получаете систему и ведёте её сами.",
    colorTheme: "orange",
  },
]

export function Process() {
  return (
    <section id="process" className="w-full bg-white pt-24 md:pt-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 text-center font-calendas text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl"
      >
        Четыре шага
      </motion.h2>
      <HowItWorks features={steps} />
    </section>
  )
}

// «Процесс»: подпись в скобках, крупная фраза по центру и четыре
// плашки-шага, связанные стрелками от руки, как манифест у референса.
import { motion } from "motion/react"
import { RefreshCw } from "lucide-react"

import { MODELS } from "@/lib/models"
import { Bracket, HandArrow } from "@/components/decor"
import { cn } from "@/lib/utils"

const steps = [
  { title: "бриф", text: "Разбираю работы, клиентов и текущий профиль." },
  { title: "анализ", text: "Нахожу, чем вы отличаетесь." },
  { title: "упаковка", text: "Собираю позиционирование, оффер и профиль." },
  { title: "передача", text: "Вы получаете систему и ведёте её сами." },
]

// Позиции плашек на десктопе: зигзаг слева направо
const spots = [
  "md:top-[0%] md:left-[2%]",
  "md:top-[46%] md:left-[24%]",
  "md:top-[0%] md:left-[52%]",
  "md:top-[46%] md:right-[2%]",
]

function Step({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <motion.div
      className={cn("relative md:absolute md:w-[300px]", spots[index])}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-[#cfcfcf] bg-card px-8 py-4 text-[1.5rem] tracking-[-0.05em] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <span className="text-[1rem] text-subtle">0{index + 1}</span>
        {title}
      </div>
      <p className="mt-3 max-w-[22ch] pl-2 text-[1.05rem] leading-[1.1] tracking-[-0.035em] text-subtle">
        {text}
      </p>
    </motion.div>
  )
}

export function Process() {
  return (
    <section id="process" className="relative px-4 pt-24 pb-10 md:px-14 md:pt-28">
      <Bracket>pozdnyakov-prod</Bracket>
      <motion.h2
        className="display mx-auto mt-6 max-w-[17ch] text-center text-[2.6rem] md:mt-8 md:text-[4.2rem]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Четыре шага, <span className="font-bold">после которых вы ведёте систему сами</span>
      </motion.h2>

      <div className="relative mx-auto mt-12 flex max-w-[1240px] flex-col gap-10 md:mt-16 md:block md:h-[330px]">
        {steps.map((s, i) => (
          <Step key={s.title} {...s} index={i} />
        ))}

        {/* Стрелки между шагами: на десктопе по зигзагу, на телефоне вниз */}
        <HandArrow viewBox="0 0 110 130" className="hidden h-[130px] w-[110px] md:block md:top-[4%] md:left-[19%]" d="M6 12 C 60 6, 96 40, 82 118" />
        <HandArrow viewBox="0 0 160 130" className="hidden h-[130px] w-[160px] md:block md:top-[12%] md:left-[39%]" d="M6 120 C 30 60, 90 22, 150 16" />
        <HandArrow viewBox="0 0 110 130" className="hidden h-[130px] w-[110px] md:block md:top-[4%] md:left-[70%]" d="M6 12 C 60 6, 96 40, 82 118" />

        <RefreshCw
          aria-hidden="true"
          className="absolute top-[58%] left-[50%] hidden h-14 w-14 -translate-x-1/2 animate-[spin-slow_9s_linear_infinite] md:block"
          strokeWidth={1.6}
        />
        <img
          src={MODELS.pencil.src}
          alt=""
          aria-hidden="true"
          className="absolute -top-10 -left-2 hidden h-24 w-16 -rotate-[30deg] object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.15)] md:block"
        />
      </div>
    </section>
  )
}

// Блок на основе About Section, uilayout (21st.dev): фото с вырезами
// по углам и проявление заголовка по словам. Цифры из оригинала убраны.
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "@phosphor-icons/react"

import { CHANNEL_URL } from "@/lib/links"

const name = ["Владимир", "Поздняков"]

export function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-12">
        <div className="relative md:col-span-5">
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-soft">
            <span className="text-sm text-muted">Здесь будет фото</span>
          </div>
          {/* Вырезы по углам: прямоугольники цвета фона поверх фото */}
          <div className="absolute top-0 left-0 bg-paper pr-4 pb-3 text-[0.72rem] tracking-[0.12em] uppercase">
            Обо мне
          </div>
          <div className="absolute right-0 bottom-0 h-14 w-24 bg-paper md:h-16 md:w-28" />
        </div>

        <div className="flex flex-col justify-end md:col-span-7 md:pb-4">
          <h2 className="font-display text-[3rem] leading-[1] font-light tracking-[-0.02em] md:text-[5.6rem]">
            {name.map((word, i) => (
              <motion.span
                key={word}
                className="mr-[0.25em] inline-block"
                initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)", y: 12 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <p className="mt-6 max-w-[34ch] font-accent text-[1.3rem] leading-[1.5] italic md:mt-8 md:text-[1.5rem]">
            Занимаюсь позиционированием и контентом для дизайнеров, в работе
            использую AI.
          </p>

          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-start gap-2 self-start text-[0.95rem] leading-snug"
          >
            <span className="underline decoration-1 underline-offset-[5px] transition-colors group-hover:decoration-transparent">Как я думаю и работаю — в канале @vl_content</span>
            <ArrowUpRight
              size={16}
              className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

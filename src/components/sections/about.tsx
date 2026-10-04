// «Обо мне»: фото в полароиде на кнопке, к нему справа снизу прилеплен
// скелет-художник; справа имя капсом, текст и ссылка на канал.
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { CHANNEL_URL } from "@/lib/links"
import { MODELS } from "@/lib/models"

export function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="px-4 pt-24 md:px-14 md:pt-32">
      <div className="grid items-center gap-16 bg-card px-6 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:px-14 md:py-16">
        <motion.div
          className="relative mx-auto w-[78%] max-w-[340px] md:w-full"
          initial={{ opacity: 0, rotate: -8, y: 30 }}
          whileInView={{ opacity: 1, rotate: -3, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white p-4 pb-14 shadow-[0_24px_50px_rgba(0,0,0,0.14)]">
            <div className="flex aspect-[4/5] items-center justify-center bg-[#e8e8e8]">
              <span className="text-sm text-subtle">Здесь будет фото</span>
            </div>
            <span className="absolute bottom-4 left-6 font-hand text-[1.3rem]">это я</span>
          </div>
          <img
            src={MODELS.pin.src}
            alt=""
            aria-hidden="true"
            className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rotate-12 object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.2)]"
          />
          <motion.img
            src={MODELS.skeleton.src}
            alt={MODELS.skeleton.alt}
            draggable={false}
            className="absolute -right-12 -bottom-12 h-44 w-36 rotate-6 object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.22)] md:-right-16 md:-bottom-14 md:h-56 md:w-44"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[1.3rem] font-medium tracking-[-0.05em] uppercase">
            <span className="font-light">[</span> обо мне <span className="font-light">]</span>
          </p>
          <h2 className="caps mt-5 text-[3rem] md:text-[4.6rem]">
            Владимир
            <br />
            Поздняков
          </h2>
          <p className="mt-6 max-w-[30ch] text-[1.35rem] leading-[1.12] tracking-[-0.04em] md:text-[1.6rem]">
            Занимаюсь позиционированием и контентом для дизайнеров, в работе
            использую AI.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-start gap-2 text-[1.1rem] tracking-[-0.035em]"
          >
            <span className="underline decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-transparent">
              Как я думаю и работаю — в канале @vl_content
            </span>
            <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// «Проблема»: сетка карточек с крупными подписями капсом,
// по композиции как блок кейсов у референса.
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const problems = [
  {
    title: "Почему вы?",
    text: "Портфолио есть, а внятного ответа «почему именно вы» нет",
    image: { src: "/problem/question.png", alt: "Вопросительный знак" },
    bg: "bg-[#e6e9f3]",
  },
  {
    title: "Подход",
    text: "Профиль показывает работы, но не объясняет ваш подход",
    image: { src: "/problem/frame.png", alt: "Картина и пузырь речи" },
    bg: "bg-[#f1e6e4]",
  },
  {
    title: "Цена",
    text: "Клиент сравнивает вас с другими по цене, потому что больше не по чему",
    image: { src: "/problem/price.png", alt: "Ценник с рублём" },
    bg: "bg-[#e7ece6]",
  },
]

export function Problem() {
  return (
    <section id="problem" className="px-4 pt-20 pb-10 md:px-14 md:pt-28">
      <motion.h2
        className="display max-w-[11ch] text-[3.2rem] md:max-w-[19ch] md:text-[5.4rem]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Хорошие работы не продают себя сами
      </motion.h2>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-6">
        {problems.map((item, i) => (
          <motion.article
            key={item.title}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={cn(
                "relative flex aspect-square items-center justify-center overflow-hidden rounded-[10px]",
                item.bg
              )}
            >
              <img
                src={item.image.src}
                alt={item.image.alt}
                draggable={false}
                className="h-[78%] w-[78%] object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <h3 className="caps mt-4 text-[2.6rem] md:text-[3.1rem]">{item.title}</h3>
            <p className="mt-2 max-w-[32ch] text-[1.15rem] leading-[1.1] tracking-[-0.035em] text-subtle">
              {item.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// Блок FAQ на основе FAQ Chat Accordion (21st.dev). Как в демо, у части
// вопросов сверху «наклейки», только вместо эмодзи 3D-модели.
import { motion } from "motion/react"

import { FaqAccordion } from "@/components/ui/faq-chat-accordion"

function Sticker({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] md:h-12 md:w-12"
    />
  )
}

const data = [
  {
    id: 1,
    question: "Что нужно от меня?",
    answer:
      "Ссылка на текущий профиль, работы, которые вы считаете сильными, и ответы на бриф: с кем работали и с кем хотите работать.",
    icon: <Sticker src="/models/hoodie.webp" alt="Худи" />,
    iconPosition: "right" as const,
  },
  {
    id: 2,
    question: "Сколько времени это занимает?",
    answer:
      "От 3 до 5 дней. После того как вы получите файл, ещё две недели полного менторства.",
  },
  {
    id: 3,
    question: "Кому это подходит?",
    answer:
      "Дизайнерам, у которых уже есть работы и заказы, но профиль не объясняет, чем вы отличаетесь от других. Не подойдёт, если портфолио пока нет.",
    icon: <Sticker src="/models/pencil.webp" alt="Карандаш" />,
    iconPosition: "left" as const,
  },
  {
    id: 4,
    question: "Почему без гарантий?",
    answer:
      "Число заявок зависит от ниши, рынка и того, как регулярно вы ведёте контент. Я отвечаю за систему: позиционирование, упаковку и схему контента.",
    icon: <Sticker src="/models/brush.webp" alt="Кисть" />,
    iconPosition: "right" as const,
  },
  {
    id: 5,
    question: "Как проходит оплата?",
    answer: "Оплата 100%. Работаю как самозанятый и присылаю чек.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="w-full py-24 md:py-32">
      <div className="mx-auto w-full max-w-[700px] px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 px-4 font-calendas text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Частые вопросы
        </motion.h2>
        <FaqAccordion
          data={data}
          timestamp="Отвечаю в Telegram @vlpozd"
          className="max-w-[700px]"
          answerClassName="max-w-md"
        />
      </div>
    </section>
  )
}

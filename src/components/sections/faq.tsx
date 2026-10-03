// Блок на основе FAQ Chat Accordion, anshuman008 (21st.dev):
// вопрос выглядит как сообщение, ответ приходит репликой.
import { useState } from "react"
import { motion } from "motion/react"
import * as Accordion from "@radix-ui/react-accordion"
import { Minus, Plus } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

const faq = [
  {
    id: "need",
    question: "Что нужно от меня?",
    answer:
      "Ссылка на текущий профиль, работы, которые вы считаете сильными, и ответы на бриф: с кем работали и с кем хотите работать.",
  },
  {
    id: "time",
    question: "Сколько времени это занимает?",
    answer:
      "От 3 до 5 дней. После того как вы получите файл, ещё две недели полного менторства.",
  },
  {
    id: "fit",
    question: "Кому это подходит?",
    answer:
      "Дизайнерам, у которых уже есть работы и заказы, но профиль не объясняет, чем вы отличаетесь от других. Не подойдёт, если портфолио пока нет.",
  },
  {
    id: "guarantee",
    question: "Почему без гарантий?",
    answer:
      "Число заявок зависит от ниши, рынка и того, как регулярно вы ведёте контент. Я отвечаю за систему: позиционирование, упаковку и схему контента.",
  },
  {
    id: "payment",
    question: "Как проходит оплата?",
    answer: "Оплата 100%. Работаю как самозанятый и присылаю чек.",
  },
]

export function Faq() {
  const [openItem, setOpenItem] = useState<string>("")

  return (
    <section id="faq" className="border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-12">
        <h2 className="font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:col-span-4 md:text-[4.2rem]">
          Частые вопросы
        </h2>

        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="md:col-span-8"
        >
          {faq.map((item) => {
            const isOpen = openItem === item.id
            return (
              <Accordion.Item value={item.id} key={item.id} className="mb-3">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-start gap-x-4 text-left">
                    <span
                      className={cn(
                        "px-4 py-3 transition-colors",
                        isOpen ? "bg-ink/10" : "bg-soft hover:bg-ink/[0.07]"
                      )}
                    >
                      {item.question}
                    </span>
                    <span className={cn("shrink-0", isOpen ? "text-ink" : "text-muted")}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={isOpen ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 ml-8 pb-3 md:ml-16">
                      <p className="max-w-md bg-ink px-4 py-3 leading-relaxed text-paper">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </div>
    </section>
  )
}

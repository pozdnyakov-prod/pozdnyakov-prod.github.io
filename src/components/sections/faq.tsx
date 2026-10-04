// FAQ в виде переписки: вопрос белым сообщением слева, ответ красным
// справа. На трёх вопросах наклейки из 3D-моделей.
import { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { AnimatePresence, motion } from "motion/react"
import { Minus, Plus } from "lucide-react"

import { MODELS } from "@/lib/models"
import { Bubble } from "@/components/decor"
import { cn } from "@/lib/utils"

const faq = [
  {
    id: "need",
    q: "Что нужно от меня?",
    a: "Ссылка на текущий профиль, работы, которые вы считаете сильными, и ответы на бриф: с кем работали и с кем хотите работать.",
    sticker: { ...MODELS.hoodie, rotate: 10 },
  },
  {
    id: "time",
    q: "Сколько времени это занимает?",
    a: "От 3 до 5 дней. После того как вы получите файл, ещё две недели полного менторства.",
  },
  {
    id: "fit",
    q: "Кому это подходит?",
    a: "Дизайнерам, у которых уже есть работы и заказы, но профиль не объясняет, чем вы отличаетесь от других. Не подойдёт, если портфолио пока нет.",
    sticker: { ...MODELS.pencil, rotate: -18 },
  },
  {
    id: "guarantee",
    q: "Почему без гарантий?",
    a: "Число заявок зависит от ниши, рынка и того, как регулярно вы ведёте контент. Я отвечаю за систему: позиционирование, упаковку и схему контента.",
    sticker: { ...MODELS.brush, rotate: 12 },
  },
  {
    id: "payment",
    q: "Как проходит оплата?",
    a: "Оплата 100%. Работаю как самозанятый и присылаю чек.",
  },
]

export function Faq() {
  const [open, setOpen] = useState("")

  return (
    <section id="faq" className="px-4 pt-24 md:px-14 md:pt-32">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <motion.h2
          className="display max-w-[9ch] text-[3.2rem] md:text-[5.4rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Частые вопросы
        </motion.h2>

        <Accordion.Root type="single" collapsible value={open} onValueChange={setOpen} className="space-y-4">
          {faq.map((item) => {
            const isOpen = open === item.id
            return (
              <Accordion.Item key={item.id} value={item.id} className={cn(item.sticker && "pt-6")}>
                <Accordion.Header>
                  <Accordion.Trigger className="group relative inline-flex cursor-pointer text-left">
                    <Bubble
                      tone="white"
                      tail="left"
                      className={cn(
                        "flex items-center gap-5 px-6 py-4 transition-colors",
                        isOpen ? "border-ink" : "group-hover:border-[#9a9a9a]"
                      )}
                    >
                      <span className="text-[1.2rem] leading-[1.1] tracking-[-0.04em] md:text-[1.35rem]">
                        {item.q}
                      </span>
                      {isOpen ? <Minus className="h-5 w-5 shrink-0" /> : <Plus className="h-5 w-5 shrink-0" />}
                    </Bubble>
                    {item.sticker && (
                      <img
                        src={item.sticker.src}
                        alt=""
                        aria-hidden="true"
                        className="absolute -top-9 -right-6 h-14 w-14 object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)]"
                        style={{ rotate: `${item.sticker.rotate}deg` }}
                      />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content forceMount asChild>
                  <div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex justify-end overflow-hidden"
                        >
                          <Bubble className="mt-3 mr-2 mb-3 max-w-[30rem] px-6 py-4">
                            <p className="text-[1.1rem] leading-[1.2] tracking-[-0.03em]">{item.a}</p>
                          </Bubble>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </div>
    </section>
  )
}

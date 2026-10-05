// FAQ как живой чат. Слева заголовок и вопросы-подсказки, справа окно
// переписки с @vlpozd: нажатый вопрос уходит в чат, затем «печатает…»
// и ответ плавно проявляется по словам. Переписка копится, окно само
// прокручивается вниз. 3D-наклейки вокруг неподвижны.
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Send } from "lucide-react"

import { MODELS } from "@/lib/models"
import { TELEGRAM_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

const faq = [
  {
    id: "need",
    q: "Что нужно от меня?",
    a: "Ссылка на текущий профиль, работы, которые вы считаете сильными, и ответы на бриф: с кем работали и с кем хотите работать.",
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
  },
  {
    id: "guarantee",
    q: "Почему без гарантий?",
    a: "Число заявок зависит от ниши, рынка и того, как регулярно вы ведёте контент. Я отвечаю за систему: позиционирование, упаковку и схему контента.",
  },
  {
    id: "payment",
    q: "Как проходит оплата?",
    a: "Оплата 100%. Работаю как самозанятый и присылаю чек.",
  },
]

type Message = { key: string; from: "me" | "you"; text: string }

const ease = [0.16, 1, 0.3, 1] as const

const GREETING: Message = {
  key: "hello",
  from: "me",
  text: "Привет! Выберите вопрос, отвечу прямо здесь.",
}

/* Ответ проявляется по словам: каждое слово всплывает из размытия */
function RevealText({ text, instant }: { text: string; instant: boolean }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={instant ? false : { opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: instant ? 0 : i * 0.035, ease }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  )
}

function Typing() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="печатает">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full bg-subtle"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  )
}

function Sticker({ src, className }: { src: string; className: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn(
        "pointer-events-none absolute z-20 hidden object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.18)] select-none lg:block",
        className
      )}
    />
  )
}

export function Faq() {
  const reduce = useReducedMotion()
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [asked, setAsked] = useState<string[]>([])
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Окно чата плавно прокручивается к последнему сообщению
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [messages, typing, reduce])

  useEffect(() => () => clearTimeout(timer.current), [])

  const ask = (id: string) => {
    if (typing) return
    const item = faq.find((f) => f.id === id)!
    const n = Date.now()
    setAsked((a) => (a.includes(id) ? a : [...a, id]))
    setMessages((m) => [...m, { key: `q-${n}`, from: "you", text: item.q }])
    setTyping(true)
    // На узком экране чат под вопросами: плавно подводим к нему
    if (window.innerWidth < 1024) {
      chatRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
    }
    timer.current = setTimeout(
      () => {
        setTyping(false)
        setMessages((m) => [...m, { key: `a-${n}`, from: "me", text: item.a }])
      },
      reduce ? 0 : 900
    )
  }

  return (
    <section id="faq" className="relative overflow-x-clip px-4 pt-24 md:px-14 md:pt-32 xl:px-[3.9vw]">
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Левая колонка: заголовок и вопросы */}
        <div className="relative">
          <motion.h2
            className="display text-[3.2rem] md:text-[5.4rem]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease }}
          >
            Частые
            <br />
            вопросы
          </motion.h2>
          <p className="mt-4 max-w-[34ch] text-[1.1rem] leading-[1.2] tracking-[-0.035em] text-subtle md:text-[1.25rem]">
            Нажмите на вопрос, ответ придёт в чат<span className="hidden lg:inline"> справа</span>.
          </p>

          <ul className="mt-8 flex flex-col items-start gap-3 md:mt-10">
            {faq.map((item, i) => {
              const done = asked.includes(item.id)
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                >
                  <button
                    type="button"
                    onClick={() => ask(item.id)}
                    disabled={typing}
                    aria-controls="faq-chat"
                    className={cn(
                      "group flex items-center gap-3 rounded-full border px-5 py-3 text-left text-[1.05rem] tracking-[-0.03em] transition-all duration-300 md:text-[1.2rem]",
                      "disabled:cursor-wait",
                      done
                        ? "border-orange/40 bg-[#fbe3d3] text-ink"
                        : "border-line bg-card hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border text-xs transition-colors",
                        done ? "border-orange bg-orange text-white" : "border-line text-subtle group-hover:border-ink group-hover:text-ink"
                      )}
                    >
                      {done ? <Check className="size-3.5" strokeWidth={3} /> : "?"}
                    </span>
                    {item.q}
                  </button>
                </motion.li>
              )
            })}
          </ul>

          <Sticker src={MODELS.pencil.src} className="top-2 right-[8%] h-28 w-20 rotate-[28deg]" />
          <Sticker src={MODELS.brush.src} className="right-[2%] bottom-2 h-28 w-28 -rotate-12" />
        </div>

        {/* Правая колонка: окно чата */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <Sticker src={MODELS.pin.src} className="-top-6 -left-5 size-16 -rotate-12" />
          <Sticker src={MODELS.hoodie.src} className="-top-12 -right-8 size-28 rotate-[10deg]" />

          <div ref={chatRef} className="flex h-[560px] flex-col overflow-hidden rounded-[28px] border border-line bg-card shadow-[0_30px_60px_rgba(0,0,0,0.08)] lg:h-[600px]">
            {/* Шапка чата */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="size-11 shrink-0 overflow-hidden rounded-full">
                <img src="/about/me.webp" alt="" className="size-full scale-[2.2] object-cover object-[30%_78%] [transform-origin:30%_78%]" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold tracking-[-0.03em]">Владимир Поздняков</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={typing ? "t" : "n"}
                    className={cn("text-sm", typing ? "text-orange" : "text-subtle")}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    {typing ? "печатает…" : "@vlpozd"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Сообщения */}
            <div
              id="faq-chat"
              ref={scrollRef}
              aria-live="polite"
              className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[length:18px_18px] px-4 py-5 md:px-6"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.key}
                    layout
                    className={cn("flex", m.from === "you" ? "justify-end" : "justify-start")}
                    initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    style={{ transformOrigin: m.from === "you" ? "100% 100%" : "0% 100%" }}
                  >
                    <div
                      className={cn(
                        "max-w-[82%] px-4 py-3 text-[1rem] leading-[1.35] tracking-[-0.01em] md:text-[1.05rem]",
                        m.from === "you"
                          ? "rounded-[20px] rounded-br-md bg-ink text-white"
                          : "rounded-[20px] rounded-bl-md border border-line bg-white text-ink shadow-[0_6px_16px_rgba(0,0,0,0.05)]"
                      )}
                    >
                      {m.from === "me" ? <RevealText text={m.text} instant={!!reduce} /> : m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    layout
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="rounded-[20px] rounded-bl-md border border-line bg-white px-4 py-2.5">
                      <Typing />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Строка ввода — ссылка в Telegram */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border-t border-line px-4 py-3 md:px-5"
            >
              <span className="flex-1 rounded-full bg-paper px-4 py-2.5 text-subtle transition-colors group-hover:text-ink">
                Задать свой вопрос в Telegram
              </span>
              <span className="grid size-10 place-items-center rounded-full bg-orange text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                <Send className="size-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

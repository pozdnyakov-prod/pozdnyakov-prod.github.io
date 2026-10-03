// Блок на основе How It Works 2, 7ovr (21st.dev): вертикальные шаги
// с иконками и соединительной линией. Без закреплённой прокрутки.
import { ClipboardText, Key, MagnifyingGlass, Package } from "@phosphor-icons/react"

const steps = [
  {
    icon: ClipboardText,
    title: "Бриф",
    text: "Разбираю работы, клиентов и текущий профиль.",
  },
  {
    icon: MagnifyingGlass,
    title: "Анализ",
    text: "Нахожу, чем вы отличаетесь.",
  },
  {
    icon: Package,
    title: "Упаковка",
    text: "Собираю позиционирование, оффер и профиль.",
  },
  {
    icon: Key,
    title: "Передача",
    text: "Вы получаете систему и ведёте её сами.",
  },
]

export function Process() {
  return (
    <section id="process" className="border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4.2rem]">
          Четыре шага
        </h2>

        <ol className="mt-12 md:mt-16 md:ml-[33%]">
          {steps.map((step, index) => {
            const Icon = step.icon
            const last = index === steps.length - 1
            return (
              <li key={step.title} className="relative flex gap-5 md:gap-8">
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-0 left-[21px] w-px bg-line md:left-[23px]"
                  />
                )}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-card md:h-12 md:w-12">
                  <Icon size={20} weight="light" aria-hidden="true" />
                </div>
                <div className={last ? "pt-1" : "pt-1 pb-12 md:pb-14"}>
                  <h3 className="font-display text-[1.75rem] leading-[1.1] font-light md:text-[2rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[42ch] leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

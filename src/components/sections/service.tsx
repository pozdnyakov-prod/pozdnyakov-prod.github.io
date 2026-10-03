// Блок на основе Bento Grid, kokonutd (21st.dev).
// Три плитки ровно под три части услуги; статусы, метрики и «Explore →» убраны.
import type { Icon } from "@phosphor-icons/react"
import { Crosshair, IdentificationCard, Notebook } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

interface BentoItem {
  title: string
  description: string
  icon: Icon
  tags: string[]
  className: string
  tone: "ink" | "dots" | "soft"
}

const items: BentoItem[] = [
  {
    title: "Позиционирование и оффер",
    description: "Чем вы отличаетесь и для кого работаете.",
    icon: Crosshair,
    tags: ["отличия", "аудитория"],
    className: "md:col-span-2 md:min-h-[320px]",
    tone: "ink",
  },
  {
    title: "Упаковка профиля",
    description: "Структура и тексты, которые объясняют ваш подход.",
    icon: IdentificationCard,
    tags: ["структура", "тексты"],
    className: "md:min-h-[320px]",
    tone: "dots",
  },
  {
    title: "Контент-система",
    description: "Схема, о чём и как писать, чтобы вести контент самостоятельно.",
    icon: Notebook,
    tags: ["о чём писать", "как писать"],
    className: "md:col-span-3 md:flex-row md:items-end md:justify-between md:min-h-[240px]",
    tone: "soft",
  },
]

function Rings() {
  // Простая геометрия для первой плитки: прицел из концентрических кругов.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -bottom-16 hidden h-72 w-72 sm:block"
    >
      {[100, 72, 44, 16].map((size) => (
        <span
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/20"
          style={{ width: `${size}%`, height: `${size}%` }}
        />
      ))}
    </div>
  )
}

export function Service() {
  return (
    <section id="service" className="border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="max-w-[16ch] font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4.2rem]">
          Три части одной системы
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            const dark = item.tone === "ink"
            return (
              <article
                key={item.title}
                className={cn(
                  "group relative flex flex-col justify-between gap-10 overflow-hidden border p-6 transition-transform duration-300 will-change-transform hover:-translate-y-0.5 md:p-9",
                  dark ? "border-ink bg-ink text-paper" : "border-line",
                  item.tone === "dots" && "bg-card",
                  item.tone === "soft" && "bg-soft",
                  item.className
                )}
              >
                {item.tone === "dots" && (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.09)_1px,transparent_1px)] bg-[length:6px_6px] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                )}
                {dark && <Rings />}

                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center border",
                    dark ? "border-paper/25" : "border-line bg-paper",
                    item.tone === "soft" && "md:hidden"
                  )}
                >
                  <Icon size={20} weight="light" aria-hidden="true" />
                </div>

                <div className="relative space-y-3 md:max-w-[44ch]">
                  {item.tone === "soft" && (
                    <div className="mb-10 hidden h-10 w-10 items-center justify-center border border-line bg-paper md:flex">
                      <Icon size={20} weight="light" aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="font-display text-[1.9rem] leading-[1.1] font-light md:text-[2.3rem]">
                    {item.title}
                  </h3>
                  <p className={cn("leading-relaxed", dark ? "text-paper/70" : "text-muted")}>
                    {item.description}
                  </p>
                </div>

                <ul className="relative flex flex-wrap gap-2 text-xs">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className={cn(
                        "px-2.5 py-1",
                        dark ? "bg-paper/10 text-paper/80" : "bg-ink/5 text-muted"
                      )}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

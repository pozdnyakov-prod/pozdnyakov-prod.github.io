// Блок на основе Single Pricing Card 1, efferd (21st.dev): рамка
// с крестиками по углам на фоне затухающей сетки, две панели внутри.
import { Check, TelegramLogo } from "@phosphor-icons/react"

import { TELEGRAM_URL } from "@/lib/links"

const included = [
  {
    title: "Позиционирование и оффер",
    text: "Чем вы отличаетесь и для кого работаете.",
  },
  {
    title: "Упаковка профиля",
    text: "Структура и тексты, которые объясняют ваш подход.",
  },
  {
    title: "Контент-система",
    text: "Схема, о чём и как писать, чтобы вести контент самостоятельно.",
  },
]

function Cross({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute h-4 w-4 ${className}`}>
      <span className="absolute top-1/2 left-0 h-px w-full bg-ink" />
      <span className="absolute top-0 left-1/2 h-full w-px bg-ink" />
    </span>
  )
}

export function Pricing() {
  return (
    <section id="price" className="relative border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-center font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4.2rem]">
          Стоимость
        </h2>

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-10 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_72%)] md:-inset-x-24"
          />

          <div className="relative border border-line bg-paper">
            <Cross className="-top-2 -left-2" />
            <Cross className="-top-2 -right-2" />
            <Cross className="-bottom-2 -left-2" />
            <Cross className="-right-2 -bottom-2" />

            <div className="grid gap-3 p-3 md:grid-cols-2 md:p-4">
              <div className="p-5 md:p-7">
                <h3 className="text-sm text-muted">Что входит</h3>
                <ul className="mt-6 space-y-6">
                  {included.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <Check size={18} weight="bold" className="mt-1 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-10 border border-line bg-card p-5 md:p-7">
                <div>
                  <h3 className="text-sm text-muted">Одна услуга целиком</h3>
                  <p className="mt-4 font-display text-[3.6rem] leading-none font-light tracking-[-0.02em] whitespace-nowrap md:text-[4.6rem]">
                    11 990 ₽
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    От 3 до 5 дней, затем две недели менторства.
                  </p>
                </div>

                <div>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent w-full"
                  >
                    <TelegramLogo size={18} />
                    Обсудить в Telegram
                  </a>
                  <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">
                    Гарантий по количеству заявок не даю: результат зависит и от
                    того, как вы будете вести систему.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

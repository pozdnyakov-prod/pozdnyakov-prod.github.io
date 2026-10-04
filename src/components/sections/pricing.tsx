// Блок «Цена» по промту Single Pricing Card 1 (21st.dev): разметка, сетка
// на фоне, рамка с плюсами по углам, две панели и бегущий по краю свет —
// как в промте. Изменены тексты, цвет (приглушённый оранжевый), заголовок
// блока крупно, как у остальных блоков, и рамка растянута почти на экран.
// Зачёркнутых цен и скидок из демо нет: у нас одна фиксированная цена.
import { CheckIcon, PlusIcon, ShieldCheckIcon } from "lucide-react"
import { motion } from "motion/react"
import type { CSSProperties } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BorderTrail } from "@/components/ui/border-trail"
import { cn } from "@/lib/utils"
import { TELEGRAM_URL } from "@/lib/links"

/* Список «что входит» между описанием и ценой */
function Included({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 md:mt-8">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm md:text-base">
          <CheckIcon className="text-primary mt-0.5 size-4 shrink-0 md:size-5" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Pricing() {
  return (
    <section
      id="price"
      className="relative overflow-hidden pt-24 pb-16 md:pt-28"
      // Акцентный цвет блока: приглушённый оранжевый вместо чёрного из промта
      style={{ "--primary": "var(--orange)" } as CSSProperties}
    >
      <div className="mx-auto w-full space-y-5 px-4 md:px-14 xl:px-[3.9vw]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl space-y-0"
        >
          <h2 className="display text-center text-[3.2rem] md:text-[5.4rem]">Цена</h2>
          <p className="mt-4 text-center text-[1.25rem] leading-[1.15] font-semibold tracking-[-0.04em] md:text-[1.6rem]">
            Одна услуга с фиксированным составом
          </p>
          <p className="text-muted-foreground mt-3 text-center text-sm md:text-base">
            Позиционирование, упаковка профиля и контент-система за 3–5 дней.
            После передачи ещё две недели менторства.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className={cn(
              "z--10 pointer-events-none absolute inset-0 size-full",
              "bg-[linear-gradient(to_right,--theme(--color-foreground/.2)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/.2)_1px,transparent_1px)]",
              "bg-[size:32px_32px]",
              "[mask-image:radial-gradient(ellipse_at_center,var(--background)_10%,transparent)]",
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-[1240px] space-y-4 pt-6"
          >
            <div className="grid md:grid-cols-2 bg-background relative border p-4 md:min-h-[min(62vh,560px)] md:p-6">
              <PlusIcon className="absolute -top-3 -left-3 size-5.5" />
              <PlusIcon className="absolute -top-3 -right-3 size-5.5" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-5.5" />
              <PlusIcon className="absolute -right-3 -bottom-3 size-5.5" />

              <div className="flex w-full flex-col px-4 pt-5 pb-4 md:px-8 md:pt-8 md:pb-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold md:text-2xl">Разбор профиля</h3>
                    <div className="flex items-center gap-x-1">
                      <Badge variant="secondary">первый шаг</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:mt-2 md:text-base">
                    Посмотрю ваш профиль и скажу, что бы изменил.
                  </p>
                </div>
                <Included items={["Смотрю ваш текущий профиль", "Говорю, что бы изменил", "Решаете, нужна ли вам услуга"]} />
                <div className="mt-10 space-y-4 md:mt-auto md:pt-10">
                  <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                    <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-7xl">
                      0
                    </span>
                    <span>₽</span>
                  </div>
                  <Button className="w-full md:h-12 md:text-base" variant="outline" asChild>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Написать в Telegram
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative flex w-full flex-col rounded-lg border px-4 pt-5 pb-4 md:px-8 md:pt-8 md:pb-6">
                <BorderTrail
                  className="bg-orange"
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(184 84 26 / 45%), 0 0 140px 90px rgb(184 84 26 / 35%)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold md:text-2xl">Личный бренд</h3>
                    <div className="flex items-center gap-x-1">
                      <Badge>3 части</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:mt-2 md:text-base">
                    Позиционирование, упаковка профиля, контент-система.
                  </p>
                </div>
                <Included
                  items={[
                    "Позиционирование и оффер",
                    "Упаковка профиля",
                    "Контент-система",
                    "От 3 до 5 дней",
                    "Две недели менторства после передачи",
                  ]}
                />
                <div className="mt-10 space-y-4 md:mt-auto md:pt-10">
                  <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                    <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-7xl">
                      11 990
                    </span>
                    <span>₽</span>
                  </div>
                  <Button className="w-full md:h-12 md:text-base" asChild>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Обсудить в Telegram
                    </a>
                  </Button>
                  <p className="text-muted-foreground text-xs leading-snug">
                    Гарантий по количеству заявок не даю: результат зависит и от
                    того, как вы будете вести систему.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-x-2 text-center text-sm">
              <ShieldCheckIcon className="size-4 shrink-0" />
              <span>Оплата 100%, работаю как самозанятый и присылаю чек</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

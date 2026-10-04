// Блок «Цена» по промту Single Pricing Card 1 (21st.dev): разметка, сетка
// на фоне, рамка с плюсами по углам, две панели и бегущий по краю свет —
// как в промте. Изменены только тексты и цвет: акцент красный, как на сайте.
// Зачёркнутых цен и скидок из демо нет: у нас одна фиксированная цена.
import { PlusIcon, ShieldCheckIcon } from "lucide-react"
import { motion } from "motion/react"
import type { CSSProperties } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BorderTrail } from "@/components/ui/border-trail"
import { cn } from "@/lib/utils"
import { TELEGRAM_URL } from "@/lib/links"

export function Pricing() {
  return (
    <section
      id="price"
      className="relative overflow-hidden py-24"
      // Акцентный цвет блока: красный вместо чёрного из промта
      style={{ "--primary": "var(--red)" } as CSSProperties}
    >
      <div className="mx-auto w-full max-w-6xl space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-5"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border bg-card px-4 py-1 font-mono">Цена</div>
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Одна услуга с фиксированным составом
          </h2>
          <p className="text-muted-foreground mt-5 text-center text-sm md:text-base">
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
            className="mx-auto w-full max-w-2xl space-y-2"
          >
            <div className="grid md:grid-cols-2 bg-background relative border p-4">
              <PlusIcon className="absolute -top-3 -left-3 size-5.5" />
              <PlusIcon className="absolute -top-3 -right-3 size-5.5" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-5.5" />
              <PlusIcon className="absolute -right-3 -bottom-3 size-5.5" />

              <div className="w-full px-4 pt-5 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold">Разбор профиля</h3>
                    <div className="flex items-center gap-x-1">
                      <Badge variant="secondary">первый шаг</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Посмотрю ваш профиль и скажу, что бы изменил.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                    <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                      0
                    </span>
                    <span>₽</span>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Написать в Telegram
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative w-full rounded-lg border px-4 pt-5 pb-4">
                <BorderTrail
                  className="bg-red"
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(226 6 27 / 45%), 0 0 140px 90px rgb(226 6 27 / 35%)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold">Личный бренд</h3>
                    <div className="flex items-center gap-x-1">
                      <Badge>3 части</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Позиционирование, упаковка профиля, контент-система.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                    <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                      11 990
                    </span>
                    <span>₽</span>
                  </div>
                  <Button className="w-full" asChild>
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

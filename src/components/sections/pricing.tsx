// Блок «Цена» на основе Single Pricing Card 1 (21st.dev): рамка с плюсами
// по углам, сетка на фоне, правая панель с бегущим по краю светом.
// В демо два тарифа; у нас одна услуга, поэтому слева состав, справа цена.
import { Check, PlusIcon, ShieldCheckIcon } from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BorderTrail } from "@/components/ui/border-trail"
import { cn } from "@/lib/utils"
import { TELEGRAM_URL } from "@/lib/links"

const included = [
  "Позиционирование и оффер",
  "Упаковка профиля",
  "Контент-система",
]

export function Pricing() {
  return (
    <section id="price" className="relative overflow-hidden py-24">
      <div className="mx-auto w-full max-w-6xl space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-5"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 font-mono">Цена</div>
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Одна услуга с фиксированным составом
          </h2>
          <p className="text-muted-foreground mt-5 text-center text-sm md:text-base">
            Позиционирование, упаковка профиля и контент-система за одну цену.
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
                    <h3 className="leading-none font-semibold">Состав</h3>
                    <Badge variant="secondary">3 части</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">Всё входит в одну цену.</p>
                </div>
                <ul className="mt-8 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-6 text-sm">
                  От 3 до 5 дней, затем две недели менторства.
                </p>
              </div>

              <div className="relative w-full rounded-lg border px-4 pt-5 pb-4">
                <BorderTrail
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold">Услуга целиком</h3>
                    <Badge>фиксированная</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">Одна цена, без тарифов.</p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-muted-foreground flex items-end gap-1 text-xl">
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
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Гарантий по количеству заявок не даю: результат зависит и от того,
                    как вы будете вести систему.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-x-2 text-sm text-center">
              <ShieldCheckIcon className="size-4 shrink-0" />
              <span>Оплата 100%. Работаю как самозанятый и присылаю чек.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

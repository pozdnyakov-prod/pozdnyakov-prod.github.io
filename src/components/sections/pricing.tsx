// «Цена»: папки лесенкой, как «Спектр услуг» у референса. Три части
// услуги и итоговая папка «всё вместе», выделенная рамкой с курсором.
import { motion } from "motion/react"

import { TELEGRAM_URL } from "@/lib/links"
import { CtaBox, Cursor, Folder, SelectionFrame } from "@/components/decor"
import { cn } from "@/lib/utils"

const folders = [
  { title: "позиционирование и оффер", note: "входит" },
  { title: "упаковка профиля", note: "входит" },
  { title: "контент-система", note: "входит" },
]

// Ступеньки по вертикали на десктопе
const offsets = ["md:mt-0", "md:mt-8", "md:mt-16", "md:mt-24"]

export function Pricing() {
  return (
    <section id="price" className="overflow-x-clip px-4 pt-24 pb-4 md:px-14 md:pt-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="display text-[3.2rem] md:text-[5.4rem]">Цена</h2>
          <p className="mt-3 max-w-[26ch] text-[1.25rem] leading-[1.05] tracking-[-0.04em] text-subtle">
            Одна услуга с фиксированным составом
          </p>
        </motion.div>

        <div className="md:w-[250px]">
          <CtaBox href={TELEGRAM_URL}>
            обсудить
            <br />в Telegram
          </CtaBox>
          <p className="mt-3 text-[0.9rem] leading-[1.15] tracking-[-0.03em] text-subtle">
            Гарантий по количеству заявок не даю: результат зависит и от того,
            как вы будете вести систему.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
        {folders.map((f, i) => (
          <motion.div
            key={f.title}
            className={offsets[i]}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            <Folder number={`0${i + 1}`}>
              <p className="max-w-[14ch] text-[1.3rem] leading-[1] tracking-[-0.05em]">{f.title}</p>
              <p className="mt-3 text-[1.15rem] tracking-[-0.05em] text-subtle">{f.note}</p>
            </Folder>
          </motion.div>
        ))}

        <motion.div
          className={cn("relative", offsets[3])}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <SelectionFrame className="-inset-3" />
          <Cursor className="-right-6 -bottom-9" />
          <Folder number="04">
            <p className="text-[1.3rem] leading-[1] tracking-[-0.05em]">всё вместе</p>
            <p className="mt-2 text-[2.4rem] font-semibold tracking-[-0.06em]">11 990 ₽</p>
          </Folder>
        </motion.div>
      </div>

      <p className="mt-16 max-w-[60ch] text-[1rem] leading-[1.2] tracking-[-0.03em] text-subtle md:mt-20">
        От 3 до 5 дней, затем две недели менторства. Оплата 100%, работаю как
        самозанятый и присылаю чек.
      </p>
    </section>
  )
}

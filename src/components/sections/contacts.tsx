// Контакты и подвал: подпись в скобках, призыв по центру, крупные ссылки,
// 3D-модели по бокам, разделы и огромное название внизу.
import { motion } from "motion/react"

import { CHANNEL_URL, TELEGRAM_URL } from "@/lib/links"
import { MODELS } from "@/lib/models"
import { Bracket, Model } from "@/components/decor"
import { NAV } from "@/components/sections/header"

export function Contacts() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="relative px-4 md:px-14">
        <Bracket>контакты</Bracket>
        <motion.h2
          className="display mx-auto mt-6 max-w-[17ch] text-center text-[2.4rem] md:text-[4rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Напишите — посмотрю ваш профиль и скажу, что бы изменил
        </motion.h2>

        <div className="relative mx-auto mt-14 flex max-w-[1240px] flex-col items-center gap-2 md:mt-20 md:min-h-[360px] md:justify-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="caps text-[3.4rem] transition-opacity hover:opacity-50 md:text-[5.2rem]"
          >
            Telegram
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="caps text-[3.4rem] transition-opacity hover:opacity-50 md:text-[5.2rem]"
          >
            Канал
          </a>
          <p className="mt-2 text-[1rem] tracking-[-0.03em] text-subtle">@vlpozd · @vl_content</p>

          <Model
            {...MODELS.letter}
            className="absolute top-1/2 left-0 hidden h-64 w-56 -translate-y-1/2 md:block"
            rotate={-8}
          />
          <Model
            {...MODELS.hoodie}
            className="absolute top-1/2 right-0 hidden h-72 w-72 -translate-y-1/2 md:block"
            rotate={8}
          />
        </div>

        <div className="mt-10 flex justify-center gap-10 md:hidden">
          <img src={MODELS.letter.src} alt="" className="h-32 w-28 -rotate-6 object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.16)]" />
          <img src={MODELS.hoodie.src} alt="" className="h-36 w-36 rotate-6 object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.16)]" />
        </div>
      </div>

      <nav aria-label="Разделы" className="mt-20 flex flex-wrap gap-x-7 gap-y-2 px-4 text-[1.15rem] tracking-[-0.04em] text-subtle md:mt-24 md:px-9">
        {NAV.map((item) => (
          <a key={item.url} href={item.url} className="transition-colors hover:text-ink">
            {item.name.toLowerCase()}
          </a>
        ))}
        <a href="/me/" className="transition-colors hover:text-ink">
          витрина
        </a>
      </nav>

      <p
        aria-hidden="true"
        className="mt-2 px-2 text-center text-[14.2vw] leading-[0.86] font-normal tracking-[-0.06em] md:text-[10.6vw] md:whitespace-nowrap"
      >
        POZDNYAKOV-
        <br className="md:hidden" />
        PROD
      </p>

      <div className="flex flex-wrap justify-between gap-2 px-4 pt-6 pb-8 text-[0.85rem] text-subtle md:px-9">
        <span>© 2026 Владимир Поздняков</span>
        <a href="#top" className="hover:text-ink">
          наверх ↑
        </a>
      </div>
    </footer>
  )
}

// Блок на основе Footer Bold, uilayout (21st.dev): призыв написать,
// колонки ссылок, крупное название и нижняя строка.
import { ArrowUp, TelegramLogo } from "@phosphor-icons/react"

import { CHANNEL_URL, TELEGRAM_URL } from "@/lib/links"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line px-4 pt-20 pb-28 sm:px-6 md:px-12 md:pt-32 md:pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <h2 className="max-w-[17ch] font-display text-[2.4rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4rem]">
              Напишите — посмотрю ваш профиль и скажу, что бы изменил
            </h2>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent mt-9 md:mt-12"
            >
              <TelegramLogo size={18} />
              Написать @vlpozd
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-4 md:self-end">
            <div>
              <p className="text-muted">Связь</p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-3 inline-block"
              >
                Telegram @vlpozd
              </a>
            </div>
            <div>
              <p className="text-muted">Канал</p>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-3 inline-block"
              >
                @vl_content
              </a>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 overflow-hidden font-display text-[calc((100vw-32px)/6.5)] leading-[0.9] font-light tracking-[-0.035em] whitespace-nowrap select-none sm:text-[calc((100vw-48px)/6.5)] md:mt-28 md:text-[min(calc((100vw-96px)/6.5),11.4rem)]"
        >
          pozdnyakov-prod
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 text-xs text-muted">
          <span>© 2026 Владимир Поздняков</span>
          <div className="flex items-center gap-6">
            <a href="/me/" className="hover:text-ink">
              Витрина
            </a>
            <a href="#top" className="inline-flex items-center gap-1.5 hover:text-ink">
              Наверх
              <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

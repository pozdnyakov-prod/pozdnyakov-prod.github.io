// Шапка: логотип слева, «написать» справа. Разделы — в меню tubelight
// (закреплено сверху на десктопе и снизу на телефоне).
import { Briefcase, CircleHelp, Route, Send, Tag } from "lucide-react"

import { TELEGRAM_URL } from "@/lib/links"
import { NavBar } from "@/components/ui/tubelight-navbar"

export const NAV = [
  { name: "Услуга", url: "#service", icon: Briefcase },
  { name: "Процесс", url: "#process", icon: Route },
  { name: "Цена", url: "#price", icon: Tag },
  { name: "Вопросы", url: "#faq", icon: CircleHelp },
]

export function Header() {
  return (
    <>
      <NavBar items={NAV} />

      <header className="relative z-30 flex items-center justify-between px-4 pt-5 md:px-14 md:pt-10">
        <a href="#top" className="text-[1.7rem] font-semibold tracking-[-0.06em] md:text-[1.9rem]">
          P-PROD
        </a>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram"
          className="group flex items-center gap-4"
        >
          <Send className="h-8 w-8 -rotate-12 fill-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          <span className="hidden text-[1.25rem] leading-[0.95] font-semibold tracking-[-0.04em] md:block">
            Написать
            <br />в Telegram
          </span>
        </a>
      </header>
    </>
  )
}

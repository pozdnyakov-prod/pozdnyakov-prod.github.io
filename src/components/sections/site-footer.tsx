import { Megaphone, Send } from "lucide-react"

import { Footer } from "@/components/ui/modem-animated-footer"
import { CHANNEL_URL, TELEGRAM_URL } from "@/lib/links"

const socialLinks = [
  { icon: <Send className="w-6 h-6" />, href: TELEGRAM_URL, label: "Telegram @vlpozd" },
  { icon: <Megaphone className="w-6 h-6" />, href: CHANNEL_URL, label: "Канал @vl_content" },
]

const navLinks = [
  { label: "Услуга", href: "#service" },
  { label: "Процесс", href: "#process" },
  { label: "Обо мне", href: "#about" },
  { label: "Цена", href: "#price" },
  { label: "Вопросы", href: "#faq" },
  { label: "Витрина", href: "/me/" },
]

export function SiteFooter() {
  return (
    <div id="contact">
      <Footer
        brandName="pozdnyakov-prod"
        brandDescription="Напишите — посмотрю ваш профиль и скажу, что бы изменил"
        socialLinks={socialLinks}
        navLinks={navLinks}
        action={
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold tracking-tight text-white shadow-2xl transition-transform hover:scale-105"
          >
            <Send className="h-4 w-4" />
            Написать @vlpozd
          </a>
        }
        brandIcon={
          <img
            src="/models/brush.webp"
            alt=""
            className="w-9 sm:w-12 md:w-[4.5rem] h-9 sm:h-12 md:h-[4.5rem] object-contain drop-shadow-lg"
          />
        }
      />
    </div>
  )
}

// Подвал по промту Modem Animated Footer (21st.dev): название, призыв,
// соцсети, разделы, копирайт, логотип на линии и прозрачное название на фоне.
// В самом низу — огромное POZDNYAKOV-PROD.
import { Megaphone, Send, UserRound } from "lucide-react"

import { Footer } from "@/components/ui/modem-animated-footer"
import { CHANNEL_URL, TELEGRAM_URL } from "@/lib/links"
import { NAV } from "@/components/sections/header"

const socialLinks = [
  { icon: <Send className="w-6 h-6" />, href: TELEGRAM_URL, label: "Telegram @vlpozd" },
  { icon: <Megaphone className="w-6 h-6" />, href: CHANNEL_URL, label: "Канал @vl_content" },
  { icon: <UserRound className="w-6 h-6" />, href: "/me/", label: "Витрина" },
]

const navLinks = [
  ...NAV.map((item) => ({ label: item.name, href: item.url })),
  { label: "Обо мне", href: "#about" },
  { label: "Витрина", href: "/me/" },
]

export function Contacts() {
  return (
    <div id="contact">
      <Footer
        brandName="pozdnyakov-prod"
        brandDescription="Напишите — посмотрю ваш профиль и скажу, что бы изменил."
        socialLinks={socialLinks}
        navLinks={navLinks}
        creatorName="Написать @vlpozd"
        creatorUrl={TELEGRAM_URL}
        brandIcon={
          <img
            src="/models/brush.webp"
            alt=""
            className="w-9 sm:w-12 md:w-[4.5rem] h-9 sm:h-12 md:h-[4.5rem] object-contain drop-shadow-lg"
          />
        }
      />

      {/* Огромное название в самом низу */}
      <p
        aria-hidden="true"
        className="bg-background px-2 pt-4 pb-6 text-center text-[14.2vw] leading-[0.86] font-normal tracking-[-0.06em] select-none md:text-[10.6vw] md:whitespace-nowrap"
      >
        POZDNYAKOV-
        <br className="md:hidden" />
        PROD
      </p>
    </div>
  )
}

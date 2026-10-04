// Шапка: логотип слева, «написать» справа. Разделы — в меню tubelight
// (закреплено сверху на десктопе и снизу на телефоне). Когда логотип
// уходит за экран, слева от меню плавно появляется кнопка «PP» наверх.
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Briefcase, CircleHelp, Route, Send, Tag } from "lucide-react"

import { TELEGRAM_URL } from "@/lib/links"
import { NavBar } from "@/components/ui/tubelight-navbar"

export const NAV = [
  { name: "Услуга", url: "#service", icon: Briefcase },
  { name: "Процесс", url: "#process", icon: Route },
  { name: "Цена", url: "#price", icon: Tag },
  { name: "Вопросы", url: "#faq", icon: CircleHelp },
]

/* Кнопка наверх в стиле меню: тот же размытый фон, рамка и тень */
function HomeButton({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Наверх, на первый экран"
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-border bg-background/5 text-sm font-extrabold tracking-[-0.06em] text-foreground shadow-lg backdrop-blur-lg transition-colors hover:text-primary"
          initial={{ opacity: 0, x: 10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          PP
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const logoRef = useRef<HTMLAnchorElement>(null)
  const [logoHidden, setLogoHidden] = useState(false)

  // Кнопка «PP» видна, только пока логотип P-PROD за пределами экрана
  useEffect(() => {
    const el = logoRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setLogoHidden(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <NavBar items={NAV} leading={<HomeButton visible={logoHidden} />} />

      <header className="relative z-30 flex items-center justify-between px-4 pt-5 md:px-14 md:pt-10">
        <a ref={logoRef} href="#top" className="text-[1.7rem] font-semibold tracking-[-0.06em] md:text-[1.9rem]">
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

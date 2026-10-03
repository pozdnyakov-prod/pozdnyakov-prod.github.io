// Tubelight Navbar, ayushmxxn (21st.dev).
// Изменено: якорные ссылки вместо next/link, иконки Phosphor,
// активный пункт следует за прокруткой, прямые углы как на /me.
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { Icon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: Icon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.url))
      .filter((el): el is HTMLElement => el !== null)

    // Пункт подсвечивается, когда его блок пересекает середину экрана.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = items.find((i) => i.url === `#${entry.target.id}`)
          if (!item) return
          if (entry.isIntersecting) setActiveTab(item.name)
          else setActiveTab((current) => (current === item.name ? null : current))
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Разделы"
      className={cn(
        "fixed bottom-0 left-1/2 z-40 mb-4 -translate-x-1/2 md:top-0 md:bottom-auto md:mb-0 md:pt-5",
        className
      )}
    >
      <div className="flex items-center gap-1 border border-line bg-paper/90 p-1 backdrop-blur-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              aria-current={isActive ? "true" : undefined}
              aria-label={item.name}
              className={cn(
                "relative cursor-pointer px-5 py-2.5 text-[0.8rem] tracking-[0.02em] transition-colors md:px-6 md:py-2",
                "text-ink/70 hover:text-ink",
                isActive && "text-ink"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full bg-soft"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-ink">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-ink/15 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-ink/15 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-ink/15 blur-sm" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

// Tubelight Navbar, ayushmxxn (21st.dev). Внешний вид из промта 1 в 1.
// Изменено: next/link → <a>, framer-motion → motion/react (та же библиотека),
// sm:bottom-auto — иначе на десктопе блок растягивается на всю высоту экрана;
// активный пункт сам следует за прокруткой; слева можно показать кнопку leading.
import { type ReactNode, useEffect, useState } from "react"
import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  leading?: ReactNode
}

/* Активен блок, верх которого последним прошёл линию на 40% высоты экрана.
   Пока такого нет (первый экран), ничего не подсвечено. */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = items
      .map((item) => ({ item, el: document.querySelector<HTMLElement>(item.url) }))
      .filter((t): t is { item: NavItem; el: HTMLElement } => t.el !== null)

    const update = () => {
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const { item, el } of targets) {
        if (el.getBoundingClientRect().top <= line) current = item.name
      }
      setActive(current)
    }

    // Наблюдатель срабатывает, когда верх или низ блока пересекает линию
    const observer = new IntersectionObserver(update, { rootMargin: "-40% 0px -59% 0px" })
    targets.forEach(({ el }) => observer.observe(el))
    update()
    return () => observer.disconnect()
  }, [items])

  return [active, setActive] as const
}

export function NavBar({ items, className, leading }: NavBarProps) {
  const [activeTab, setActiveTab] = useActiveSection(items)

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 sm:pt-6",
        className,
      )}
    >
      <div className="relative">
        {leading && (
          <div className="absolute top-1/2 right-full mr-2 -translate-y-1/2 sm:mr-3">{leading}</div>
        )}
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                aria-label={item.name}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

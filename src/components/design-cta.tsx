// Кнопка-призыв в стиле графического редактора: синяя таблетка (цвет
// выделения, как рамка и курсор на первом экране) с белым кругом. При наведении стрелка улетает и прилетает новая,
// а вокруг появляется синяя рамка выделения с маркерами и подписью слоя.
import { ArrowUpRight } from "lucide-react"

import { TELEGRAM_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

const handle = "absolute size-2 border-[1.5px] border-select bg-white"

export function DesignCta({
  children,
  layer = "кнопка / Telegram",
  className,
}: {
  children: string
  layer?: string
  className?: string
}) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-4 rounded-full bg-[#2563eb] py-2 pr-2 pl-7 text-[1.05rem] font-semibold tracking-[-0.03em] text-white transition-transform duration-300 active:scale-[0.98] md:text-[1.2rem]",
        className
      )}
    >
      {/* Рамка выделения: видна при наведении и фокусе */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2.5 scale-[0.97] border-[1.5px] border-select opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <span className={cn(handle, "-top-[5px] -left-[5px]")} />
        <span className={cn(handle, "-top-[5px] -right-[5px]")} />
        <span className={cn(handle, "-bottom-[5px] -left-[5px]")} />
        <span className={cn(handle, "-right-[5px] -bottom-[5px]")} />
        <span className="absolute -top-7 left-0 rounded-[4px] bg-select px-1.5 py-0.5 text-[0.7rem] font-medium tracking-normal whitespace-nowrap text-white">
          {layer}
        </span>
      </span>

      <span className="relative">{children}</span>

      {/* Круг со стрелкой: при наведении одна стрелка улетает, другая прилетает */}
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white text-[#2563eb] md:size-12">
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
          strokeWidth={2.4}
        />
        <ArrowUpRight
          aria-hidden="true"
          className="absolute size-5 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          strokeWidth={2.4}
        />
      </span>
    </a>
  )
}

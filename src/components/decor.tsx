// Общие элементы визуального языка сайта: рамка выделения из редактора
// дизайна, красный курсор, пузыри-сообщения, плашка-кнопка, папка, 3D-модель.
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

/* Синяя рамка с квадратными ручками по углам, как у выделенного слоя */
export function SelectionFrame({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  const handle = "absolute h-2.5 w-2.5 border border-select bg-white"
  return (
    <div className={cn("pointer-events-none absolute border border-select", className)}>
      <span className={cn(handle, "-top-[5px] -left-[5px]")} />
      <span className={cn(handle, "-top-[5px] -right-[5px]")} />
      <span className={cn(handle, "-bottom-[5px] -left-[5px]")} />
      <span className={cn(handle, "-right-[5px] -bottom-[5px]")} />
      {children}
    </div>
  )
}

/* Красный курсор-стрелка, слегка покачивается */
export function Cursor({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("pointer-events-none absolute h-9 w-9 md:h-11 md:w-11", className)}
      animate={reduce ? undefined : { x: [0, 4, 0], y: [0, 3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M4 3 L36 19 L21 22 L14 36 Z"
        fill="#ff8a8a"
        stroke="var(--red)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

/* Пузырь-сообщение с хвостиком справа снизу */
export function Bubble({
  children,
  className,
  tone = "red",
  tail = "right",
}: {
  children: ReactNode
  className?: string
  tone?: "red" | "white"
  tail?: "right" | "left"
}) {
  const colors =
    tone === "red" ? "bg-red text-white" : "bg-card text-ink border border-line"
  return (
    <div className={cn("relative rounded-[26px] px-6 py-4", colors, className)}>
      {children}
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={cn(
          "absolute -bottom-[7px] h-5 w-5",
          tail === "right" ? "-right-[3px]" : "-left-[3px] -scale-x-100",
          tone === "red" ? "fill-red" : "fill-card"
        )}
      >
        <path d="M0 0 C 6 6, 12 12, 20 20 C 12 18, 6 16, 2 14 Z" />
      </svg>
    </div>
  )
}

/* Плашка-кнопка «написать в Telegram +», как у референса */
export function CtaBox({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex min-h-[104px] w-full flex-col justify-end rounded-[22px] border border-[#bdbdbd] bg-[#e9e9e9] px-5 py-4 text-[1.35rem] leading-[1.05] font-semibold tracking-[-0.04em] transition-colors duration-300 hover:bg-ink hover:text-white md:w-[250px]",
        className
      )}
    >
      <Plus
        className="absolute top-4 right-4 h-5 w-5 transition-transform duration-500 group-hover:rotate-90"
        strokeWidth={2}
      />
      {children}
    </a>
  )
}

/* Белая папка с вкладкой: форма нарисована SVG, содержимое поверх */
export function Folder({
  children,
  className,
  number,
}: {
  children: ReactNode
  className?: string
  number?: string
}) {
  return (
    <div className={cn("relative min-h-[190px] w-full", className)}>
      <svg
        viewBox="0 0 300 190"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full drop-shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      >
        <path
          d="M18 1 H150 C160 1 165 4 171 9 L183 19 C189 24 194 26 202 26 H282 Q299 26 299 43 V171 Q299 189 281 189 H18 Q1 189 1 171 V19 Q1 1 18 1 Z"
          fill="var(--card)"
          stroke="#cfcfcf"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {number && (
        <span className="absolute top-9 right-5 text-[2.6rem] font-medium tracking-[-0.06em] text-[#dedede]">
          {number}
        </span>
      )}
      <div className="relative flex h-full min-h-[inherit] flex-col justify-end px-6 pt-14 pb-5">
        {children}
      </div>
    </div>
  )
}

/* 3D-модель: появляется и, если задан drift, очень медленно ходит
   в его сторону и обратно. На курсор не реагирует. */
export function Model({
  src,
  alt,
  className,
  drift = [0, 0],
  duration = 7,
  delay = 0,
  rotate = 0,
}: {
  src: string
  alt: string
  className?: string
  drift?: [number, number]
  duration?: number
  delay?: number
  rotate?: number
}) {
  const reduce = useReducedMotion()
  const moving = !reduce && (drift[0] !== 0 || drift[1] !== 0)
  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={
        moving
          ? { opacity: 1, scale: 1, x: [0, drift[0], 0], y: [0, drift[1], 0] }
          : { opacity: 1, scale: 1 }
      }
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.16)] select-none"
        style={{ rotate: `${rotate}deg` }}
      />
    </motion.div>
  )
}

/* Подпись секции в квадратных скобках: [ КОНТАКТЫ ] */
export function Bracket({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center justify-center gap-4 text-[1.6rem] font-medium tracking-[-0.05em] uppercase md:text-[2rem]", className)}>
      <span className="font-light">[</span>
      {children}
      <span className="font-light">]</span>
    </p>
  )
}

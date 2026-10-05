// Общие элементы визуального языка сайта: рамка выделения из редактора
// дизайна, красный курсор, пузыри-сообщения, плашка-кнопка, папка, 3D-модель.
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

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

// На основе Parallax Floating, danielpetho (21st.dev).
// Изменено по просьбе: элементы не следят за мышью, а медленно ходят
// немного к центру и обратно. Направление и амплитуда задаются drift.
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface FloatingProps {
  children: ReactNode
  className?: string
}

const Floating = ({ children, className }: FloatingProps) => {
  return (
    <div className={cn("absolute top-0 left-0 w-full h-full", className)}>
      {children}
    </div>
  )
}

export default Floating

interface FloatingElementProps {
  children: ReactNode
  className?: string
  /** Смещение к центру в пикселях: [x, y] */
  drift?: [number, number]
  /** Длительность полного цикла «к центру и обратно», секунды */
  duration?: number
  delay?: number
}

export const FloatingElement = ({
  children,
  className,
  drift = [24, 16],
  duration = 7,
  delay = 0,
}: FloatingElementProps) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn("absolute will-change-transform", className)}
      animate={
        reduceMotion
          ? undefined
          : { x: [0, drift[0], 0], y: [0, drift[1], 0] }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Лента 3D-моделей: при прокрутке плавно уезжает вбок,
// как полоса с одеждой у референса.
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { MODELS } from "@/lib/models"

const row = [
  { ...MODELS.hoodie, rotate: -6 },
  { ...MODELS.letter, rotate: 6 },
  { ...MODELS.skeleton, rotate: -4 },
  { ...MODELS.brush, rotate: -14 },
  { ...MODELS.pencil, rotate: 16 },
  { ...MODELS.pin, rotate: -8 },
  { ...MODELS.hoodie, rotate: 5 },
]

export function ModelsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"])

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden py-14 md:py-20">
      <motion.div className="flex w-max items-center gap-10 md:gap-20" style={reduce ? undefined : { x }}>
        {row.map((m, i) => (
          <img
            key={i}
            src={m.src}
            alt=""
            draggable={false}
            className="h-44 w-44 object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.16)] select-none md:h-72 md:w-72"
            style={{ rotate: `${m.rotate}deg` }}
          />
        ))}
      </motion.div>
    </div>
  )
}

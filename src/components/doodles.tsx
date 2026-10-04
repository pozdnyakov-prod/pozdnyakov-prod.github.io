// Нарисованные от руки акценты для карточек: мазок кистью с рваным краем
// и искорки. Всё неподвижно и не реагирует на курсор.
import { useId } from "react"

import { cn } from "@/lib/utils"

/* Мазок кистью: толстая линия + фильтр шероховатости по краю */
export function BrushStroke({
  className,
  color,
  d = "M28 140 C 110 50, 250 40, 372 96",
  width = 64,
}: {
  className?: string
  color: string
  d?: string
  width?: number
}) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 400 200" aria-hidden="true" className={cn("pointer-events-none absolute overflow-visible", className)}>
      <defs>
        {/* Область фильтра с запасом, иначе концы мазка срезаются по прямой */}
        <filter id={`rough-${id}`} filterUnits="userSpaceOnUse" x="-120" y="-120" width="640" height="440">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>
      <g filter={`url(#rough-${id})`}>
        <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
        {/* сухой край кисти: тонкие полосы поверх основного мазка */}
        <path d={d} fill="none" stroke={color} strokeWidth={width * 1.18} strokeLinecap="round" strokeDasharray="2 9" opacity="0.55" />
      </g>
    </svg>
  )
}

/* Четырёхлучевая искорка */
export function Sparkle({ className, color = "var(--ink)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      <path d="M12 1 C 13 9, 15 11, 23 12 C 15 13, 13 15, 12 23 C 11 15, 9 13, 1 12 C 9 11, 11 9, 12 1 Z" fill={color} />
    </svg>
  )
}

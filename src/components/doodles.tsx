// Нарисованные от руки акценты для карточек: мазок кистью с рваным краем,
// стрелка маркером, искорки. Всё неподвижно и не реагирует на курсор.
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

/* Стрелка маркером с подписью от руки */
export function MarkerArrow({
  className,
  label,
  d = "M150 20 C 120 30, 92 52, 70 96",
}: {
  className?: string
  label?: string
  d?: string
}) {
  const id = useId().replace(/:/g, "")
  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden="true">
      <svg viewBox="0 0 180 120" className="h-full w-full overflow-visible">
        <defs>
          <marker id={`head-${id}`} viewBox="0 0 12 12" refX="8" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M1 1 L10 6 L1 11" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <path d={d} fill="none" stroke="var(--ink)" strokeWidth="3.2" strokeLinecap="round" markerEnd={`url(#head-${id})`} />
      </svg>
      {label && (
        <span className="absolute top-[-6%] right-[-8%] rotate-[-6deg] font-script text-[1.7rem] leading-none whitespace-nowrap md:text-[2rem]">
          {label}
        </span>
      )}
    </div>
  )
}

/* Галочки маркером */
export function Checks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 40" aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      {[0, 30, 60].map((x) => (
        <path
          key={x}
          d={`M${x + 4} 22 L${x + 11} 30 L${x + 26} 8`}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

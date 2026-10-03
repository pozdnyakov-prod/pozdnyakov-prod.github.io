// Заглушки для парящих картинок в Hero. Один стиль: чёрная линия 1.5,
// светло-серая заливка, без надписей и логотипов. Заменить на фото позже.
import type { ReactNode } from "react"

const stroke = {
  fill: "none",
  stroke: "var(--ink)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className="h-full w-full">
      {children}
    </svg>
  )
}

export function Hoodie() {
  return (
    <Frame label="Худи">
      <path
        d="M44 24 L24 32 L12 64 L25 69 L32 56 V102 H88 V56 L95 69 L108 64 L96 32 L76 24"
        {...stroke}
        fill="var(--paper)"
      />
      <path d="M44 24 C43 12 77 12 76 24 C72 37 48 37 44 24 Z" {...stroke} fill="var(--soft)" />
      <path d="M55 34 V47 M65 34 V47" {...stroke} />
      <path d="M44 76 H76 L80 94 H40 Z" {...stroke} />
      <path d="M32 96 H88 M25 64 L12 59" {...stroke} />
    </Frame>
  )
}

export function Pencil() {
  return (
    <Frame label="Карандаш">
      <g transform="rotate(-38 60 60)">
        <rect x="22" y="52" width="62" height="16" {...stroke} fill="var(--paper)" />
        <path d="M22 57.3 H84 M22 62.7 H84" {...stroke} strokeWidth={1} />
        <path d="M84 52 L106 60 L84 68 Z" {...stroke} fill="var(--soft)" />
        <path d="M99 57.4 L106 60 L99 62.6 Z" fill="var(--ink)" />
        <rect x="16" y="52" width="6" height="16" {...stroke} fill="var(--soft)" />
        <path d="M16 52 H10 Q6 52 6 56 V64 Q6 68 10 68 H16" {...stroke} fill="var(--paper)" />
      </g>
    </Frame>
  )
}

export function Brush() {
  return (
    <Frame label="Кисть">
      <g transform="rotate(32 60 60)">
        <path d="M10 58.5 L66 56 V64 L10 61.5 Q7 60 10 58.5 Z" {...stroke} fill="var(--paper)" />
        <rect x="66" y="54" width="16" height="12" {...stroke} fill="var(--soft)" />
        <path d="M70 54 V66 M74 54 V66" {...stroke} strokeWidth={1} />
        <path d="M82 54 C94 53 103 56 113 60 C103 64 94 67 82 66 Z" fill="var(--ink)" />
      </g>
    </Frame>
  )
}

export function Skateboard() {
  return (
    <Frame label="Скейтборд">
      <g transform="rotate(18 60 60)">
        <rect x="45" y="6" width="30" height="108" rx="15" {...stroke} fill="var(--paper)" />
        <path d="M38 30 H82 M38 90 H82" {...stroke} />
        <rect x="33" y="25" width="7" height="10" {...stroke} fill="var(--soft)" />
        <rect x="80" y="25" width="7" height="10" {...stroke} fill="var(--soft)" />
        <rect x="33" y="85" width="7" height="10" {...stroke} fill="var(--soft)" />
        <rect x="80" y="85" width="7" height="10" {...stroke} fill="var(--soft)" />
        <circle cx="55" cy="22" r="1.4" fill="var(--ink)" />
        <circle cx="65" cy="22" r="1.4" fill="var(--ink)" />
        <circle cx="55" cy="98" r="1.4" fill="var(--ink)" />
        <circle cx="65" cy="98" r="1.4" fill="var(--ink)" />
      </g>
    </Frame>
  )
}

export function Stickers() {
  return (
    <Frame label="Стикеры">
      <path d="M14 14 H106 V90 L90 106 H14 Z" {...stroke} fill="var(--paper)" />
      <path d="M106 90 H94 Q90 90 90 94 V106" {...stroke} fill="var(--soft)" />
      <circle cx="38" cy="38" r="14" {...stroke} fill="var(--soft)" />
      <path d="M32 35 V37 M44 35 V37 M31 42 Q38 49 45 42" {...stroke} />
      <path
        d="M80 24 L84 33 L94 34 L86.5 40.5 L89 50 L80 45 L71 50 L73.5 40.5 L66 34 L76 33 Z"
        {...stroke}
        fill="var(--soft)"
      />
      <path
        d="M38 92 C24 82 24 70 31 68 C35 67 38 70 38 73 C38 70 41 67 45 68 C52 70 52 82 38 92 Z"
        {...stroke}
        fill="var(--soft)"
      />
      <path d="M78 64 L68 80 H77 L72 94 L86 75 H77 L82 64 Z" {...stroke} fill="var(--soft)" />
    </Frame>
  )
}

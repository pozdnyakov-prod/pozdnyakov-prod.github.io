// Лента 3D-моделей между блоками: бесконечно едет справа налево со средней
// скоростью. Ряд продублирован, поэтому стык не виден. При уменьшении
// движения в системе лента стоит.
import { MODELS } from "@/lib/models"

const row = [
  { ...MODELS.hoodie, rotate: -6 },
  { ...MODELS.letter, rotate: 6 },
  { ...MODELS.skeleton, rotate: -4 },
  { ...MODELS.brush, rotate: -14 },
  { ...MODELS.pencil, rotate: 16 },
  { ...MODELS.pin, rotate: -8 },
]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[clamp(4rem,9vw,11rem)] pr-[clamp(4rem,9vw,11rem)]" aria-hidden={hidden}>
      {row.map((m, i) => (
        <img
          key={i}
          src={m.src}
          alt=""
          draggable={false}
          className="h-36 w-36 object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.16)] select-none md:h-44 md:w-44"
          style={{ rotate: `${m.rotate}deg` }}
        />
      ))}
    </div>
  )
}

export function ModelsStrip() {
  return (
    <div aria-hidden="true" className="overflow-hidden py-14 md:py-20">
      <div className="marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}

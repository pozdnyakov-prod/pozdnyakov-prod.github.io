// Лента 3D-моделей между блоками. Стоит неподвижно; на узком экране
// лишние предметы просто уходят за край.
import { MODELS } from "@/lib/models"

const row = [
  { ...MODELS.hoodie, rotate: -6 },
  { ...MODELS.letter, rotate: 6 },
  { ...MODELS.skeleton, rotate: -4 },
  { ...MODELS.brush, rotate: -14 },
  { ...MODELS.pencil, rotate: 16 },
  { ...MODELS.pin, rotate: -8 },
]

export function ModelsStrip() {
  return (
    <div aria-hidden="true" className="overflow-hidden py-14 md:py-20">
      <div className="flex w-max items-center gap-10 px-4 md:mx-auto md:gap-14">
        {row.map((m, i) => (
          <img
            key={i}
            src={m.src}
            alt=""
            draggable={false}
            className="h-40 w-40 object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.16)] select-none md:h-44 md:w-44"
            style={{ rotate: `${m.rotate}deg` }}
          />
        ))}
      </div>
    </div>
  )
}

// Блок на основе Compare Slider, diceui (21st.dev).
// Пока стоят заглушки в пропорциях экрана телефона, сюда встанут скриншоты.
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider"

function Placeholder({ title, dark }: { title: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex h-full w-full items-end justify-end bg-ink p-5 text-right text-paper/70"
          : "flex h-full w-full items-end justify-start bg-soft p-5 text-left text-muted"
      }
    >
      <p className="max-w-[11ch] text-sm leading-relaxed">{title}</p>
    </div>
  )
}

function Badge({ children, side }: { children: string; side: "left" | "right" }) {
  return (
    <span
      className={
        "absolute top-3 z-20 border border-line bg-paper px-3 py-1 text-xs text-ink " +
        (side === "left" ? "left-3" : "right-3")
      }
    >
      {children}
    </span>
  )
}

export function BeforeAfter() {
  return (
    <section id="compare" className="border-t border-line px-4 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div>
          <h2 className="max-w-[14ch] font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4.2rem]">
            Как меняется одна и та же суть
          </h2>
          <p className="mt-6 max-w-[40ch] leading-relaxed text-muted">
            Потяните разделитель, чтобы сравнить профиль до и после.
          </p>
        </div>

        <CompareSlider
          defaultValue={50}
          className="relative mx-auto aspect-[9/19.5] w-full max-w-[300px] touch-pan-y overflow-hidden border border-line select-none md:w-[300px]"
        >
          {/* «После» видно справа от разделителя, «До» слева */}
          <CompareSliderBefore>
            <Placeholder title="Здесь будет скриншот профиля после" dark />
            <Badge side="right">После</Badge>
          </CompareSliderBefore>
          <CompareSliderAfter>
            <Placeholder title="Здесь будет скриншот профиля до" />
            <Badge side="left">До</Badge>
          </CompareSliderAfter>
          <CompareSliderHandle>
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgba(10,10,10,0.35)]" />
            <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-ink bg-paper text-ink">
              <CaretLeft size={12} weight="bold" />
              <CaretRight size={12} weight="bold" />
            </div>
          </CompareSliderHandle>
        </CompareSlider>
      </div>
    </section>
  )
}

// Блок «До/после» на основе Compare Slider, diceui (21st.dev), как в демо:
// рамка с border и скруглением, стандартная ручка. Пока стоят заглушки
// в пропорциях экрана телефона, сюда встанут скриншоты профиля.
import { motion } from "motion/react"

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider"

function Placeholder({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex size-full items-end justify-end bg-gradient-to-br from-neutral-800 to-neutral-950 p-5 text-right text-sm text-white/70"
          : "flex size-full items-end justify-start bg-gradient-to-br from-neutral-100 to-neutral-200 p-5 text-left text-sm text-neutral-500"
      }
    >
      <p className="max-w-[11ch] leading-relaxed">{text}</p>
    </div>
  )
}

function Tag({ children, side }: { children: string; side: "left" | "right" }) {
  return (
    <span
      className={`absolute top-2 z-20 rounded-md border border-border bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      {children}
    </span>
  )
}

export function BeforeAfter() {
  return (
    <section id="compare" className="w-full py-24 md:py-32 bg-neutral-50">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:grid-cols-[1fr_auto] md:gap-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="max-w-[14ch] font-calendas text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Как меняется одна и та же суть
          </h2>
          <p className="mt-6 max-w-[40ch] text-muted-foreground">
            Потяните разделитель, чтобы сравнить профиль до и после.
          </p>
        </motion.div>

        <CompareSlider
          defaultValue={50}
          className="mx-auto aspect-[9/19.5] w-full max-w-[300px] overflow-hidden rounded-lg border shadow-xl md:w-[300px]"
        >
          {/* «После» видно справа от разделителя, «До» слева */}
          <CompareSliderBefore>
            <Placeholder text="Здесь будет скриншот профиля после" dark />
            <Tag side="right">После</Tag>
          </CompareSliderBefore>
          <CompareSliderAfter>
            <Placeholder text="Здесь будет скриншот профиля до" />
            <Tag side="left">До</Tag>
          </CompareSliderAfter>
          <CompareSliderHandle />
        </CompareSlider>
      </div>
    </section>
  )
}

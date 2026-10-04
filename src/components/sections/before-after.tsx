// «До/после»: слайдер сравнения в форме экрана телефона, выделенный
// рамкой как слой в редакторе. Пока стоят заглушки под скриншоты.
import { motion } from "motion/react"

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider"
import { Bubble, Cursor, SelectionFrame } from "@/components/decor"

function Placeholder({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex size-full items-end justify-end bg-ink p-5 text-right text-sm text-white/70"
          : "flex size-full items-end justify-start bg-[#e4e4e4] p-5 text-left text-sm text-subtle"
      }
    >
      <p className="max-w-[11ch] leading-tight">{text}</p>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <section id="compare" className="overflow-x-clip px-4 pt-6 pb-10 md:px-14">
      <div className="grid items-center gap-14 md:grid-cols-[1fr_auto] md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="display max-w-[11ch] text-[3.2rem] md:text-[5.4rem]">
            Как меняется одна и та же суть
          </h2>
          <p className="mt-5 max-w-[34ch] text-[1.15rem] leading-[1.1] tracking-[-0.035em] text-subtle">
            Потяните разделитель, чтобы сравнить профиль до и после.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[290px] md:mr-10 md:w-[300px] md:max-w-none">
          <SelectionFrame className="-inset-4" />
          <Cursor className="-right-12 bottom-[38%]" />

          <Bubble tone="white" tail="left" className="absolute -top-8 -left-10 z-20 px-4 py-2 md:-left-16">
            <span className="text-sm font-semibold tracking-[-0.03em]">до</span>
          </Bubble>
          <Bubble className="absolute -top-8 -right-8 z-20 px-4 py-2 md:-right-14">
            <span className="text-sm font-semibold tracking-[-0.03em]">после</span>
          </Bubble>

          <CompareSlider
            defaultValue={50}
            className="aspect-[9/19.5] overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink"
          >
            {/* «После» видно справа от разделителя, «До» слева */}
            <CompareSliderBefore>
              <Placeholder text="Здесь будет скриншот профиля после" dark />
            </CompareSliderBefore>
            <CompareSliderAfter>
              <Placeholder text="Здесь будет скриншот профиля до" />
            </CompareSliderAfter>
            <CompareSliderHandle />
          </CompareSlider>
        </div>
      </div>
    </section>
  )
}

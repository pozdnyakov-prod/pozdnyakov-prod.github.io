// «До/после» по промту Compare Slider (diceui, 21st.dev), как в демо:
// рамка со скруглением и стандартная ручка; одна сторона цветная, другая серая.
// Слайдер на всю ширину. Внутри один и тот же профиль дизайнера в одной
// раскладке: слева «до» (серый, размытая подача), справа «после» (понятное
// позиционирование, оффер и рубрики). Это пример, пока нет реальных скриншотов.
import type { ReactNode } from "react"
import { motion } from "motion/react"

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider"
import { cn } from "@/lib/utils"

type Variant = "before" | "after"

const content = {
  before: {
    role: "дизайнер",
    bio: "UI/UX, логотипы, баннеры, презентации. Делаю всё, что нужно. Пишите в директ.",
    button: "Написать",
    highlights: ["Работы", "Разное", "Обо мне", "Новое"],
    posts: ["Новый проект", "Скетч", "Рабочее место", "Ещё один макет", "Немного котика", "Логотип"],
  },
  after: {
    role: "дизайн интерфейсов для финтеха",
    bio: "Делаю интерфейсы, в которых клиенты банков не путаются. Сначала сценарий, потом экран.",
    button: "Обсудить проект",
    highlights: ["Мой подход", "Кейсы", "Как работаю", "Цена"],
    posts: [
      "Почему клиенты бросают онбординг",
      "Кейс: личный кабинет",
      "Мой процесс от брифа до макета",
      "Разбор: экран перевода",
      "Ошибки в формах",
      "Как я выбираю шрифт для продукта",
    ],
  },
}

const tileColors = {
  before: ["bg-neutral-300", "bg-neutral-400", "bg-neutral-200", "bg-neutral-300", "bg-neutral-300", "bg-neutral-400"],
  after: ["bg-[#f6d7c3]", "bg-[#dbe7ff]", "bg-[#fde7a8]", "bg-[#d9f0e3]", "bg-[#efdcf7]", "bg-[#ffd9d2]"],
}

/* Рукописная пометка: что изменилось в этой части профиля */
function Note({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-10 hidden rotate-[-4deg] font-script text-[1.5rem] leading-none whitespace-nowrap text-orange md:block lg:text-[1.8rem]",
        className
      )}
    >
      {children}
    </span>
  )
}

function Profile({ variant }: { variant: Variant }) {
  const c = content[variant]
  const after = variant === "after"

  return (
    <div
      className={cn(
        "flex size-full flex-col gap-6 p-5 pb-16 md:flex-row md:gap-10 md:p-10 lg:p-14",
        after ? "bg-white" : "bg-[#ececec] grayscale"
      )}
    >
      {/* Шапка профиля */}
      <div className="relative flex shrink-0 flex-col md:w-[38%]">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "size-16 shrink-0 rounded-full md:size-24",
              after ? "bg-gradient-to-br from-[#f3b48b] to-orange ring-4 ring-[#fbe3d3]" : "bg-neutral-400"
            )}
          />
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-[-0.03em] md:text-2xl">Алина Миронова</p>
            <p className={cn("text-sm md:text-base", after ? "font-medium text-orange" : "text-neutral-500")}>
              {c.role}
            </p>
          </div>
        </div>
        <p
          className={cn(
            "mt-4 max-w-[34ch] text-sm leading-snug md:mt-6 md:text-lg",
            after ? "text-ink" : "text-neutral-500"
          )}
        >
          {c.bio}
        </p>
        <span className="relative mt-4 w-fit md:mt-6">
          <span
            className={cn(
              "inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold md:px-6 md:py-3 md:text-base",
              after ? "bg-orange text-white" : "bg-neutral-300 text-neutral-600"
            )}
          >
            {c.button}
          </span>
          {after && <Note className="top-1/2 left-full ml-4 -translate-y-1/2">оффер</Note>}
        </span>

        <div className="mt-5 flex gap-3 md:mt-8 md:gap-4">
          {c.highlights.map((h) => (
            <div key={h} className="flex w-14 flex-col items-center gap-1.5 md:w-16">
              <span
                className={cn(
                  "size-12 rounded-full md:size-14",
                  after ? "bg-[#fbe3d3] ring-2 ring-orange/60" : "bg-neutral-300"
                )}
              />
              <span className={cn("text-center text-[0.68rem] leading-tight md:text-xs", after ? "text-ink" : "text-neutral-500")}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {after && (
          <>
            <Note className="-top-8 right-[6%]">позиционирование</Note>
          </>
        )}
      </div>

      {/* Лента публикаций */}
      <div className="relative grid min-h-0 flex-1 grid-cols-3 gap-2 md:gap-3">
        {c.posts.map((post, i) => (
          <div
            key={post}
            className={cn(
              "flex min-h-[64px] items-end rounded-md p-2 md:rounded-lg md:p-4",
              tileColors[variant][i],
              i >= 3 && "max-md:hidden"
            )}
          >
            <span
              className={cn(
                "text-[0.7rem] leading-tight md:text-sm lg:text-base",
                after ? "font-semibold tracking-[-0.02em] text-ink" : "text-neutral-500"
              )}
            >
              {post}
            </span>
          </div>
        ))}
        {after && <Note className="-top-9 left-[30%]">контент-система</Note>}
      </div>
    </div>
  )
}

function SideLabel({ children, side }: { children: string; side: "left" | "right" }) {
  return (
    <span
      className={cn(
        "absolute bottom-3 z-20 rounded-md border border-border bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm md:bottom-5",
        side === "left" ? "left-3 md:left-5" : "right-3 md:right-5"
      )}
    >
      {children}
    </span>
  )
}

export function BeforeAfter() {
  return (
    <section id="compare" className="px-4 pt-10 pb-10 md:px-14 xl:px-[3.9vw]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="display text-[3.2rem] md:text-[5.4rem]">Как меняется одна и та же суть</h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-[1.1rem] leading-[1.2] tracking-[-0.035em] text-subtle md:text-[1.3rem]">
          Потяните ползунок: слева профиль до упаковки, справа после.
        </p>
      </motion.div>

      <CompareSlider
        defaultValue={50}
        className="mt-8 h-[600px] overflow-hidden rounded-lg border bg-card md:mt-12 md:h-[min(72vh,640px)]"
      >
        {/* «После» видно справа от ползунка, «До» слева, как в демо промта */}
        <CompareSliderBefore>
          <Profile variant="after" />
          <SideLabel side="right">После</SideLabel>
        </CompareSliderBefore>
        <CompareSliderAfter>
          <Profile variant="before" />
          <SideLabel side="left">До</SideLabel>
        </CompareSliderAfter>
        <CompareSliderHandle />
      </CompareSlider>
    </section>
  )
}

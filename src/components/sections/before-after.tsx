// «До/после» по промту Compare Slider (diceui, 21st.dev), как в демо:
// рамка со скруглением и стандартная ручка; одна сторона цветная, другая серая.
// Слайдер на всю ширину. Внутри один и тот же профиль дизайнера в одной
// раскладке: слева «до» (серый, размытая подача), справа «после» (понятное
// позиционирование, оффер и рубрики). Это пример, пока нет реальных скриншотов.
import type { ReactNode } from "react"
import { motion } from "motion/react"
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Image,
  Route,
  Shapes,
  Sparkles,
  Tag,
  Target,
  User,
} from "lucide-react"

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider"
import { cn } from "@/lib/utils"
import { DesignCta } from "@/components/design-cta"

type Variant = "before" | "after"

/* Работы одни и те же, меняется подача: подписи, рубрики, оформление */
const works = [
  { img: "/problem/question.png", rotate: -8 },
  { img: "/services/profile.png", rotate: 6 },
  { img: "/models/pencil.webp", rotate: 28 },
  { img: "/problem/price.png", rotate: -6 },
  { img: "/problem/frame.png", rotate: 4 },
  { img: "/models/letter-t.webp", rotate: -10 },
]

const content = {
  before: {
    role: "дизайнер",
    button: "Написать",
    highlights: [
      { label: "Работы", icon: Image },
      { label: "Разное", icon: Shapes },
      { label: "Обо мне", icon: User },
      { label: "Новое", icon: Sparkles },
    ],
    posts: [
      { title: "Новый проект" },
      { title: "Скетч" },
      { title: "Рабочее место" },
      { title: "Ещё один макет" },
      { title: "Немного котика" },
      { title: "Логотип" },
    ],
  },
  after: {
    role: "дизайн интерфейсов для финтеха",
    button: "Обсудить проект",
    highlights: [
      { label: "Мой подход", icon: Target },
      { label: "Кейсы", icon: Briefcase },
      { label: "Как работаю", icon: Route },
      { label: "Цена", icon: Tag },
    ],
    posts: [
      { title: "Почему клиенты бросают онбординг", tag: "разбор" },
      { title: "Кейс: личный кабинет", tag: "кейс" },
      { title: "Мой процесс от брифа до макета", tag: "процесс" },
      { title: "Разбор: экран перевода", tag: "разбор" },
      { title: "Ошибки в формах", tag: "советы" },
      { title: "Как я выбираю шрифт для продукта", tag: "мнение" },
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
        "pointer-events-none absolute z-20 hidden rotate-[-4deg] font-script text-[1.5rem] leading-none whitespace-nowrap text-orange md:block lg:text-[1.8rem]",
        className
      )}
    >
      {children}
    </span>
  )
}

/* Подчёркивание от руки */
function Under({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.3em] left-0 h-[0.4em] w-full"
      >
        <path
          d="M2 8 C 30 3, 70 2, 118 6"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="2.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

/* Выделение маркером */
function Mark({ children }: { children: ReactNode }) {
  return (
    <span
      className="box-decoration-clone px-[0.12em]"
      style={{
        backgroundImage: "linear-gradient(104deg, transparent 0.3em, #ffe45c 0.4em, #ffe45c 96%, transparent 100%)",
        backgroundSize: "100% 60%",
        backgroundPosition: "0 80%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </span>
  )
}

/* Искорка */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      <path
        d="M12 1 C 13 9, 15 11, 23 12 C 15 13, 13 15, 12 23 C 11 15, 9 13, 1 12 C 9 11, 11 9, 12 1 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Profile({ variant }: { variant: Variant }) {
  const c = content[variant]
  const after = variant === "after"

  return (
    <div
      className={cn(
        "relative flex size-full flex-col gap-6 p-5 pb-16 md:flex-row md:gap-10 md:p-10 lg:p-14",
        after ? "bg-white" : "bg-[#ececec] grayscale"
      )}
    >
      {/* Шапка профиля */}
      <div className="relative flex shrink-0 flex-col md:w-[38%]">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full md:size-24",
              after
                ? "bg-gradient-to-br from-[#fbe3d3] to-[#f3b48b] ring-4 ring-orange/70 ring-offset-2"
                : "bg-neutral-300"
            )}
          >
            <img
              src="/models/skeleton.webp"
              alt=""
              className={cn("h-[86%] w-[86%] translate-y-[8%] object-contain", !after && "opacity-60 blur-[1px]")}
            />
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-lg font-semibold tracking-[-0.03em] md:text-2xl">
              Алина Миронова
              {after && <BadgeCheck className="size-5 shrink-0 fill-orange text-white md:size-6" />}
            </p>
            <p className={cn("text-sm md:text-base", after ? "font-semibold text-orange" : "text-neutral-500")}>
              {after ? <Mark>{c.role}</Mark> : c.role}
            </p>
          </div>
        </div>

        <p
          className={cn(
            "mt-4 max-w-[34ch] text-sm leading-snug md:mt-6 md:text-lg",
            after ? "text-ink" : "text-neutral-500"
          )}
        >
          {after ? (
            <>
              Делаю интерфейсы, в которых <Under>клиенты банков</Under> не путаются. Сначала
              сценарий, потом экран.
            </>
          ) : (
            "UI/UX, логотипы, баннеры, презентации. Делаю всё, что нужно. Пишите в директ."
          )}
        </p>

        <span className="relative mt-4 w-fit md:mt-6">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold md:px-6 md:py-3 md:text-base",
              after ? "bg-orange text-white shadow-[0_8px_20px_rgba(184,84,26,0.35)]" : "bg-neutral-300 text-neutral-600"
            )}
          >
            {c.button}
            {after && <ArrowUpRight className="size-4 md:size-5" />}
          </span>
          {after && <Note className="top-1/2 left-full ml-4 -translate-y-1/2">← оффер</Note>}
        </span>

        <div className="mt-5 flex gap-3 md:mt-8 md:gap-4">
          {c.highlights.map(({ label, icon: Icon }) => (
            <div key={label} className="flex w-14 flex-col items-center gap-1.5 md:w-16">
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-full md:size-14",
                  after
                    ? "bg-[#fbe3d3] text-orange ring-2 ring-orange/60 ring-offset-2"
                    : "bg-neutral-300 text-neutral-400"
                )}
              >
                <Icon className="size-5 md:size-6" strokeWidth={after ? 2.2 : 1.5} />
              </span>
              <span
                className={cn(
                  "text-center text-[0.68rem] leading-tight md:text-xs",
                  after ? "font-medium text-ink" : "text-neutral-500"
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {after && <Note className="-top-8 right-[2%]">
            <span className="mr-1 inline-block rotate-[40deg]">↓</span>позиционирование
          </Note>}
      </div>

      {/* Лента публикаций: те же работы, другая подача */}
      <div className="relative grid min-h-0 flex-1 grid-cols-3 gap-2 md:gap-3">
        {c.posts.map((post, i) => (
          <div
            key={post.title}
            className={cn(
              "relative flex min-h-[64px] flex-col justify-between overflow-hidden rounded-md p-2 md:rounded-lg md:p-3 lg:p-4",
              tileColors[variant][i],
              i >= 3 && "max-md:hidden"
            )}
          >
            {"tag" in post ? (
              <span className="relative z-10 w-fit rounded-full bg-white/85 px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-orange uppercase md:text-[0.7rem]">
                {post.tag}
              </span>
            ) : (
              <span />
            )}
            <img
              src={works[i].img}
              alt=""
              draggable={false}
              className={cn(
                "pointer-events-none absolute top-1/2 left-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-[58%] object-contain select-none",
                after ? "drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]" : "opacity-50"
              )}
              style={{ rotate: `${after ? works[i].rotate : works[i].rotate + 14}deg` }}
            />
            <span
              className={cn(
                "relative z-10 text-[0.7rem] leading-tight md:text-sm lg:text-[0.95rem]",
                after ? "font-semibold tracking-[-0.02em] text-ink" : "text-neutral-500"
              )}
            >
              {post.title}
            </span>
            {after && i === 0 && (
              <img
                src="/models/pin.webp"
                alt=""
                className="pointer-events-none absolute -top-1 right-1 z-20 size-9 rotate-12 object-contain drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] md:size-11"
              />
            )}
          </div>
        ))}
        {after && (
          <>
            <Note className="-top-9 left-[30%]">контент-система</Note>
            <Sparkle className="-top-4 right-[6%] z-20 size-6 text-ink md:size-7" />
            <Sparkle className="-bottom-5 left-[46%] z-20 size-4 text-ink" />
          </>
        )}
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

      <div className="mt-12 flex justify-center md:mt-14">
        <DesignCta layer="кнопка / хочу так же">Хочу такой же профиль</DesignCta>
      </div>
    </section>
  )
}

// Landing Hero на основе text-rotate / landing-hero, danielpetho (21st.dev).
import type { ReactNode } from "react"
import { motion } from "motion/react"
import { TelegramLogo } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { TELEGRAM_URL } from "@/lib/links"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { Brush, Hoodie, Pencil, Skateboard, Stickers } from "@/components/hero-objects"

const rotatingWords = ["интерфейсов", "логотипов", "интерьеров", "одежды"]

function Tile({
  children,
  className,
  delay,
}: {
  children: ReactNode
  className?: string
  delay: number
}) {
  return (
    <motion.div
      className={cn("hero-drift border border-line bg-card p-3 md:p-4", className)}
      style={{ animationDelay: `${-delay * 4}s` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-28 md:pt-24 md:pb-24">
      <a
        href="#top"
        className="absolute top-6 left-1/2 z-20 -translate-x-1/2 font-display text-[1.15rem] tracking-[0.08em] md:top-7 md:left-12 md:translate-x-0"
      >
        pozdnyakov-prod
      </a>

      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement depth={0.5} className="top-[10%] left-[3%] md:top-[18%] md:left-[6%]">
          <Tile className="h-24 w-20 -rotate-6 sm:h-32 sm:w-28 lg:h-44 lg:w-36" delay={0.5}>
            <Hoodie />
          </Tile>
        </FloatingElement>

        <FloatingElement depth={1} className="top-[9%] left-[73%] md:top-[9%] md:left-[78%]">
          <Tile className="h-20 w-20 rotate-[8deg] sm:h-28 sm:w-28 lg:h-36 lg:w-36" delay={0.7}>
            <Pencil />
          </Tile>
        </FloatingElement>

        <FloatingElement depth={4} className="top-[78%] left-[5%] md:top-[66%] md:left-[11%]">
          <Tile className="h-20 w-20 rotate-[5deg] sm:h-28 sm:w-28 lg:h-40 lg:w-40" delay={0.9}>
            <Brush />
          </Tile>
        </FloatingElement>

        <FloatingElement depth={2} className="top-[76%] left-[72%] md:top-[60%] md:left-[80%]">
          <Tile className="h-28 w-20 -rotate-[10deg] sm:h-36 sm:w-24 lg:h-52 lg:w-36" delay={1.1}>
            <Skateboard />
          </Tile>
        </FloatingElement>

        <FloatingElement depth={1} className="top-[13%] left-[40%] md:top-[36%] md:left-[89%]">
          <Tile className="h-16 w-16 rotate-[14deg] sm:h-24 sm:w-24 lg:h-28 lg:w-28" delay={1.3}>
            <Stickers />
          </Tile>
        </FloatingElement>
      </Floating>

      <div className="relative z-10 flex w-full max-w-[880px] flex-col items-center text-center">
        <motion.h1
          className="flex w-full flex-col items-center font-display text-[2.6rem] leading-[1.04] font-light tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-[5.4rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span>Личный бренд</span>
          <span>для дизайнеров</span>
          <TextRotate
            texts={rotatingWords}
            mainClassName="justify-center overflow-hidden pb-2 italic text-accent leading-[1.1]"
            staggerDuration={0.025}
            staggerFrom="last"
            rotationInterval={2600}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[36ch] text-base leading-relaxed text-muted sm:text-lg md:mt-8 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          Позиционирование, упаковка профиля и контент-система. Одна услуга
          с фиксированным составом.
        </motion.p>

        <motion.a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent mt-9 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          <TelegramLogo size={18} weight="regular" />
          Написать в Telegram
        </motion.a>
      </div>
    </section>
  )
}

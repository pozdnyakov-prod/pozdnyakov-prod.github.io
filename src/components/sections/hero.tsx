// Landing Hero из демо text-rotate, danielpetho (21st.dev).
// Фото из демо заменены 3D-моделями без фона.
import { LayoutGroup, motion } from "motion/react"

import { TELEGRAM_URL } from "@/lib/links"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

const models = {
  pencil: { url: "/models/pencil.webp", title: "Карандаш" },
  shapes: { url: "/models/shapes.webp", title: "Фигуры" },
  brush: { url: "/models/brush.webp", title: "Кисть" },
  letter: { url: "/models/letter-t.webp", title: "Буква T" },
  hoodie: { url: "/models/hoodie.webp", title: "Худи" },
}

const imageClass =
  "object-contain hover:scale-105 duration-200 cursor-pointer transition-transform drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)]"

function LandingHero() {
  return (
    <section className="w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center relative">
      <Floating className="h-full">
        <FloatingElement
          drift={[22, 14]}
          duration={7}
          className="top-[9%] left-[42%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={models.pencil.url}
            alt={models.pencil.title}
            className={`w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 -rotate-[3deg] ${imageClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          drift={[26, 24]}
          duration={8}
          delay={0.6}
          className="top-[2%] left-[6%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={models.shapes.url}
            alt={models.shapes.title}
            className={`w-24 h-28 sm:w-36 sm:h-40 md:w-44 md:h-48 lg:w-48 lg:h-52 -rotate-12 ${imageClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          drift={[26, -24]}
          duration={7.5}
          delay={1.2}
          className="top-[80%] left-[4%] md:top-[72%] md:left-[8%]"
        >
          <motion.img
            src={models.brush.url}
            alt={models.brush.title}
            className={`w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 -rotate-[4deg] ${imageClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          drift={[-26, 22]}
          duration={8.5}
          delay={0.3}
          className="top-[2%] left-[72%] md:top-[4%] md:left-[80%]"
        >
          <motion.img
            src={models.letter.url}
            alt={models.letter.title}
            className={`w-24 h-28 sm:w-36 sm:h-40 md:w-44 md:h-48 lg:w-52 lg:h-56 rotate-[6deg] ${imageClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          drift={[-28, -22]}
          duration={7}
          delay={0.9}
          className="top-[74%] left-[66%] md:top-[60%] md:left-[78%]"
        >
          <motion.img
            src={models.hoodie.url}
            alt={models.hoodie.title}
            className={`w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rotate-[8deg] ${imageClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[420px] md:w-[560px] lg:w-[760px] z-50 pointer-events-auto">
        <motion.h1
          className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-2"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Личный бренд</span>
          <LayoutGroup>
            <motion.span layout className="flex flex-col items-center whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                для дизайнеров
              </motion.span>
              <TextRotate
                texts={["интерфейсов", "логотипов", "интерьеров", "одежды"]}
                mainClassName="overflow-hidden text-brand italic py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12 max-w-[30ch] sm:max-w-none"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Позиционирование, упаковка профиля и контент-система. Одна услуга
          с фиксированным составом.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-brand px-6 py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            Написать в Telegram <span className="font-serif ml-1">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export { LandingHero }

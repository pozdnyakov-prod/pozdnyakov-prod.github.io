// Первый экран: в центре оффер, выделенный рамкой как слой в редакторе,
// 3D-модели вокруг медленно ходят к центру и обратно, внизу название.
import { motion } from "motion/react"

import { MODELS } from "@/lib/models"
import { TextRotate } from "@/components/ui/text-rotate"
import { Cursor, Model, SelectionFrame } from "@/components/decor"
import { Header } from "@/components/sections/header"

const facts = ["фиксированный состав", "2 недели менторства", "11 990 ₽"]

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function Models() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Слева */}
      <Model
        {...MODELS.letter}
        className="absolute top-[0%] left-[2%] h-20 w-20 md:top-[2%] md:left-[11%] md:h-40 md:w-36"
        drift={[12, 10]}
        duration={8}
        rotate={-10}
      />
      <Model
        {...MODELS.skeleton}
        className="absolute top-[1%] left-[38%] h-24 w-20 md:top-[28%] md:left-[2%] md:h-72 md:w-56"
        drift={[16, 0]}
        duration={7.5}
        delay={0.1}
        rotate={-4}
      />
      <Model
        {...MODELS.pencil}
        className="absolute bottom-[1%] left-[4%] h-20 w-14 md:bottom-[4%] md:left-[12%] md:h-36 md:w-24"
        drift={[12, -10]}
        duration={7}
        delay={0.2}
        rotate={28}
      />
      {/* Справа */}
      <Model
        {...MODELS.pin}
        className="absolute top-[2%] right-[5%] h-14 w-14 md:top-[3%] md:right-[15%] md:h-24 md:w-24"
        drift={[-10, 10]}
        duration={6.5}
        delay={0.15}
        rotate={14}
      />
      <Model
        {...MODELS.hoodie}
        className="absolute right-[2%] bottom-[0%] h-24 w-24 md:top-[24%] md:right-[2%] md:bottom-auto md:h-72 md:w-64"
        drift={[-16, 0]}
        duration={8.5}
        delay={0.25}
        rotate={8}
      />
      <Model
        {...MODELS.brush}
        className="absolute bottom-[1%] left-[38%] h-20 w-20 md:right-[12%] md:bottom-[2%] md:left-auto md:h-40 md:w-40"
        drift={[-12, -10]}
        duration={7.5}
        delay={0.3}
        rotate={-12}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Header />

      <div className="relative flex flex-1 items-center justify-center px-4 py-32 md:min-h-[560px] md:px-12 md:py-16">
        <Models />

        <motion.div {...rise(0.15)} className="relative z-10 w-full max-w-[860px] text-center">
          {/* Рамка выделения вокруг оффера, как выбранный слой */}
          <SelectionFrame className="-inset-x-2 -inset-y-5 md:-inset-x-8 md:-inset-y-8">
            <span className="absolute -top-7 left-0 rounded-sm bg-select px-1.5 py-0.5 text-[0.7rem] font-medium tracking-normal text-white md:-top-8 md:text-xs">
              оффер
            </span>
          </SelectionFrame>
          <Cursor className="-right-5 -bottom-12 md:-right-14 md:-bottom-16" />

          <h1 className="display text-[2.5rem] sm:text-[3.4rem] md:text-[4.6rem] lg:text-[5.2rem]">
            Личный бренд для дизайнеров
            <br />
            <TextRotate
              texts={["интерфейсов", "логотипов", "интерьеров", "одежды"]}
              mainClassName="inline-flex justify-center overflow-hidden pb-[0.08em] text-red"
              staggerDuration={0.025}
              staggerFrom="last"
              rotationInterval={2800}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
          </h1>

          <motion.p
            {...rise(0.35)}
            className="mx-auto mt-5 max-w-[40ch] text-[1.1rem] leading-[1.2] tracking-[-0.035em] text-subtle md:mt-7 md:text-[1.35rem]"
          >
            Помогу объяснить клиентам, почему выбирать стоит именно вас.
            Позиционирование, упаковка профиля и контент-система за 3–5 дней.
          </motion.p>

          <motion.ul {...rise(0.5)} className="mt-6 flex flex-wrap justify-center gap-2 md:mt-8">
            {facts.map((f) => (
              <li
                key={f}
                className="rounded-full border border-[#cfcfcf] bg-card px-4 py-2 text-[0.95rem] tracking-[-0.03em] md:text-[1.05rem]"
              >
                {f}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.p
        aria-hidden="true"
        className="display px-3 pb-24 text-center text-[13.8vw] leading-[0.86] whitespace-normal md:pb-0 md:text-[9.6vw] md:whitespace-nowrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        POZDNYAKOV-
        <br className="md:hidden" />
        PROD
      </motion.p>
    </section>
  )
}

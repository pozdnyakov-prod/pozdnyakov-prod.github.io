// Блок на основе Cards Stack, youcefbnm (21st.dev): вариант Process
// с закреплённым заголовком слева и стопкой карточек справа.
// Это единственный блок на странице с закреплённой прокруткой.
import { ChatCircleDots, Eye, Scales } from "@phosphor-icons/react"

import { CardSticky, ContainerScroll } from "@/components/ui/cards-stack"

const problems = [
  {
    icon: ChatCircleDots,
    text: "Портфолио есть, а внятного ответа «почему именно вы» нет",
  },
  {
    icon: Eye,
    text: "Профиль показывает работы, но не объясняет ваш подход",
  },
  {
    icon: Scales,
    text: "Клиент сравнивает вас с другими по цене, потому что больше не по чему",
  },
]

export function Problem() {
  return (
    <section id="problem" className="border-t border-line px-4 sm:px-6 md:px-12">
      <div className="mx-auto grid max-w-[1200px] md:grid-cols-2 md:gap-12">
        <div className="pt-20 pb-4 md:sticky md:top-0 md:flex md:h-svh md:items-center md:py-0">
          <h2 className="max-w-[12ch] font-display text-[2.6rem] leading-[1.05] font-light tracking-[-0.015em] md:text-[4.2rem]">
            Хорошие работы не продают себя сами
          </h2>
        </div>

        <ContainerScroll className="space-y-6 pt-6 pb-20 md:min-h-[150vh] md:space-y-8 md:pt-[22vh] md:pb-[14vh]">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <CardSticky
                key={problem.text}
                index={index}
                incrementY={18}
                incrementZ={10}
                baseTop="clamp(24px, 22vh, 220px)"
                className="flex min-h-[230px] flex-col justify-between gap-10 border border-line bg-card p-7 md:min-h-[300px] md:p-10"
              >
                <Icon size={26} weight="light" aria-hidden="true" />
                <p className="font-display text-[1.7rem] leading-[1.15] font-light md:text-[2.15rem]">
                  {problem.text}
                </p>
              </CardSticky>
            )
          })}
        </ContainerScroll>
      </div>
    </section>
  )
}

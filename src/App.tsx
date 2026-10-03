import { ChatsCircle, Path, Stack, Tag } from "@phosphor-icons/react"

import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar"
import { Hero } from "@/components/sections/hero"
import { Problem } from "@/components/sections/problem"
import { Service } from "@/components/sections/service"
import { BeforeAfter } from "@/components/sections/before-after"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Pricing } from "@/components/sections/pricing"
import { Faq } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"

const navItems: NavItem[] = [
  { name: "Услуга", url: "#service", icon: Stack },
  { name: "Процесс", url: "#process", icon: Path },
  { name: "Цена", url: "#price", icon: Tag },
  { name: "Вопросы", url: "#faq", icon: ChatsCircle },
]

export default function App() {
  return (
    <>
      <NavBar items={navItems} />
      <main id="top">
        <Hero />
        <Problem />
        <Service />
        <BeforeAfter />
        <Process />
        <About />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

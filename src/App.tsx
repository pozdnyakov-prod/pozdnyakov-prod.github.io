import { Briefcase, CircleHelp, Route, Tag, User } from "lucide-react"

import { NavBar } from "@/components/ui/tubelight-navbar"
import { LandingHero } from "@/components/sections/hero"
import { Problem } from "@/components/sections/problem"
import { Service } from "@/components/sections/service"
import { BeforeAfter } from "@/components/sections/before-after"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Pricing } from "@/components/sections/pricing"
import { Faq } from "@/components/sections/faq"
import { SiteFooter } from "@/components/sections/site-footer"

const navItems = [
  { name: "Услуга", url: "#service", icon: Briefcase },
  { name: "Процесс", url: "#process", icon: Route },
  { name: "Обо мне", url: "#about", icon: User },
  { name: "Цена", url: "#price", icon: Tag },
  { name: "Вопросы", url: "#faq", icon: CircleHelp },
]

export default function App() {
  return (
    <>
      <NavBar items={navItems} />
      <main id="top">
        <LandingHero />
        <Problem />
        <Service />
        <BeforeAfter />
        <Process />
        <About />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}

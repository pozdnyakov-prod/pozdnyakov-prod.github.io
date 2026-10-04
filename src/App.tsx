import { Hero } from "@/components/sections/hero"
import { Problem } from "@/components/sections/problem"
import { Service } from "@/components/sections/service"
import { ModelsStrip } from "@/components/sections/models-strip"
import { BeforeAfter } from "@/components/sections/before-after"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Pricing } from "@/components/sections/pricing"
import { Faq } from "@/components/sections/faq"
import { Contacts } from "@/components/sections/contacts"

export default function App() {
  return (
    <>
      <main id="top">
        <Hero />
        <Problem />
        <Service />
        <ModelsStrip />
        <BeforeAfter />
        <Process />
        <About />
        <Pricing />
        <Faq />
      </main>
      <Contacts />
    </>
  )
}

// Блок «Услуга» на основе bento-grid-01 (21st.dev). Сетка, цвета и анимации
// плиток из промта; содержимое переписано под услугу.
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import {
  Crosshair,
  IdCard,
  MessagesSquare,
  Megaphone,
  NotebookPen,
  Package,
} from "lucide-react"

// «Вы» пульсирует, как «Aa» в демо: про то, чем отличаетесь именно вы
function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-serif text-6xl md:text-8xl text-white font-medium italic"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Вы
      </motion.span>
    </div>
  )
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"]

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className={`grid ${layouts[layout]} gap-1.5 w-full max-w-[140px] h-full`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-white/20 rounded-md h-5 w-full"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function SpeedIndicator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [loading, setLoading] = useState(true)

  // Загрузка стартует, когда плитка видна, иначе её никто не увидит
  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timeout)
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full gap-4">
      <div className="h-10 flex items-center justify-center overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-8 w-24 bg-white/10 rounded"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: "absolute", transition: { duration: 0.2 } }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="text-3xl md:text-4xl font-sans font-medium text-white"
            >
              3–5 дней
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm text-gray-400">от брифа до передачи</span>
      <div className="w-full max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  )
}

// Три части услуги загораются по очереди, как замки в демо
function SystemBadge() {
  const parts = [Crosshair, IdCard, NotebookPen]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % (parts.length + 1))
    }, 800)
    return () => clearInterval(interval)
  }, [parts.length])

  return (
    <div className="flex items-center justify-center h-full gap-2">
      {parts.map((Icon, i) => {
        const on = i < active
        return (
          <motion.div
            key={i}
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              on ? "bg-white/20" : "bg-white/5"
            }`}
            animate={{ scale: on ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`w-5 h-5 ${on ? "text-white" : "text-gray-600"}`} />
          </motion.div>
        )
      })}
    </div>
  )
}

function ContentPulse() {
  const [pulses] = useState([0, 1, 2, 3, 4])

  return (
    <div className="flex items-center justify-center h-full relative">
      <Megaphone className="w-16 h-16 text-white/80 z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-16 h-16 border-2 border-white/30 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export function Service() {
  return (
    <section
      id="service"
      className="bg-zinc-950 px-6 py-24 min-h-screen flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.p
          className="text-gray-400 text-sm uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Услуга
        </motion.p>
        <motion.h2
          className="font-serif text-4xl md:text-6xl text-white mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Три части одной системы
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {/* 1. Позиционирование, высокая 2x2 */}
          <motion.div
            className="md:col-span-2 md:row-span-2 row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 1)" }}
          >
            <div className="flex-1">
              <TypeTester />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-white font-medium">Позиционирование и оффер</h3>
              <p className="text-gray-400 text-sm mt-1">Чем вы отличаетесь и для кого работаете.</p>
            </div>
          </motion.div>

          {/* 2. Упаковка профиля, 2x1 */}
          <motion.div
            className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1">
              <LayoutAnimation />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-white font-medium">Упаковка профиля</h3>
              <p className="text-gray-400 text-sm mt-1">Структура и тексты, которые объясняют ваш подход.</p>
            </div>
          </motion.div>

          {/* 3. Контент-система, высокая 2x2 */}
          <motion.div
            className="md:col-span-2 md:row-span-2 row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <ContentPulse />
              </div>
            </div>
            <div className="mt-auto relative z-20 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-2">
              <h3 className="font-serif text-2xl text-white flex items-center gap-2 font-medium">
                <Megaphone className="w-5 h-5" />
                Контент-система
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Схема, о чём и как писать, чтобы вести контент самостоятельно.
              </p>
            </div>
          </motion.div>

          {/* 4. Срок, 2x1 */}
          <motion.div
            className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1">
              <SpeedIndicator />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-white font-medium">Срок</h3>
            </div>
          </motion.div>

          {/* 5. Фиксированный состав, 3x1 */}
          <motion.div
            className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1">
              <SystemBadge />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-white flex items-center gap-2 font-medium">
                <Package className="w-5 h-5" />
                Фиксированный состав
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Одна услуга: позиционирование, упаковка профиля и контент-система.
              </p>
            </div>
          </motion.div>

          {/* 6. Менторство, 3x1 */}
          <motion.div
            className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <MessagesSquare className="w-16 h-16 text-white" />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-white font-medium">Две недели менторства</h3>
              <p className="text-gray-400 text-sm mt-1">
                Полное менторство в течение двух недель после того, как вы получите файл.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

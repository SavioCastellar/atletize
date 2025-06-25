"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="h-[93vh] relative flex items-center overflow-hidden">
      <div className="w-full h-full justify-stretch px-6 grid md:grid-cols-2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secundaria-t/10 to-transparent">
        <div className="w-full flex flex-col justify-center items-center text-center md:items-start md:text-start gap-8 md:pl-6 lg:pl-28">
          <div className="justify-center items-center visible md:invisible md:hidden flex">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-secundaria-dark/5 rounded-full p-4 size-32"
            >
              <Image src="/logo-alt.png" alt="Logo" width={160} height={160} />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4"
          >
            <Shield className="w-12 h-12 text-secundaria-light" />
            <span className="text-secundaria-light text-xl font-medium">DESDE 2005</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-zinc-500/60 tracking-tight"
          >
            Atlética
            <span className="block text-white">MED-PUC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-neutral-300 text-xl font-light leading-relaxed max-w-2xl"
          >
            Desde 2005 movimentando a comunidade.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button
              variant="outline"
              className="px-8 py-6 rounded-lg font-medium text-lg bg-secundaria-t/10 text-secundaria-light border-secundaria-t hover:bg-secundaria-t/20 hover:text-secundaria-extralight transition-all duration-300 gap-2">
              Explore Nosso Legado
            </Button>
          </motion.div>
        </div>
        <div className="justify-center items-center invisible md:visible flex">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="bg-secundaria-dark/5 rounded-full p-20"
          >
            <Image src="/logo-alt.png" alt="Logo" width={240} height={240} />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-32 h-1 bg-secundaria-t/30 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                delay: i * 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 4,
                ease: "easeInOut",
              }}
              className="w-full h-full bg-secundaria-light"
            />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

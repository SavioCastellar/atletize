"use client"

import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export const Timeline = ({
  items,
}: {
  items: {
    title: string
    description: string
    icon?: React.ReactNode
    image?: string
  }[]
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  })

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-9 top-1 w-[4px] h-full bg-gradient-to-b from-primary to-primary/20 origin-top rounded-full"
      />
      <div className="relative flex flex-col gap-12 pb-12">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="ml-20 relative"
          >
            <div className="absolute -left-[60px] p-2 bg-background border border-primary rounded-full shadow-lg shadow-primary/20">
              <div className="w-8 h-8 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
            <div className="timeline-card rounded-lg overflow-hidden">
              {item.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

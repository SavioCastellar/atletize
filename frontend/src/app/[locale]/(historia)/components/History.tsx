"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"

const timelineEvents = [
  {
    year: "2005",
    title: "O Início",
    desc: "O nascimento de um legado",
    image: "/pessoa.svg",
    yearbook: [
      {
        title: "First Team Photo",
        image: "/pessoa.svg",
        description: "The original squad that started it all"
      },
      {
        title: "Inaugural Match",
        image: "/pessoa.svg",
        description: "Our first competitive match at the old ground"
      },
      {
        title: "Founding Members",
        image: "/pessoa.svg",
        description: "The visionaries who established our club"
      }
    ]
  },
  {
    year: "2006",
    title: "Primeiro Título",
    desc: "Campeões da liga regional",
    image: "/pictures.png",
    yearbook: [
      {
        title: "Championship Moment",
        image: "/pictures.png",
        description: "The team lifting our first major trophy"
      },
      {
        title: "Victory Parade",
        image: "/pictures.png",
        description: "Celebrating with our faithful supporters"
      },
      {
        title: "Captain's Speech",
        image: "/pictures.png",
        description: "An emotional address to the crowd"
      }
    ]
  },
  {
    year: "2025",
    title: "Nova Era",
    desc: "20 anos de excelência",
    image: "/pictures.png",
    yearbook: [
      {
        title: "Modern Era",
        image: "/pictures.png",
        description: "Our state-of-the-art stadium today"
      },
      {
        title: "Centenary Celebration",
        image: "/pictures.png",
        description: "Special anniversary match"
      },
      {
        title: "Future Vision",
        image: "/pictures.png",
        description: "Breaking ground on our new training complex"
      }
    ]
  }
]

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const selectedEvent = timelineEvents.find(event => event.year === selectedYear)

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) =>
        prev === selectedEvent.yearbook.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedEvent.yearbook.length - 1 : prev - 1
      )
    }
  }

  return (
    <section ref={containerRef} className="py-8 bg-black relative">
      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-8">Nossa História</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-16">
            A história da Atlética ao longo dos anos, desde a sua fundação até os dias atuais.
          </p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-px bg-neutral-800" />
          <div className="space-y-24">
            {timelineEvents.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`flex items-center gap-8 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-neutral-950 p-8 rounded-lg border border-neutral-800 relative group"
                  >
                    <span className="text-secundaria-light text-4xl font-bold block mb-4">
                      {item.year}
                    </span>
                    <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-neutral-400">{item.desc}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedYear(item.year)
                        setCurrentImageIndex(0)
                      }}
                      className="mt-4 px-4 py-2 bg-secundaria-light/10 text-secundaria-light rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-4 h-4" />
                      Ver Anuário
                    </motion.button>
                  </motion.div>
                </div>
                <div className="w-4 h-4 bg-secundaria-light rounded-full relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute inset-0 bg-secundaria-light/20 rounded-full animate-ping"
                  />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Yearbook Modal */}
      {selectedYear && selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-neutral-900 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setSelectedYear(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
              {/* Image Section */}
              <div className="relative bg-black">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedEvent.yearbook[currentImageIndex].image}
                    alt={selectedEvent.yearbook[currentImageIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-secundaria-light text-5xl font-bold mb-2">
                        {selectedEvent.year}
                      </h3>
                      <p className="text-white/50">
                        {`Image ${currentImageIndex + 1} of ${selectedEvent.yearbook.length}`}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white text-2xl font-medium mb-3">
                        {selectedEvent.yearbook[currentImageIndex].title}
                      </h4>
                      <p className="text-neutral-400 leading-relaxed">
                        {selectedEvent.yearbook[currentImageIndex].description}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-8">
                      {selectedEvent.yearbook.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? "bg-secundaria-light w-8"
                              : "bg-neutral-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

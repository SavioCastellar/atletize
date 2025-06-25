'use client'
import React from 'react'
import { functionalities } from '../data/functionalities'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

export function Functionalities() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === functionalities.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? functionalities.length - 1 : currentIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === functionalities.length - 1 ? 0 : currentIndex + 1
    )
  }

  return (
    <div
      className="w-[90%] h-[500px] mx-auto flex rounded-2xl overflow-hidden shadow-md my-4 border-2 border-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="w-[65%] h-full pl-2 py-2">
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentIndex}
            src={functionalities[currentIndex].image}
            alt={functionalities[currentIndex].title}
            className="w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="w-[35%] h-full flex flex-col justify-between p-6">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-medium text-center mt-4 mb-6">
              Confira todas as funcionalidades do sistema!
            </h1>
            <h2 className="text-xl font-medium mb-4">
              {functionalities[currentIndex].title}
            </h2>
            <p className="text-lg">
              {functionalities[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" onClick={goToPrevious}>
            <ChevronLeft size={24} />
          </Button>

          <div className="flex space-x-2">
            {functionalities.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full ${index === currentIndex ? 'bg-black w-14' : 'bg-gray-300 w-3'
                  }`}
              ></button>
            ))}
          </div>

          <Button variant="ghost" onClick={goToNext}>
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

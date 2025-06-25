"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TimelineEvent } from "./TimeliveEvent"

interface TimelineProps {
  events: Array<{
    year: number
    title: string
    description: string
    image: string
  }>
}

export function Timeline({ events }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current!.offsetLeft)
    setScrollLeft(scrollRef.current!.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current!.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current!.scrollLeft = scrollLeft - walk
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // const years = events.map((event) => event.year)
  // const minYear = Math.min(...years)
  // const maxYear = Math.max(...years)
  // const totalSpan = maxYear - minYear || 1

  return (
    <div className="flex w-full items-start gap-4 px-20">
      <button
        onClick={() => scroll("left")}
        className="-mt-1"
      >
        <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-gray-800/70 group-hover:border-white/20">
          <ChevronLeft className="w-5 h-5 text-white/70 transition-colors group-hover:text-white/90" />
        </div>
      </button>

      <div
        ref={scrollRef}
        className="overflow-hidden w-full"
        onMouseDown={handleMouseDown}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="relative min-w-max">
          <div className="h-[2px] bg-slate-400 absolute top-[13px] left-0 right-0" />
          <div className="flex justify-between gap-40 px-12 pt-1 w-full">
            {events.map((event, index) => (
              <TimelineEvent key={event.year} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="-mt-1"
      >
        <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-gray-800/70 group-hover:border-white/20">
          <ChevronRight className="w-5 h-5 text-white/70 transition-colors group-hover:text-white/90" />
        </div>
      </button>
    </div>
  )
}

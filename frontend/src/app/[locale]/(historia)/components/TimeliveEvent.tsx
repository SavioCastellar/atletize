"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ThreeDCard } from "@/components/ui/3d-card"

interface TimelineEventProps {
  event: {
    year: number
    title: string
    description: string
    image: string
  }
  index: number
}

export function TimelineEvent({ event, index }: TimelineEventProps) {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex flex-col items-center cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-slate-400 p-[2px] relative z-10 group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <span className="text-lg font-semibold mt-4 text-gray-300 group-hover:text-white transition-colors">
            {event.year}
          </span>
        </motion.div>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="center"
        className="w-80 data-[side=top]:animate-card-in bg-transparent border-none"
        sideOffset={-40}
      >
        <ThreeDCard className="w-full">
          <div className="relative backdrop-blur-xl bg-black/20 rounded-xl p-4 shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-background rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 rounded-xl opacity-50" />
            <div className="space-y-4 relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-950 via-slate-700 to-slate-950 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="relative w-full h-40 object-cover rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground/90 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {event.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        </ThreeDCard>
      </HoverCardContent>
    </HoverCard>
  )
}

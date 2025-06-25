"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AthleteCard } from "./AthleteCard"
import { Sport } from "../types/sport"

interface SportModalProps {
  sport: Sport
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  athletes: Sport["athletes"]
  onVote: (athleteId: number) => void
}

export function SportModal({ sport, isOpen, onOpenChange, athletes, onVote }: SportModalProps) {
  const [votedAthleteId, setVotedAthleteId] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`voted_${sport.id}`)
      return saved ? parseInt(saved) : null
    }
    return null
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`voted_${sport.id}`)
      if (saved) {
        setVotedAthleteId(parseInt(saved))
      }
    }
  }, [sport.id])

  const handleVote = (athleteId: number) => {
    onVote(athleteId)
    setVotedAthleteId(athleteId)
    localStorage.setItem(`voted_${sport.id}`, athleteId.toString())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-neutral-950 border-neutral-800 text-white overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-2 text-neutral-100">
            {sport.icon} {sport.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <AnimatePresence>
            {athletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                onVote={handleVote}
                hasVoted={votedAthleteId === athlete.id}
                disabled={votedAthleteId !== null && votedAthleteId !== athlete.id}
              />
            ))}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Sport } from "../types/sport"
import { SportModal } from "./SportModal"

export function SportCard({ sport }: { sport: Sport }) {
  const [isOpen, setIsOpen] = useState(false)
  const [athletes, setAthletes] = useState(sport.athletes)

  const handleVote = (athleteId: number) => {
    setAthletes(prev =>
      prev.map(athlete =>
        athlete.id === athleteId
          ? { ...athlete, votes: athlete.votes + 1 }
          : athlete
      )
    )
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden rounded-xl bg-neutral-950/40 hover:bg-neutral-900 p-6 shadow-lg cursor-pointer border border-neutral-800"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative z-10">
          <span className="text-4xl mb-4 block">{sport.icon}</span>
          <h3 className="text-2xl font-bold mb-2 text-gray-100">{sport.name}</h3>
          <p className="text-sm text-gray-400">
            {sport.athletes.length} Atletas
          </p>
        </div>
      </motion.div>

      <SportModal
        sport={sport}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        athletes={athletes}
        onVote={handleVote}
      />
    </>
  )
}

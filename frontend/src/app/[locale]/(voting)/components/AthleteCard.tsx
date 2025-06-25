"use client"

import { motion } from "framer-motion"
import { Star, Lock } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Captcha } from "./Captcha"
import { Athlete } from "../types/athlete"
import { toast } from "sonner"

interface AthleteCardProps {
  athlete: Athlete
  onVote: (athleteId: number) => void
  hasVoted: boolean
  disabled: boolean
}

export function AthleteCard({ athlete, onVote, hasVoted, disabled }: AthleteCardProps) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleVoteClick = () => {
    if (!showCaptcha) {
      setShowCaptcha(true)
      return
    }

    if (captchaVerified) {
      onVote(athlete.id)
      setShowCaptcha(false)
      setCaptchaVerified(false)
      toast.success("Voto confirmado!")
    }
  }

  const handleCaptchaVerify = (isValid: boolean) => {
    setCaptchaVerified(isValid)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-neutral-900 rounded-xl p-4 relative overflow-hidden border border-neutral-700"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={athlete.image}
          alt={athlete.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-xl font-bold mb-2 text-neutral-100">{athlete.name}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-1 text-neutral-300">
            <Star className="w-4 h-4 text-emerald-400" /> {athlete.votes} votos
          </span>
          {hasVoted ? (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <Star className="w-4 h-4" /> Confirmado
            </span>
          ) : disabled ? (
            <span className="text-neutral-500 text-sm flex items-center gap-1">
              <Lock className="w-4 h-4" /> Você já votou
            </span>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleVoteClick}
              className={`bg-emerald-500 text-neutral-100 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={disabled}
            >
              {showCaptcha && captchaVerified ? "Confirmar" : "Votar"}
            </motion.button>
          )}
        </div>

        {showCaptcha && !hasVoted && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Captcha onVerify={handleCaptchaVerify} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

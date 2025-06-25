"use client"

import { motion } from 'framer-motion'
import { Heart, Trophy } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import FloatingParticles from './FloatingParticles'
import ProgressSection from './ProgressSection'
import DonorCard from './DonorCard'


interface Donor {
  name: string
  amount: number
  message: string
}

interface DonationGoalProps {
  currentAmount: number
  goalAmount: number
  currency: string
  recentDonors: Donor[]
}

export default function DonationGoal({
  currentAmount,
  goalAmount,
  currency,
  recentDonors,
}: DonationGoalProps) {
  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-50 rounded-2xl shadow-xl px-8 pb-8 pt-2 space-y-6 relative overflow-hidden"
      >
        <FloatingParticles />

        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 bg-slate-100  rounded-xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-6 h-6 text-black" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900">Meta de doação</h2>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <motion.div
                className="flex items-center gap-2 cursor-help"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Por que doar?</span>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Suporte Nossa Missão</h4>
                <p className="text-sm text-muted-foreground">
                  Suas doações nos ajudam a continuar nosso trabalho e fazer a diferença na comunidade.
                  Toda ajuda conta!
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </motion.div>

        <ProgressSection
          currentAmount={currentAmount}
          goalAmount={goalAmount}
          currency={currency}
        />

        {/* Recent donors */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Últimos doadores</h3>
          <div className="space-y-2">
            {recentDonors.map((donor, index) => (
              <DonorCard
                key={index}
                {...donor}
                currency={currency}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

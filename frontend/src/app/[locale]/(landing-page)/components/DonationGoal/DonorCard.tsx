"use client"

import { motion } from 'framer-motion'

interface DonorCardProps {
  name: string
  amount: number
  message: string
  currency: string
  index: number
}

export default function DonorCard({ name, amount, message, currency, index }: DonorCardProps) {
  const formattedamount = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(amount/100)
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group flex items-center justify-between p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-secundaria-t dark:hover:bg-secundaria-light/20 transition-colors"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-black flex items-center justify-center text-white font-medium"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.05 }}
        >
          {name[0]}
        </motion.div>
        <div>
          <div className="text-sm font-medium dark:group-hover:text-secundaria-light transition-colors">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{message}</div>
        </div>
      </div>
      <div className="text-sm font-medium text-secundaria dark:text-secundaria-light">
        {formattedamount}
      </div>
    </motion.div>
  )
}

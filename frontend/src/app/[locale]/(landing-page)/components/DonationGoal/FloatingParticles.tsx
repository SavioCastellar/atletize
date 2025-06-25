"use client"

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
        >
          <Sparkles
            className="text-yellow-400"
            style={{
              width: `${12 + i * 2}px`,
              height: `${12 + i * 2}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

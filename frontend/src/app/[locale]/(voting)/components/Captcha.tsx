"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface CaptchaProps {
  onVerify: (isValid: boolean) => void
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [error, setError] = useState(false)

  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 10))
    setNum2(Math.floor(Math.random() * 10))
    setUserAnswer("")
    setError(false)
  }

  useEffect(() => {
    generateNumbers()
  }, [])

  const handleSubmit = () => {
    const isValid = parseInt(userAnswer) === num1 + num2
    setError(!isValid)
    onVerify(isValid)
    if (!isValid) {
      toast.error("Resposta errada! Tente novamente.")
      generateNumbers()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="bg-gray-800 p-2 rounded-lg flex items-center gap-2">
          <span className="text-muted">{num1} + {num2} = ?</span>
          <button
            onClick={generateNumbers}
            className="text-gray-400 hover:text-gray-300"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 w-20 text-center text-muted"
          placeholder="?"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-emerald-500 px-4 py-1 rounded-lg"
        >
          Verificar
        </motion.button>
      </div>
      {error && (
        <p className="text-red-400 text-sm">Incorrect answer, try again!</p>
      )}
    </div>
  )
}

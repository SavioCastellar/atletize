"use client";

import { animate, motion, useSpring } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { Sparkle } from 'lucide-react';
import { COR_PRIMARIA, COR_PRIMARIA_T } from '@/app/constants';

interface ProgressSectionProps {
  currentAmount: number;
  goalAmount: number;
  currency: string;
}

export default function ProgressSection({ currentAmount, goalAmount, currency }: ProgressSectionProps) {
  const [count, setCount] = useState(0);
  const progress = (currentAmount / goalAmount) * 100;

  useEffect(() => {
    const controls = animate(0, currentAmount, {
      duration: 2,
      onUpdate(value) {
        setCount(value);
      },
    });

    return () => controls.stop();
  }, [currentAmount]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <span className="text-3xl font-bold text-secundaria-t/80 dark:text-secundaria">
            {currency} {Math.floor(count).toLocaleString()}
          </span>
          {progress >= 50 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-6 -top-6"
            >
              <Sparkle className="w-5 h-5 text-yellow-400 animate-pulse" />
            </motion.div>
          )}
        </motion.div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          de {currency} {goalAmount.toLocaleString()}
        </div>
      </div>

      <div className="relative">
        <Progress value={progress} className="h-3" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-50"
          animate={{
            background: [
              `linear-gradient(90deg, ${COR_PRIMARIA_T} 0%, rgba(147,51,234,0) 100%)`,
              `linear-gradient(90deg, ${COR_PRIMARIA} 0%, rgba(147,51,234,0) 100%)`,
              `linear-gradient(90deg, ${COR_PRIMARIA_T} 0%, rgba(147,51,234,0) 100%)`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Milestone markers */}
        {[25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-4 transition-opacity ${
              progress >= milestone ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ left: `${milestone}%` }}
          >
            <div className="h-2 w-0.5 bg-secundaria-t dark:bg-secundaria-light mb-1" />
            <span className="text-xs bg-secundaria-t dark:bg-secundaria-light transform -translate-x-1/2">
              {milestone}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

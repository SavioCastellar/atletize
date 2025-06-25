import React from 'react'
import GradientIcon from './GradientIcon'
import { LucideIcon } from 'lucide-react'
import { Link } from '@/app/shared/components/Link'
import { motion } from 'framer-motion'

interface ActivityButtonProps {
  Icon: LucideIcon
  activity: string
  href: string
  index: number
}

function ActivityButton({ Icon, activity, href, index } : ActivityButtonProps) {
  return (
    <Link href={href}>
      <motion.div
        className='p-2 w-64 bg-background cursor-pointer border border-black rounded-md flex justify-start items-center gap-4 shadow-md hover:bg-zinc-100'
        initial={{
          scale:0.01,
        }}
        whileInView={{
          scale: 1.0,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          },
        }}
        whileHover={{ scale: 0.95 }}
      >

        <div className='border border-black rounded-lg p-2'>
          <GradientIcon
            Icon={Icon}
            className="w-8 h-8"
          />
        </div>
        <h1 className='text-2xl font-normal'>{activity}</h1>
      </motion.div>
    </Link>
  )
}

export default ActivityButton

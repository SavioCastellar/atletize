import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react';
import React from 'react'

type TitleProps = {
  text: string
  image?: string
  bgColor: string
  txtColor: string
  Icon?: LucideIcon
  type: 'circular' | 'icon'
}

function Titulo({text, image, bgColor, txtColor, type, Icon}: TitleProps) {
  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 1.2 } }}
      className='flex justify-center items-center pl-6 h-full w-full'>
      <div className='h-[80%] w-[90%] rounded-[20px] rounded-bl-[80px] bg-black p-1'>
        <div className={`bg-${bgColor} flex flex-row mx-auto h-full w-full rounded-[20px] rounded-bl-[80px] items-center justify-center align-middle`}>
          {type === 'circular' && Icon && (
            <div className='flex justify-center items-center absolute left-4 size-24 rounded-full bg-terciaria-light'>
              <Icon size={56}/>
            </div>
          )}
          {type === 'icon' && image && (
            <img className='absolute left-8 h-28 w-28' src={image} alt='star'/>
          )}
          <div className='absolute left-11 h-12 w-12 rounded-full bg-yellow-300 blur-3xl'/>
          <h1 className={`text-5xl font-normal text-${txtColor} px-40 whitespace-nowrap`}>
            {text}
          </h1>
        </div>
      </div>
    </motion.div>
  )
}

export default Titulo

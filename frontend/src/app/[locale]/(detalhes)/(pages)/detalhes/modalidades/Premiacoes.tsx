import React, { useEffect, useState } from 'react'
import { TournamentModality } from '../domain/interfaces/IModalidade'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'

const Premiacoes = ({ awards }: { awards: TournamentModality[] }) => {

  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1, transition: { type: 'spring', delay: 1.2 } }}
      className='max-h-54 min-h-54'
    >
      <ScrollArea className="rounded-md border p-4 gap-5 h-[556px] w-[400px] border-none">
        {awards.map((award, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { type: 'spring', delay: 1 } }}
            key={index}
            className='flex flex-col gap-5 pb-10'
          >
            <h3 className='text-xl text-gray-100 text-center'>{award.tournament.toString()}</h3>
            <div className='flex items-center justify-center gap-14'>
              <div className='flex flex-col items-center'>
                <Image src='/gold.svg' alt='Ouro' height={75} width={75} draggable={false} />
                <span className='text-xl text-gray-100'>{award.gold < 10 ? '0' + award.gold : award.gold}</span>
              </div>
              <div className='flex flex-col items-center'>
                <Image src='/silver.svg' alt='Prata' height={75} width={75} draggable={false} />
                <span className='text-xl text-gray-100'>{award.silver < 10 ? '0' + award.silver : award.silver}</span>
              </div>
              <div className='flex flex-col items-center'>
                <Image src='/bronze.svg' alt='Bronze' height={75} width={75} draggable={false} />
                <span className='text-xl text-gray-100'>{award.bronze < 10 ? '0' + award.bronze : award.bronze}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default Premiacoes


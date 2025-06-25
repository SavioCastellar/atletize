import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

import { useEffect } from 'react'

export function Members() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, 325, {duration: 3})

    return () => controls.stop()
  }, [])

  return (
    <div className='flex flex-col items-center space-x-4 py-4 md:flex-row'>
      <div className='flex md:-space-x-4'>
        <img
          className='h-12 w-12 rounded-full border-2 border-primary/50'
          src='/pessoa.svg'
          alt='pessoa1'
          />
        <img
          className='h-12 w-12 rounded-full border-2 border-primary/50'
          src='/pessoa.svg'
          alt='pessoa2'
          />
        <img
          className='h-12 w-12 rounded-full border-2 border-primary/50'
          src='/pessoa.svg'
          alt='pessoa3'
          />
        <img
          className='h-12 w-12 rounded-full border-2 border-primary/50'
          src='/pessoa.svg'
          alt='pessoa4'
          />
        <img
          className='h-12 w-12 rounded-full border-2 border-primary/50'
          src='/pessoa.svg'
          alt='pessoa5'
        />
      </div>

      <div className='mt-2 flex flex-col items-center justify-center md:mt-0 md:items-start md:justify-start'>
        <div className='flex flex-col justify-center items-start'>
          <span className='text-lg font-normal text-gray-400'>
            Já somos
          </span>
          <span className='flex flex-row text-4xl font-semibold text-black'>
            <motion.div className='flex flex-row'>
              {rounded}
            </motion.div>
            {' +'}
          </span>
          <span className='flex flex-row text-xl font-semibold text-black'>
          alunos
          </span>
        </div>
      </div>
    </div>
  )
}




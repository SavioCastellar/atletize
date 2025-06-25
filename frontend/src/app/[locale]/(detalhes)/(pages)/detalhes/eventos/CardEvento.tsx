import { Wallet2 } from 'lucide-react'
import React from 'react'

interface ICardEventoProps {
  evento: {
    nome: string
    descricao: string
    data: string
  }
}

export default function CardEvento( { evento }: ICardEventoProps ) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row w-11/12 h-20 bg-[#111111] rounded-t-xl gap-4'>
        <div className='flex items-center justify-center h-28 w-28 -ml-1 -mt-4 rounded-full bg-gray-600 border-2 border-white z-50'>
          <div className='h-6 w-6 rounded-full bg-white'></div>
        </div>
        <div className='w-1/2'>
          <h1 className='text-white pt-3 pb-1'>
            {evento.nome}
          </h1>
          <p className='text-white/40 truncate text-sm'>
            {evento.descricao}
          </p>
        </div>
      </div>
      <div className='flex justify-center items-center w-full h-16 bg-[#333333] rounded-xl text-white text-2xl font-normal'>
        {evento.data}
        <div className='absolute flex justify-center items-center rotate-45 right-4 h-8 w-8 bg-black rounded-md border border-white content-center'>
          <Wallet2 className='-rotate-45' size={16} color='#D4B35F' />
        </div>
      </div>
    </div>
  )
}

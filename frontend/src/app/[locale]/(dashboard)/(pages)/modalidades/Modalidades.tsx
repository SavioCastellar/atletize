'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Search } from 'lucide-react'
import React, { useState } from 'react'

export default function Modalidades() {

  let [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  const handleSearch = () => {
    console.log('Pesquisando...')
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-4xl font-normal text-zinc-900'>Modalidades</h1>
        <div className='flex items-center justify-between w-auto gap-10'>
          {/* Adicionar atleta */}
          <Button size="sm" className="h-8 gap-1" onClick={openModal}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo Atleta
            </span>
          </Button>

          {/* Barra de pesquisa */}
          <div className="flex items-center justify-between rounded-md border-2 border-black w-80 h-12 right-44 px-5 focus:border-t-0">
            <Input
              placeholder="Pesquisar por nome..."
              className="bg-background text-lg w-full focus:outline-none focus:label-none placeholder:text-black/60 text-black"
              onChange={handleSearch}
            />
            <Search className="relative size-7 text-black" />
          </div>
        </div>
      </div>

      {/* <div className='grid grid-cols-5 grid-rows-2 gap-4'>
        {currentItems.map((athlete) => (
          <CardAtleta key={athlete.id} info={athlete} />
        ))}
      </div> */}

      {/* Paginação */}
      {/* <div className='flex justify-center'>
        <div className='flex flex-row justify-center items-center max-w-max'>
          <ArrowLeft size={20} color='black' className={`mr-4 ${actualPage > 1 ? 'cursor-pointer' : 'opacity-30'}`} onClick={() => pageLeft(actualPage)}/>
          {Array.from({ length: pages }).map((_, index) => (
            <div key={index + 1} className={`${actualPage === index + 1 ? 'border-2 rounded-full' : ''} flex w-14 items-center justify-center cursor-pointer`}>
              <a
                className={`${actualPage === index + 1 ? 'text-black text-2xl font-semibold' : 'text-black/70 text-xl font-medium'} px-3 py-1 cursor-pointer`}
                onClick={() => setActualPage(index + 1)}
              >
                {index + 1}
              </a>
            </div>
          ))}
          <ArrowRight size={20} color='black' className={`ml-4 ${actualPage !== pages ? 'cursor-pointer' : 'opacity-30'}`} onClick={() => pageRight(actualPage)}/>
        </div>
      </div> */}

      {/* <NovaModalidade isOpen={isOpen} setIsOpen={setIsOpen}/> */}
    </div>
  )
}

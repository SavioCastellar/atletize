import { motion } from 'framer-motion'
import React from 'react'
import Titulo from '../components/Titulo'
import TrocaTab from '../components/TrocaTab'
import CardEvento from './CardEvento'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BriefcaseBusiness, PartyPopper } from 'lucide-react'

type ITabProps = {
  setCurrentIndex: (index: number) => void
}

export default function Gestao( { setCurrentIndex }: ITabProps ) {

  {/* Troca de tab */}
  const handleNext = () => {
    setCurrentIndex(0)
  }

  const handlePrev = () => {
    setCurrentIndex(2)
  }

  const eventos = [
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
    {
      nome: 'Bailão das Atléticas',
      descricao: 'Descrição do evento aaaaaaa aaaa aaaaaaaa aaaaaaaaaaaaaa',
      data: '03 de Agosto',
    },
  ]

  return (
    <div className="h-screen bg-black p-3 flex justify-center items-center">
      <div className="relative bg-theme-bg w-full h-full rounded-3xl p-6">

        {/* Título Eventos */}
        <div className="absolute -top-[1px] -left-[1px] h-screen-15 bg-black rounded-tl-2xl">
          <div className="absolute top-[1px] -right-10 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-theme-3"></div>
          <div className="absolute bottom-0 right-0 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-bg"></div>
          <div className="absolute -bottom-10 left-[1px] h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-theme-3"></div>
          <Titulo text='Eventos' Icon={PartyPopper} bgColor='theme-bg' txtColor='black' type='circular'/>
        </div>

        {/* Título Competições */}
        <div className="absolute -top-[1px] -right-[1px] h-screen-15 bg-black rounded-bl-2xl">
          <div className="absolute top-[1px] -left-10 h-10 w-10 bg-transparent rounded-tr-3xl shadow-custom-tr-theme-3"></div>
          <div className="absolute -bottom-10 right-0 h-10 w-10 bg-transparent rounded-tr-3xl shadow-custom-tr-theme-3">
          </div>
          <div className="absolute -bottom-0 left-0 h-10 w-10 bg-black rounded-bl-3xl shadow-custom-bl-bg"></div>
          <Titulo text='Competições' Icon={BriefcaseBusiness} bgColor='theme-bg' txtColor='black' type='circular'/>
        </div>

        {/* Lista de eventos */}
        <div className='absolute bottom-16 flex flex-col ml-20 w-1/5'>
          <Carousel className="w-full max-w-sm" orientation='vertical'>
            <CarouselContent className="-ml-1 h-[480px]">
              {eventos.map((_, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="">
                    <CardEvento evento={eventos[index]}/>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>

        {/* Lista de competições */}
        <div className='absolute bottom-[160px] right-36'>
          <div className='relative w-[600px] h-80'>
            <div className='absolute bottom-0 left-32 z-40 flex h-64 w-[500px] rounded-xl rounded-br-[60px] overflow-hidden'>
              <img className='w-full object-cover' src="/bg.jpg" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className='absolute flex flex-col justify-center items-start w-[300px] h-64 bg-[#111] pl-4 pr-1 gap-6'>
                <h1 className='text-white text-4xl font-medium'>Engenhariadas</h1>
                <p className='text-[#D9D9D9] text-md'>Descrição da competição de futebol aaaaa aaaaaa</p>
              </div>
            </div>
            <div className='absolute bottom-10 left-20 z-30 flex h-64 w-[500px] rounded-xl rounded-br-[60px] overflow-hidden'>
              <img className='w-full object-cover opacity-70' src="/bg.jpg" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className='absolute flex flex-col justify-center items-start w-[300px] h-64 bg-[#111]/70 pl-4 pr-1 gap-6'>
                <h1 className='text-white/70 text-4xl font-medium'>Engenhariadas</h1>
                <p className='text-[#D9D9D9]/70 text-md'>Descrição da competição de futebol aaaaa aaaaaa</p>
              </div>
            </div>
            <div className='absolute bottom-20 left-10 z-20 flex h-64 w-[500px] rounded-xl rounded-br-[60px] overflow-hidden'>
              <img className='w-full object-cover opacity-40' src="/bg.jpg" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className='absolute flex flex-col justify-center items-start w-[300px] h-64 bg-[#111]/40 pl-4 pr-1 gap-6'>
                <h1 className='text-white/40 text-4xl font-medium'>Engenhariadas</h1>
                <p className='text-[#D9D9D9]/40 text-md'>Descrição da competição de futebol aaaaa aaaaaa</p>
              </div>
            </div>
            <div className='absolute bottom-32 left-0 z-10 flex h-64 w-[500px] rounded-xl rounded-br-[60px] overflow-hidden'>
              <img className='w-full object-cover opacity-10' src="/bg.jpg" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className='absolute flex flex-col justify-center items-start w-[300px] h-64 bg-[#111]/10 pl-4 pr-1 gap-6'>
                <h1 className='text-white/10 text-4xl font-medium'>Engenhariadas</h1>
                <p className='text-[#D9D9D9]/10 text-md'>Descrição da competição de futebol aaaaa aaaaaa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separação de conteúdo */}
        <div className="absolute -bottom-[1px] left-1/3 h-screen-25 w-screen-5 bg-black rounded-t-2xl">
          <div className="absolute -top-0 -left-0 h-10 w-10 bg-black rounded-tl-3xl shadow-custom-tl-bg"></div>
          <div className="absolute bottom-[1px] -left-10 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-3"></div>
          <div className="absolute top-0 right-0 h-10 w-10 bg-black rounded-tr-3xl shadow-custom-tr-bg"></div>
          <div className="absolute bottom-[1px] -right-10 h-10 w-10 bg-transparent rounded-bl-3xl shadow-custom-bl-theme-3"></div>
        </div>

        {/* Troca de tab */}
        <div className="absolute -bottom-[1px] -right-[1px] h-screen-15 w-screen-20 bg-black rounded-br-2xl">
          <div className="absolute top-0 h-10 w-10 bg-tranparent rounded-tl-3xl shadow-custom-tl-bg"></div>
          <div className="absolute -top-10 right-[1px] h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-3"></div>
          <div className="absolute bottom-[1px] -left-10 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-3"></div>
          <TrocaTab color='theme-3' onNext={handleNext} onPrev={handlePrev}/>
        </div>
      </div>
    </div>
  )
}

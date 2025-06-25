'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Titulo from '../components/Titulo'
import TrocaTab from '../components/TrocaTab'
import CardGestor from './CardGestor'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { supabase } from '@/app/api/auth/supabase/client'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import CartDrawer from '@/app/[locale]/(store)/components/cart/cart-drawer'
import { Session } from 'next-auth'
import TabNavigation from '../components/NavBar'
import NavBar from '../components/NavBar'

type ITabProps = {
  setCurrentIndex: (index: number) => void
  session: Session | null
}

const fetchManagers = async () => {
  const { data, error } = await supabase
    .from('managers')
    .select(`
      id,
      name,
      course,
      reg_number,
      contact_number,
      x,
      instagram,
      email,
      image,
      period,
      positions (
        id,
        name,
        functions (
          id,
          name
        )
      )
    `)

  if (error) {
    console.error('Error fetching managers:', error)
    return null
  }

  return data
}

const fetchPeriods = async () => {
  const { data, error } = await supabase
    .from('periods')
    .select('id, range')
    .order('range')

  if (error) {
    console.error('Error fetching periods:', error)
    return null
  }

  return data
}

export default function Gestao({ setCurrentIndex, session }: ITabProps) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [managers, setManagers] = useState<any>([])
  const [periods, setPeriods] = useState<any>([])
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [managersByDate, setManagersByDate] = useState<any>([])
  const [direction, setDirection] = useState<any>([])
  const [membersByTeam, setMembersByTeam] = useState<any>([])
  const [currentDateIndex, setCurrentDateIndex] = useState(0)
  const [teams, setTeams] = useState<any>([])

  const handleNext = () => setCurrentIndex(3)
  const handlePrev = () => setCurrentIndex(1)

  const handlePreviousDatePicker = () => setCurrentDateIndex((prevIndex: number) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  const handleNextDatePicker = () => setCurrentDateIndex((prevIndex: number) => (prevIndex < periods.length - 3 ? prevIndex + 1 : prevIndex))

  const handleSelect = (period: string) => {
    setSelectedPeriod(period)
    setCurrentSlide(0)
  }

  useEffect(() => {
    const getManagers = async () => {
      const data = await fetchManagers()
      setManagers(data)
    }

    getManagers()
  }, [])

  useEffect(() => {
    const getPeriods = async () => {
      const data = await fetchPeriods()
      const dateRanges = data?.map((d: any) => d.range)
      setPeriods(dateRanges)
      if (dateRanges) {
        setCurrentDateIndex(dateRanges.length - 3)
        setSelectedPeriod(dateRanges[dateRanges.length - 1])
      }
    }

    getPeriods()
  }, [])

  useEffect(() => {
    if (!selectedPeriod || !managers.length || !periods.length) return

    const filteredManagers = managers.filter((manager: any) =>
      manager.period === selectedPeriod ||
      (!selectedPeriod && manager.period === periods[periods.length - 1])
    )
    setManagersByDate(filteredManagers)

    const filteredDirection = filteredManagers.filter((manager: any) => manager.positions.functions.name === 'Diretoria')
    setDirection(filteredDirection)

    const uniqueTeams = [
      ...new Set(filteredManagers.map((manager: any) => manager.positions.functions.name).filter((team: any) => team !== 'Diretoria')),
    ]
    setTeams(uniqueTeams)

    const filteredMembersByTeam = filteredManagers.filter((manager: any) => manager.positions.functions.name === uniqueTeams[currentSlide])
    setMembersByTeam(filteredMembersByTeam)

  }, [selectedPeriod, managers, periods, currentSlide])

  return (
    <div className="h-screen bg-theme-bg p-3 flex justify-center items-center">
      <div className="relative bg-black w-full h-full rounded-3xl p-6">

        {/* Título */}
        <motion.div
          initial={{ x: -530 }}
          whileInView={{ x: 0, transition: { type: 'just', duration: 0.8, delay: 0.4 } }}
          className="absolute -top-[1px] -left-[1px] h-screen-15 bg-theme-bg rounded-tl-2xl"
        >
          <div className="absolute top-[1px] -right-10 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-bg" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { type: 'just', duration: 0.4,  delay: 0.4 } }}
            className="absolute bottom-0 right-0 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-3"
          />
          <div className="absolute -bottom-10 left-[1px] h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-bg" />
          <Titulo text='Gestão' bgColor='black' txtColor='white' type='icon' />
        </motion.div>

        {/* Data */}
        <motion.div
          initial={{ y: -80 }}
          whileInView={{ y: 0, transition: { type: 'just', duration: 0.4, delay: 1.2 } }}
          className='flex absolute -top-[1px] left-[45%] w-auto h-[72px] bg-background px-8 py-2 gap-2 justify-center items-center'
        >
          <div className='absolute top-0 -left-10 h-10 w-10 bg-transparent rounded-tr-3xl shadow-custom-tr-bg' />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: 'just', duration: 0.4, delay: 1.2 },
            }}
            className='absolute bottom-0 left-0 h-10 w-10 bg-transparent rounded-bl-3xl shadow-custom-bl-theme-3'
          />
          <div className='absolute top-0 -right-10 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-bg' />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: 'just', duration: 0.4, delay: 1.2 },
            }}
            className='absolute bottom-0 right-0 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-3'
          />
          <div className="flex flex-col items-center space-y-4 z-20">
            <div className="flex items-center justify-center gap-2">
              {periods.length > 3 && (
                <button
                  className='cursor-pointer s-6'
                  onClick={handlePreviousDatePicker}
                  disabled={currentDateIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {periods.slice(currentDateIndex, currentDateIndex + 3).map((period: any) => (
                <div
                  key={period}
                  className={`${(period === selectedPeriod || (!selectedPeriod && period === periods[periods.length - 1])) ? "bg-secundaria-extralight" : "bg-background border-2 border-black hover:bg-secundaria-t"} flex items-center justify-center h-12 rounded-md w-24 text-sm cursor-pointer`}
                  onClick={() => handleSelect(period)}
                >
                  {period}
                </div>
              ))}

              {periods.length > 3 && (
                <button
                  className='cursor-pointer s-6'
                  onClick={handleNextDatePicker}
                  disabled={currentDateIndex >= periods.length - 3}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Gestores */}
        <div className='absolute flex left-[5%] top-[25%] w-auto gap-7'>
          {direction.length > 0 && (
            direction.map((manager: any) => (
              <CardGestor
                key={manager.id}
                info={manager}
              />
            ))
          )}
        </div>

        {/* Mensagem */}
        <div className='absolute flex items-center left-[5%] bottom-[8%] w-[50%] gap-7'>
          <Image
            height={100}
            width={100}
            src='/logo-alt.png'
            alt=""
          />
          <p className='text-background text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, porro esse autem fugiat velit exercitationem quia nulla quod voluptates perspiciatis qui rem id doloremque obcaecati soluta cupiditate praesentium suscipit nesciunt?
          </p>
        </div>

        {/* Cargo */}
        <div className="absolute right-80 w-48 h-[75%] flex flex-col items-center justify-end">
          <h1 className="text-5xl writing-mode-vertical transform -rotate-180 mb-8 text-background"
            style={{ writingMode: 'vertical-rl' }}>
            {teams[currentSlide]}
          </h1>

          {/* Horizontal Navigation Dots */}
          <div className="flex gap-3 mt-4">
            {teams.map((team: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white scale-150' : 'bg-gray-500'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Equipe */}
        <div className='absolute top-10 right-4'>
          <ScrollArea className="rounded-md border p-4 gap-5 h-[556px] w-[320px] border-none">
            <div className='flex flex-col rounded-xl gap-5'>
              {membersByTeam.map((manager: any) => (
                <div className='flex justify-center items-center'>
                  <img className='w-40 h-40 bg-theme-bg rounded-xl' src={manager.image} alt={manager.name} draggable='false' />
                  <div className='flex flex-col rounded-lg bg-secundaria-extralight text-black border-secundaria-dark justify-center items-center h-16 px-4 w-44 -ml-5'>
                    <h1 className='text-sm font-medium text-center'>{manager.name}</h1>
                    <p className='text-xs'>{manager.positions.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Troca de tab */}
        <div className="absolute -bottom-[1px] -right-[1px] h-screen-15 w-screen-20 bg-theme-bg rounded-br-2xl">
          <div className="absolute top-0 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-theme-3"></div>
          <div className="absolute -top-10 right-[1px] h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-bg"></div>
          <div className="absolute bottom-[1px] -left-10 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-bg"></div>
          <TrocaTab color='black' onNext={handleNext} onPrev={handlePrev} />
        </div>

        {/* Botão de voltar */}
        <NavBar session={session} />
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Titulo from '../components/Titulo'
import TrocaTab from '../components/TrocaTab'
import Premiacoes from './Premiacoes'
import { TournamentModality } from '../domain/interfaces/IModalidade'
import { supabase } from '@/app/api/auth/supabase/client'
import Image from 'next/image'
import { Calendar, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import TabNavigation from '../components/NavBar'
import { Session } from 'next-auth'
import NavBar from '../components/NavBar'

interface Modality {
  name: string
  instagram: string
  icon: string
  description: string
  awards: TournamentModality[]
  training_schedule: any
}

type ITabProps = {
  setCurrentIndex: (index: number) => void
  session: Session | null
}

function Modalidades({ setCurrentIndex, session }: ITabProps) {
  const [modalities, setModalities] = useState<Modality[]>([])
  const [activeId, setActiveId] = useState('')
  const [modalidade, setModalidade] = useState<Modality>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    fetchModalities()
  }, [])

  const fetchModalities = async () => {
    const { data, error } = await supabase
      .from('modalities')
      .select(`
        id,
        name,
        instagram,
        icon,
        description,
        tournaments_modalities (
          gold,
          silver,
          bronze,
          tournaments (
            name
          )
        ),
        training_schedule (
          sun,
          mon,
          tue,
          wed,
          thu,
          fri,
          sat
        )
      `)
      .order('name', { ascending: true })

    if (error) {
      toast.error('Erro ao buscar modalidades.')
      throw error
    }

    const modalitiesData = data.map((modality: any) => {
      const awards = (modality.tournaments_modalities || []).map((tm: any) => ({
        tournament: tm.tournaments.name,
        gold: tm.gold,
        silver: tm.silver,
        bronze: tm.bronze,
      }))

      const training_schedule = modality.training_schedule[0] || {
        sun: null,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
      }

      return {
        name: modality.name,
        instagram: modality.instagram,
        icon: modality.icon,
        description: modality.description,
        awards: awards,
        training_schedule: training_schedule,
      }
    })

    setModalities(modalitiesData)
    setActiveId(modalitiesData[0].name)
    setModalidade(modalities[0])
  }

  const handleClick = (id: any) => {
    setActiveId(id)
    setModalidade(
      modalities.filter((modalidade) => id === modalidade.name)[0]
    )
  }

  const handleNext = () => {
    setCurrentIndex(2)
  }

  const handlePrev = () => {
    setCurrentIndex(0)
  }

  return (
    <div className='flex h-screen items-center justify-center bg-theme-bg p-3 overflow-hidden'>
      <div className='relative h-full w-full rounded-3xl bg-theme-2 p-6'>
        {/* Título */}
        <motion.div
          initial={{ x: -670 }}
          whileInView={{ x: 0, transition: { type: 'just', duration: 0.8 } }}
          className='absolute -left-[1px] -top-[1px] h-screen-15 rounded-tl-2xl bg-theme-bg'
        >
          <div className='absolute -right-10 top-[1px] h-10 w-10 rounded-tl-3xl bg-transparent shadow-custom-tl-bg'></div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: 'just', duration: 0.2 },
            }}
            className='absolute bottom-0 right-0 h-10 w-10 rounded-br-3xl bg-transparent shadow-custom-br-theme-2'
          ></motion.div>
          <div className='absolute -bottom-10 left-[1px] h-10 w-10 rounded-tl-3xl bg-transparent shadow-custom-tl-bg'></div>
          <Titulo text='Modalidades' bgColor='theme-2' txtColor='white' type='icon' />
        </motion.div>

        {/* Add NavBar */}
        <TabNavigation session={session} />

        {modalities.map(
          (modalidade) =>
            activeId === modalidade.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { type: 'just', duration: 0.6, delay: 0.2 } }}
                key={modalidade.name}
                data-award={modalidade.awards.length}
                className='absolute flex items-center justify-center text-gray-100 top-28 left-24 h-[420px] w-[40%] gap-10'
              >
                <div className={`[writing-mode:vertical-lr] h-full justify-center items-center rotate-180 flex whitespace-nowrap text-5xl text-gray-100 gap-5`}>
                  <h1>{modalidade.name}</h1>
                  <Image
                    className='drop-shadow-md rotate-90'
                    src={modalidade.icon}
                    alt='modalidade'
                    height={56}
                    width={56}
                    draggable={false}
                  />
                </div>
                <div className='flex flex-col items-start justify-center gap-5 h-full'>
                  <div className='text-xl text-gray-100'>
                    {modalidade.description}
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className='flex items-center justify-center rounded-md hover:bg-secundaria-light hover:text-black/60 border-secundaria-t bg-secundaria-t text-secundaria-extralight transition-all duration-300 gap-2'
                        onClick={() => console.log('clicked')}
                      >
                        <Calendar className='h-6 w-6' />
                        Horário de treinos
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horário de Treino</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        {modalidade.training_schedule ? (
                          <div className="grid grid-cols-1 gap-2">
                            {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((dayKey, index) => {
                              const dayNames = [
                                "Domingo",
                                "Segunda-feira",
                                "Terça-feira",
                                "Quarta-feira",
                                "Quinta-feira",
                                "Sexta-feira",
                                "Sábado",
                              ];
                              const trainingTime = modalidade.training_schedule[dayKey];
                              const isTrainingDay = trainingTime !== null && trainingTime !== "";

                              const formattedTime = isTrainingDay
                                ? new Date(`1970-01-01T${trainingTime}`)
                                  .toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })
                                : null;

                              return (
                                <Button
                                  key={dayKey}
                                  disabled={!isTrainingDay}
                                  variant="outline"
                                  className={`justify-start text-black ${!isTrainingDay ? "text-black/30 cursor-not-allowed" : ""}`}
                                >
                                  {dayNames[index]}: {isTrainingDay ? formattedTime : "Sem treino"}
                                </Button>
                              );
                            })}
                          </div>
                        ) : (
                          <div>Nenhum horário de treino disponível.</div>
                        )}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            )
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { type: 'just', delay: 0.6 } }}
          className='absolute top-6 left-[50%]'
        >
          <Image
            className='drop-shadow-md w-20'
            src='/logo-alt.png'
            alt='logo'
            width={120}
            height={120}
            draggable={false}
          />
        </motion.div>

        <div className='flex justify-end text-gray-100'>
          <Premiacoes awards={modalidade?.awards ?? modalities[0]?.awards ?? []} />
        </div>

        {/* Modalidades */}
        <motion.div
          initial={{ y: 185 }}
          animate={{ y: 0, transition: { type: 'just', duration: 0.6, delay: 0.6 } }}
          className='absolute -bottom-[1px] left-28 h-screen-25 max-h-48 w-auto rounded-t-2xl bg-theme-bg'
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: 'just', duration: 0.2, delay: 0.6 },
            }}
            className='absolute left-0 top-0 h-10 w-10 rounded-tl-3xl bg-transparent shadow-custom-tl-theme-2'
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: 'just', duration: 0.2, delay: 0.6 },
            }}
            className='absolute right-0 top-0 h-10 w-10 rounded-tr-3xl bg-transparent shadow-custom-tr-theme-2'
          />
          <div className='absolute -right-10 bottom-[1px] h-10 w-10 rounded-bl-3xl bg-transparent shadow-custom-bl-bg'/>
          <div className='absolute -left-10 bottom-[1px] h-10 w-10 rounded-br-3xl bg-transparent shadow-custom-br-bg'/>
          <div className='flex h-full w-full items-center justify-center gap-1 p-4 '>
            {modalities.map((modalidade) => (
              <div
                key={modalidade.name}
                className={`flex h-full flex-col justify-between cursor-pointer ${activeId === modalidade.name ? 'border-theme-bg-theme-2 w-52 rounded-3xl border-2 bg-white' : 'w-14 rounded-full bg-theme-2'}`}
                onClick={() => handleClick(modalidade.name)}
              >
                {activeId === modalidade.name && (
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='pb-1 pt-3 text-2xl font-normal'>
                        {modalidade.name}
                      </div>
                      <div className='text-md font-normal'>
                        {modalidade.instagram}
                      </div>
                    </div>
                    <div className='flex flex-row items-center justify-center py-3 align-middle'>
                      <motion.img
                        initial={{
                          scale: 0.6,
                        }}
                        whileInView={{
                          scale: 1,
                          transition: {
                            type: 'spring',
                            duration: 0.8,
                          },
                        }}
                        className='h-10 w-10 drop-shadow-md'
                        src={modalidade.icon}
                        alt='modalidade'
                      />
                    </div>
                  </div>
                )}
                {activeId !== modalidade.name && (
                  <div className='h-[100%] py-1'>
                    <div className='flex h-full flex-col items-center justify-end'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
                        <img
                          className='h-8 w-8 drop-shadow-md'
                          src={modalidade.icon}
                          alt='modalidade'
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Troca de tab */}
        <div className="absolute -bottom-[1px] -right-[1px] h-screen-15 w-screen-20 bg-theme-bg rounded-br-2xl">
          <div className="absolute top-0 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-theme-2"/>
          <div className="absolute -top-10 right-[1px] h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-bg"/>
          <div className="absolute bottom-[1px] -left-10 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-bg"/>
          <TrocaTab color='theme-2' onNext={handleNext} onPrev={handlePrev} />
        </div>

        {/* Botão de voltar */ }
        <NavBar session={session} />

      </div>
    </div>
  )
}

export default Modalidades

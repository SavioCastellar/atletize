"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronLeft, ChevronRight, Grid2X2, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { TournamentModality } from '../domain/interfaces/IModalidade'
import { supabase } from '@/app/api/auth/supabase/client'
import { Calendar } from 'lucide-react'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sections } from "@/app/shared/utils/general"
import { cn } from "@/lib/utils"

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
}

const Medal = ({ type, count }: { type: "gold" | "silver" | "bronze", count: number }) => {
  const trophies = {
    gold: "/gold.svg",
    silver: "/silver.svg",
    bronze: "/bronze.svg",
  }

  return (
    <motion.div
      className="flex flex-col items-center px-10 md:px-0"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="mb-2">
        <Image
          src={trophies[type]}
          alt="Trophy"
          width={44}
          height={44}
          className="opacity-80"
        />
      </div>
      <div className={`flex items-center justify-center backdrop-blur-sm rounded-full p-2 w-10 h-10 shadow-lg`}>
        <span className="text-white font-semibold text-lg">{count}</span>
      </div>
    </motion.div>
  )
}

const SportCard = ({ sport, direction }: { sport: Modality, direction: number }) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)

  return (
    <motion.div
      initial={{ x: 200 * direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200 * direction, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <motion.div
              className="flex items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-xl">
                <Image
                  src={sport.icon}
                  alt={sport.name}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">{sport.name}</h2>
                <p className="text-zinc-400 text-sm">{sport.instagram}</p>
              </div>
            </motion.div>
            <motion.p
              className="text-zinc-300 text-lg leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {sport.description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:bg-secundaria-light hover:text-black/60 border-secundaria-t bg-secundaria-t text-secundaria-extralight transition-all duration-300 gap-2"
                    onClick={() => console.log('clicked')}
                  >
                    <Calendar className='h-6 w-6' />
                    Horários de Treino
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[460px] sm:max-w-[800px] rounded-md bg-zinc-900/95 border-zinc-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Horários de Treino</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    {sport.training_schedule ? (
                      <div className="grid grid-cols-1 gap-2 ">
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
                          const trainingTime = sport.training_schedule[dayKey];
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
                              className={`justify-start text-white bg-zinc-800/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800/50 hover:text-white cursor-default ${!isTrainingDay ? "text-white/50 cursor-not-allowed bg-zinc-900/50 hover:bg-zinc-900/50 hover:text-white/50" : ""}`}
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
            </motion.div>
          </div>

          <div className="space-y-10">
            {sport.awards.map((award, index) => (
              <motion.div
                className="space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-medium text-zinc-200">{String(award.tournament)}</h3>
                <div className="flex w-full justify-between">
                  <Medal type="gold" count={award.gold} />
                  <Medal type="silver" count={award.silver} />
                  <Medal type="bronze" count={award.bronze} />
                </div>
              </motion.div>
            ))
            }
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const ModalitiesGrid = ({ onSelect, modalities }: { onSelect: (index: number) => void, modalities: Modality[] }) => {
  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modalities.map((sport, index) => (
          <motion.div
            key={sport.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => onSelect(index)}
              className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-zinc-800/50 backdrop-blur-sm p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={sport.icon}
                    alt={sport.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white">{sport.name}</h3>
                  <p className="text-zinc-400 text-sm">{sport.instagram}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default function Modalidades({ setCurrentIndex }: ITabProps) {
  const [currentSport, setCurrentSport] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isGridOpen, setIsGridOpen] = useState(false)
  const [modalities, setModalities] = useState<Modality[]>([])

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
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentSport((prev) => (prev + 1) % modalities.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentSport((prev) => (prev - 1 + modalities.length) % modalities.length)
  }

  const handleSelectSport = (index: number) => {
    setDirection(index > currentSport ? 1 : -1)
    setCurrentSport(index)
    setIsGridOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 hover:opacity-80 transition-opacity">
                Modalidades
                <ChevronDown className="size-6 md:size-8 mt-1 md:mt-4 md:ml-4" color='white' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900/95 backdrop-blur-sm border-white/10">
              {sections.map((section) => (
                <DropdownMenuItem
                  key={section.id}
                  className={cn(
                    "text-lg py-3 cursor-pointer text-white/40 hover:text-white focus:text-white",
                    "modalidades" === section.id && "text-white"
                  )}
                  onClick={() => setCurrentIndex(sections.indexOf(section))}
                >
                  {section.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src="/logo-alt.png"
              alt="Med Puc Logo"
              width={100}
              height={100}
              className="w-16 md:w-24 opacity-90"
            />
          </motion.div>
        </header>

        <motion.div
          className="flex justify-end items-center gap-4 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Dialog open={isGridOpen} onOpenChange={setIsGridOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-12 h-12 p-0 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300"
              >
                <Grid2X2 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[460px] sm:max-w-[800px] bg-zinc-900/95 border-zinc-800 rounded-md">
              <DialogHeader className="flex flex-row items-center justify-between mb-6">
                <DialogTitle className="text-2xl font-bold text-white">Todas as Modalidades</DialogTitle>
                <Button
                  variant="ghost"
                  className="w-8 h-8 p-0 rounded-full hover:bg-zinc-800/50"
                  onClick={() => setIsGridOpen(false)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </DialogHeader>
              <ModalitiesGrid onSelect={handleSelectSport} modalities={modalities} />
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {modalities.length > 0 && (
            <SportCard
              key={currentSport}
              sport={modalities[currentSport]}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

import { Dialog, Disclosure, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import '../style.css'
import { motion } from 'framer-motion'
import { TextField } from '@mui/material'
import { Calendar, ChevronUpIcon, GraduationCap, MessageSquareText } from 'lucide-react'
import { Athlete } from '../domain/interfaces/IAthlete'
import { getModalitiesByUserId } from '../../../../../../../queries/get-modalities'
import useFetchMessages from '@/app/shared/hooks/useFetchMessages'
import useSupabaseBrowser from '../../../../../../../utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { supabase } from '@/app/api/auth/supabase/client'

interface HallDaFamaItemProps {
  info: Athlete
  isMobile: boolean
}

export default function HallDaFamaItem({ info, isMobile }: HallDaFamaItemProps) {
  let [isInfoOpen, setIsInfoOpen] = useState(false)
  let [isMessageOpen, setIsMessageOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    mensagem: ''
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        user_id: info.id,
        name: formData.nome,
        message: formData.mensagem
      }
      )

    if (messageError)
      toast.error('Erro ao enviar mensagem')
  }

  function handleInfoModal() {
    setIsInfoOpen(!isInfoOpen)
    setIsMessageOpen(false)
  }

  function handleMessageModal() { setIsMessageOpen(!isMessageOpen) }
  const supabase = useSupabaseBrowser()
  const { data: modalities, isLoading: athleteModalitiesLoading, isError: athleteModalitiesError } = useQuery(getModalitiesByUserId(supabase, info.id))
  const { messages, loading: loadingMessages, error: errorMessages } = useFetchMessages(info.id)

  return (
    <>
      {isMobile ? (
        <Card
          key={info.id}
          onClick={handleInfoModal}
          className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 py-4 rounded-2xl shadow-xl flex flex-col items-center cursor-pointer"
        >
          <Avatar className="size-20 mb-4 border-4 border-white/10">
            <img src={info.image} alt={info.name} className="object-cover size-20" />
          </Avatar>
          <h3 className="text-sm text-white font-normal">{info.name}</h3>
        </Card>
      ) : (
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='mx-auto flex items-center z-10 cursor-pointer'
          onClick={handleInfoModal}
        >
          <div className='h-auto w-full rounded-lg bg-gradient-to-b from-theme-3-grad to-theme-3 p-1'>
            <div className='flex flex-col h-full w-full px-2 rounded-lg items-center justify-between bg-theme-bg'>
              <div className='flex flex-row w-full justify-between mt-1'>
                <div className='bg-theme-3-grad h-[6px] w-[6px] rounded-full'></div>
                <div className='bg-theme-3-grad h-[6px] w-[6px] rounded-full'></div>
              </div>
              <div className='size-36 rounded-full bg-black/50 mx-6'>
                <img className='size-36 rounded-full object-cover' src={info.image} alt='Atleta' draggable='false' />
              </div>
              <h1 className='text-md font-bold text-zinc-800 mt-2'>
                {info.name.toUpperCase()}
              </h1>
              <div className='flex flex-row w-full justify-between mb-1'>
                <div className='bg-theme-3 h-[6px] w-[6px] rounded-full'></div>
                <div className='bg-theme-3 h-[6px] w-[6px] rounded-full'></div>
              </div>
            </div>
          </div>
        </motion.a>
      )}
      <Transition appear show={isInfoOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={handleInfoModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/65" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[460px] sm:max-w-[800px] transform overflow-hidden rounded-lg bg-gray-300 pt-6 text-left align-middle shadow-xl transition-all">
                    <div className='flex flex-row items-center justify-between mb-6 px-8'>
                      <motion.h1
                        initial={{
                          x: -100,
                        }}
                        whileInView={{
                          x: 0,
                          transition: {
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.8,
                          },
                        }}
                        className="text-2xl md:text-4xl font-bold leading-6 text-black"
                      >
                        {info.name.toUpperCase()}
                      </motion.h1>
                      <div className="flex flex-row gap-2">
                        {modalities?.map((modality, index) => (
                          <motion.img
                            initial={{
                              x: 30,
                            }}
                            whileInView={{
                              x: 0,
                              transition: {
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.8,
                              },
                            }}
                            key={index} src={`${modality.modalities?.icon}`} className="w-6 h-6 md:size-10 drop-shadow-lg" alt="Sport" />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row gap-32 md:gap-56 mt-2 px-8 items-center justify-between">
                      <div className="w-[100px]">
                        <div className="flex justify-center items-end clip-pentagon bg-black/100 w-48 h-56 md:w-72 md:h-96 rounded-lg drop-shadow-xl">
                          <div className='relative h-[200px] w-[200px] rounded-full bg-theme-bg blur-[80px]'></div>
                          <motion.img
                            initial={{
                              opacity: 0,
                            }}
                            whileInView={{
                              opacity: 1,
                              transition: {
                                type: 'spring',
                                duration: 1.4,
                              },
                            }}
                            className='absolute h-[200px] md:h-[400px]' src={info.image} alt="Atleta"
                          />
                        </div>
                      </div>
                      <div className='flex flex-col h-56 md:h-96 justify-between'>
                        <p className="text-sm md:text-xl text-black font-medium">
                          {info.description}
                        </p>
                        <div className='flex flex-col gap-3 md:gap-4'>
                          <div className='flex flex-row items-center gap-2 md:gap-4'>
                            <div className='flex justify-center items-center clip-pentagon bg-black w-10 h-10 md:w-14 md:h-14 rounded-md'>
                              <GraduationCap className='text-secundaria-extralight size-6 md:size-8' />
                            </div>
                            <h4 className='md:text-lg font-medium'>{info.course}</h4>
                          </div>
                          <div className='flex flex-row items-center gap-2 md:gap-4'>
                            <div className='flex justify-center items-center clip-pentagon bg-black w-10 h-10 md:w-14 md:h-14 rounded-md'>
                              <Calendar className='text-secundaria-extralight size-6 md:size-8' />
                            </div>
                            <h4 className='md:text-lg font-medium'>{info.graduation}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-14">
                      <div className='flex flex-col bg-black w-full h-28'>
                        <div className='flex justify-end mr-10 -mt-8'>
                          <div className='flex items-center justify-center h-16 w-16 rotate-45 bg-black rounded-md border-2 border-gray/500 content-center cursor-pointer' onClick={handleMessageModal}>
                            {/* <img className='-rotate-45' src='/arrow.svg' alt="" /> */}
                            <MessageSquareText className='-rotate-45 text-secundaria-extralight' size={36} />
                          </div>
                        </div>
                        <div className='flex w-full justify-center'>
                          <Image height={80} width={80} src='/logo-alt.png' alt="" className='size-12 md:size-16' />
                        </div>
                      </div>
                      {/* <div className='absolute bottom-10 left-20 h-[60px] w-[60px] blur-[50px] rounded-full bg-theme-bg'></div> */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>

                {isMessageOpen && (
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="h-auto max-h-[900px] w-96 max-w-3xl transform overflow-hidden rounded-lg bg-gray-300 pb-1 pt-4 px-1 text-left align-middle shadow-xl transition-all">
                      <div className='h-full w-full flex flex-col gap-2'>
                        {messages.length === 0 && (
                          <div className='flex flex-col justify-center items-center h-52 w-full gap-5'>
                            <motion.img
                              initial={{
                                y: -10,
                              }}
                              animate={{
                                y: 0,
                                transition: {
                                  type: 'bounce',
                                  bounce: 0.2,
                                  duration: 0.8,
                                  repeat: Infinity,
                                  repeatType: 'reverse',
                                },
                              }}
                              src="/ghost.svg"
                              alt="Fantasma"
                              className="w-14 h-14 drop-shadow-md"
                            />
                            <h3>Seja o primeiro a deixar uma lembrança</h3>
                          </div>
                        )}
                        <div className='flex flex-col gap-3 px-2'>
                          {messages.map(message => (
                            <div>
                              <h1 className='text-lg font-medium ml-2'>{message.name}</h1>
                              <div className='rounded-md bg-white p-2'>
                                <p className='text-sm'>{message.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='flex flex-col gap-1 p-2 rounded-md bg-white'>
                          <Disclosure >
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-black hover:bg-secundaria-extralight/60 focus:outline-none focus-visible:ring focus-visible:ring-secundaria-t/75">
                                  <span>Deixe sua lembrança também.</span>
                                  <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                      } h-5 w-5 text-secundaria-t`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-2 pb-2 pt-4 text-sm text-gray-500">
                                  <form onSubmit={handleSubmit} className='flex flex-col gap-2 -mt-2'>
                                    <TextField
                                      variant='outlined'
                                      size='small'
                                      label="Nome"
                                      name="nome"
                                      value={formData.nome}
                                      onChange={handleChange}
                                    />
                                    <TextField
                                      label="Mensagem"
                                      multiline
                                      maxRows={4}
                                      variant="outlined"
                                      name="mensagem"
                                      value={formData.mensagem}
                                      onChange={handleChange}
                                    />
                                    <div className='flex flex-row gap-3'>
                                      <div className='flex flex-col'>
                                        <span className='text-md font-semibold'>Atenção!</span>
                                        <h4 className='text-xs'>Não será possível editar essa mensagem. Escreva com carinho.</h4>
                                      </div>
                                      <div className='flex justify-center items-center h-auto w-auto'>
                                        <Button
                                          type="submit"
                                          className='bg-secundaria-t text-white font-normal rounded-md hover:bg-secundaria-light hover:text-secundaria-t'
                                        >
                                          Enviar
                                        </Button>
                                      </div>
                                    </div>
                                  </form>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}

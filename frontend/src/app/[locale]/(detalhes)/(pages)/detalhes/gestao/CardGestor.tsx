import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { GraduationCap, Hash, Mail, MailIcon, MessageSquareText, User, X } from 'lucide-react'
import React, { Fragment, useState } from 'react'
import { Manager } from '../domain/interfaces/IManager'
import { FaInstagram, FaUser, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import Image from 'next/image'

interface CardGestorProps {
  info: any;
}

function CardGestor({ info }: CardGestorProps) {
  let [isInfoOpen, setIsInfoOpen] = useState(false)

  const handleModal = () => {
    setIsInfoOpen(!isInfoOpen)
  }

  return (
    <>
      <a className='flex items-center z-10 cursor-pointer' onClick={handleModal}>
        <div className='h-auto w-full rounded-lg bg-theme-bg p-1'>
          <div className='flex flex-col h-full w-full rounded-lg items-end justify-end bg-black px-5 py-2'>
            <h1 className='text-secundaria-extralight text-xl mb-4'>{info.positions.name}</h1>
            <div className='flex gap-2 mb-1'>
              <FaInstagram className='w-5 h-5' color='#fff' />
              <Mail className='w-5 h-5' color='#fff' />
              <FaXTwitter className='w-5 h-5' color='#fff' />
            </div>
            <div className='rounded-xl bg-theme-bg'>
              <img className='w-48 h-48 rounded-sm' src={info.image} alt='Atleta' draggable='false' />
            </div>
            <div className='flex flex-1 justify-center w-full mt-3'>
              <h1 className='whitespace-nowrap text-lg font-normal text-theme-bg'>{info.name}</h1>
            </div>
          </div>
        </div>
      </a>
      <Transition appear show={isInfoOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={handleModal}>
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
            <div className="flex min-h-full items-center justify-center text-center gap-1">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-background pt-6 text-left align-middle shadow-xl transition-all">
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
                      className="text-4xl font-bold leading-6 text-black"
                    >
                      {info.name.toUpperCase()}
                    </motion.h1>
                    <button
                      type="button"
                      className="text-black"
                      onClick={handleModal}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex flex-row gap-56 mt-2 px-8">
                    <div className="w-[100px]">
                      <div className="flex justify-center items-end clip-pentagon bg-black/100 w-72 h-96 rounded-lg drop-shadow-xl">
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
                          className='absolute h-[400px]' src={info.image} alt="Atleta"
                        />
                      </div>
                    </div>
                    <div className='flex flex-col w-full px-3 text-lg'>
                      <div className='flex items-center text-black font-medium mt-8 gap-4'>
                        <FaUser />
                        {info.positions.name}
                      </div>
                      <div className='flex items-center text-black font-medium mt-8 gap-4'>
                        <GraduationCap />
                        {info.course}
                      </div>
                      <div className='flex items-center text-black font-medium mt-8 gap-4'>
                        <Hash />
                        {info.reg_number}
                      </div>
                      <div className='flex items-center text-black font-medium mt-8 gap-4'>
                        <FaWhatsapp />
                        {info.contact_number}
                      </div>
                      <div className='flex items-center text-black font-medium mt-8 gap-4'>
                        <MailIcon />
                        {info.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-14 h-28 bg-black">
                    <Image
                      height={90}
                      width={90}
                      src='/logo.png'
                      alt=""
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CardGestor

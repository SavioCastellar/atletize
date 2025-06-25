'use client'
import { Container } from '@/app/[locale]/(landing-page)/components/Container'
import { BookText, BriefcaseBusiness, Contact, Hourglass, HourglassIcon, Medal, PartyPopper, Sparkles, SquareUserRound, Star } from 'lucide-react'
import ActivityButton from './ActivityButton'
import { Button } from '@/app/shared/components/Button'
import { motion } from 'framer-motion'
import { MENSAGEM_CONVITE, NOME_ATLETICA_ABREVIADO, NOME_ATLETICA_COMPLETO } from '@/app/constants'

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function Hero() {
  return (
    <div className='bg-background px-4'>
      <Container className='relative bg-background rounded-3xl h-[502px] border-2 border-black'>

        {/* Logo */}
        <motion.div
          className='absolute top-0 flex justify-center items-center w-full h-full bg-transparent'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='h-96' src="/logo.png" alt="Logo" />
        </motion.div>

        {/* Nome da atlética */}
        <motion.div
          className='relative h-[80px] w-[540px] bg-background -left-[2px] -top-[2px] flex justify-center items-center'
          initial={{ x: -600 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          <h1 className='text-primaria text-7xl tracking-widest -mt-10'>{NOME_ATLETICA_ABREVIADO}</h1>
          <div className='absolute left-0 -bottom-8 h-8 w-8 rounded-tl-3xl bg-transparent border-t-2 border-l-2 border-black shadow-custom-tl-bg'></div>
          <div className='absolute -right-[2px] -bottom-[2px] h-8 w-8 rounded-br-3xl bg-transparent border-b-2 border-r-2 border-black shadow-custom-br-bg'></div>
          <div className='absolute -right-8 top-0 h-8 w-8 rounded-tl-3xl bg-transparent border-t-2 border-l-2 border-black shadow-custom-tl-bg'></div>
          <div className='absolute -bottom-2 w-[480px] h-2 border-t-2 border-black bg-transparent'></div>
        </motion.div>

        {/* Navegação */}
        <div className='absolute top-0 right-4 h-full flex flex-col justify-center gap-2'>
          <ActivityButton Icon={Star} activity='Hall da Fama' href='/detalhes?tab=hall-da-fama' index={1} />
          <ActivityButton Icon={Medal} activity='Modalidades' href='/detalhes?tab=modalidades' index={2} />
          <ActivityButton Icon={BriefcaseBusiness} activity='Gestão' href='/detalhes?tab=gestao' index={3} />
          <ActivityButton Icon={PartyPopper} activity='Eventos' href='/detalhes?tab=eventos' index={4} />
          <ActivityButton Icon={BookText} activity='História' href='/historia' index={5} />
          <ActivityButton Icon={SquareUserRound} activity='Seja Sócio' href='/socios' index={6} />
        </div>

        {/* CTA */}
        <motion.div
          className='absolute left-14 gap-6 flex flex-col h-[calc(100%-80px-100px)] text-lg mt-6'
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <h1 className='text-4xl w-96'>{NOME_ATLETICA_COMPLETO}</h1>
          <h3 className='text-xl'>{MENSAGEM_CONVITE}</h3>
          <Button variant='primary' className='w-48 h-10 '>Entrar em contato</Button>
        </motion.div>

        {/* Carteirinha */}
        <motion.div
          className='absolute h-[100px] w-[320px] bg-background -left-[2px] -bottom-[2px] flex justify-center items-center pt-3 pr-3 hover:bg-zinc-100'
          initial={{ x: -600 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        >
          <div className='border-2 border-black rounded-xl w-full h-full flex justify-between overflow-hidden shadow-md'>
            <div className='flex flex-col justify-center ml-4'>
              <h3 className='text-md'>Já é sócio? Acesse sua</h3>
              <h1 className='text-2xl font-medium'>carteirinha digital</h1>
            </div>
            <a className="relative w-16 border-l-2 border-black cursor-pointer" href='/carteirinha'>
              <img className="h-full" src="/theme-bg.png" alt="BG" />
              <Contact className="absolute inset-0 w-10 h-10 m-auto" strokeWidth={1.2} color={'background'} />
            </a>
          </div>
          <div className='absolute left-0 -top-8 h-8 w-8 rounded-bl-3xl bg-transparent border-b-2 border-l-2 border-black shadow-custom-bl-bg'></div>
          <div className='absolute -right-8 bottom-0 h-8 w-8 rounded-bl-3xl bg-transparent border-b-2 border-l-2 border-black shadow-custom-bl-bg'></div>
          <div className='absolute -right-[2px] -top-[2px] h-8 w-8 rounded-tr-3xl bg-transparent border-t-2 border-r-2 border-black shadow-custom-tr-bg'></div>
          <div className='absolute -top-[2px] right-[30px] w-[260px] h-2 border-t-2 border-black bg-transparent'></div>
        </motion.div>
      </Container>
    </div>
  )
}

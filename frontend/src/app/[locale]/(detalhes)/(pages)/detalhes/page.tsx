'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HallDaFamaWrapper from './hall-da-fama/HallDaFamaWrapper'
import ModalidadesWrapper from './modalidades/ModalidadesWrapper'
import GestaoWrapper from './gestao/GestaoWrapper'
import { useSession, SessionProvider } from 'next-auth/react'

function DetalhesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const tabQuery = searchParams?.get('tab') || 'hall-da-fama'
  const tabs = ['hall-da-fama', 'modalidades', 'gestao']

  const currentIndex = tabs.indexOf(tabQuery) >= 0 ? tabs.indexOf(tabQuery) : 0

  const setTabFromIndex = (index: number) => {
    router.push(`/detalhes?tab=${tabs[index]}`)
  }

  const tabComponents = [
    <HallDaFamaWrapper setCurrentIndex={setTabFromIndex} session={session} />,
    <ModalidadesWrapper setCurrentIndex={setTabFromIndex} session={session} />,
    <GestaoWrapper setCurrentIndex={setTabFromIndex} session={session} />,
  ]

  useEffect(() => {
    if (currentIndex !== -1) {
      setTabFromIndex(currentIndex)
    }
  }, [currentIndex])

  return (
    <>{tabComponents[currentIndex]}</>
  )
}

export default function Detalhes() {
  return (
    <SessionProvider>
      <DetalhesContent />
    </SessionProvider>
  )
}

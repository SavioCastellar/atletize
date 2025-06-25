'use client'

import Providers from '@/providers/Providers'
import { Header } from '@/app/[locale]/(landing-page)/components'
import Plans from '../../components/Plans'
import { useSession } from 'next-auth/react'
import Carteirinha from '../carteirinha/page'

export default function Socios() {
  const { data: session } = useSession()

  return (
    <Providers>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#061b13] to-black">
        <Header session={session} isDark={true} />
        {session ?
          <Carteirinha /> :
          <Plans session={session} />
        }
      </div>
    </Providers>
  )
}

'use client'

import Providers from '@/providers/Providers'
import { useSession } from 'next-auth/react'
import HomeWrapper from './(landing-page)/components/HomeWrapper'

export default function LandingPage() {
  const { data: session } = useSession()

  return (
    <>
      <Providers>
        <HomeWrapper session={session} />
      </Providers>
    </>
  )
}

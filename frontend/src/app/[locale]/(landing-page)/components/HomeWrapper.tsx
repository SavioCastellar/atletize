'use client'

import useScreenSize from '@/app/shared/hooks/useScreenSize'
import dynamic from 'next/dynamic'

const HomeMobile = dynamic(() => import('./HomeMobile'))
const Home = dynamic(() => import('./Home'))

const HomeWrapper = (props: any) => {
  return useScreenSize() ?
    <HomeMobile {...props} /> :
    <Home {...props} />
}

export default HomeWrapper

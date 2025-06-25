import useScreenSize from '@/app/shared/hooks/useScreenSize'
import { Session } from 'next-auth'
import dynamic from 'next/dynamic'
import HallDaFama from './HallDaFama'

const HallDaFamaMobile = dynamic(() => import('./HallDaFamaMobile'))

interface HallDaFamaWrapperProps {
  setCurrentIndex: (index: number) => void
  session: Session | null
}

const HallDaFamaPage = ({ setCurrentIndex, session }: HallDaFamaWrapperProps) => {
  return useScreenSize() ?
    <HallDaFamaMobile setCurrentIndex={setCurrentIndex} /> :
    <HallDaFama setCurrentIndex={setCurrentIndex} session={session} />
}

export default HallDaFamaPage

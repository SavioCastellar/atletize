import useScreenSize from '@/app/shared/hooks/useScreenSize'
import dynamic from 'next/dynamic'
import Modalidades from './Modalidades'
import { Session } from 'next-auth'

const ModalidadesMobile = dynamic(() => import('./ModalidadesMobile'))

interface ModalidadesWrapperProps {
  setCurrentIndex: (index: number) => void
  session: Session | null
}

const ModalidadesPage = ({ setCurrentIndex, session }: ModalidadesWrapperProps) => {
  return useScreenSize() ?
    <ModalidadesMobile setCurrentIndex={setCurrentIndex} /> :
    <Modalidades setCurrentIndex={setCurrentIndex} session={session} />
}

export default ModalidadesPage

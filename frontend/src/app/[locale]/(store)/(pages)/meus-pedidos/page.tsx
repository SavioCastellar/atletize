import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import Providers from '@/providers/Providers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import MeusPedidos from '../../components/meus-pedidos'
import { Header } from '@/app/[locale]/(landing-page)/components'

export default async function Pedidos() {
  const session = await getServerSession(nextAuthOptions)

  if (
    !session ||
    !session.user ||
    !session.user?.email ||
    !session.user?.name
  ) {
    redirect('/signin')
  }

  const { email, name } = session.user

  return (
    <Providers>
      <Header session={session} />
      <MeusPedidos session={session} />
    </Providers>
  )
}

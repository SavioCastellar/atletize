import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { Sidebar } from '@/app/shared/components/Sidebar'
import { BottomNavigation } from '@/app/shared/components/Sidebar/BottomNavigation'
import { MainNavigation } from '@/app/shared/components/Sidebar/MainNavigation'
import Providers from '@/providers/Providers'
import { getServerSession } from 'next-auth'
import { Poppins } from 'next/font/google'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
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
    <html lang='pt-br' className='antialiased' suppressHydrationWarning>
    <body className={poppins.className}>
      <Providers>
        <div className='relative min-h-screen bg-theme-bg lg:grid lg:grid-cols-[256px_1fr]'>
          <div>
            <Sidebar
              mainNavigation={<MainNavigation />}
              bottomNavigation={<BottomNavigation />}
              name={name}
              email={email}
            />
          </div>
          <main className='bg-white flex-1 space-y-4 p-8 rounded-3xl pb- lg:mt-5 lg:mb-5 lg:mr-5'>
            {children}
            <Toaster richColors />
          </main>
        </div>
      </Providers>
    </body>
  </html>
  )
}

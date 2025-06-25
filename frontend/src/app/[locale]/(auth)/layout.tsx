import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { LogoV1 } from '@/app/shared/components/LogoV1'
import { getServerSession } from 'next-auth'
import { Poppins } from 'next/font/google'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  if (session) {
    redirect('/home')
  }
  return (
    <html lang='pt-br' className='antialiased' suppressHydrationWarning>
      <body className={poppins.className}>
        <div className='flex min-h-screen items-center justify-center bg-primary/600'>
          <div className='h-auto w-96 rounded-md bg-white text-center shadow-md'>
            <main className='my-5'>
              <div className='flex flex-col items-center justify-center'>
                <LogoV1 />
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SEO } from './SEO'
import './globals.css'
import { Toaster } from 'sonner'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from './api/auth/[...nextauth]/auth'
import NextAuthSessionProvider from '@/providers/NextAuthSessionProvider'
import Providers from '@/providers/Providers'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    template: `%s - ${SEO.title}`,
    default: SEO.title,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: SEO.verification.other,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)

  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={poppins.className}>
        <ReactQueryClientProvider>
          <NextAuthSessionProvider session={session}>
            <Providers>
              {children}
              <Toaster richColors />
              <GoogleAnalytics gaId="G-G5S67P5N42" />
            </Providers>
          </NextAuthSessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html >
  )
}

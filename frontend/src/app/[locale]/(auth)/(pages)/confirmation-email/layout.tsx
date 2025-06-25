import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang='pt-br' className='antialiased'>
      <body className={poppins.className}>
        <div className='flex min-h-screen items-center justify-center bg-primary/600 dark:bg-primary/600'>
          <div className='h-auto w-96 rounded-md bg-base/white text-center shadow-md'>
            <main className='my-5'>
              <div className='flex flex-col items-center justify-center'>
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

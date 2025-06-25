'use client';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface SuccessMessageProps {
  title: string;
  description: string;
  textButton: string;
  linkButton: string;
  redirectDelay: number;
}

export function SuccessMessage({
  title,
  description,
  textButton,
  linkButton,
  redirectDelay,
}: SuccessMessageProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(linkButton);
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [router, linkButton, redirectDelay]);

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
            <div>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green/100'>
                <CheckIcon
                  className='h-6 w-6 text-green/600'
                  aria-hidden='true'
                />
              </div>
              <div className='mt-3 text-center sm:mt-5'>
                <h3 className='text-2xl font-bold leading-6 text-gray-900'>
                  {title}
                </h3>
                <div className='mt-2'>
                  <p className='text-base text-gray-500'>{description}</p>
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-6'>
              <a
                href={linkButton}
                className='inline-flex w-full justify-center rounded-md bg-green/500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green/600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green/600'
              >
                {textButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

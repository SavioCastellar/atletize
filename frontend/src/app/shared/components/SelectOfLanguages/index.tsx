'use client';
import { Popover, Transition } from '@headlessui/react';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const languages = [
  { name: 'English', href: '/en', locale: 'en' },
  { name: 'Português', href: '/pt', locale: 'pt' },
];

export function SelectOfLanguages({
  principalLanguage,
}: {
  principalLanguage: string;
}) {
  const path = usePathname();
  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-400 outline-none'>
        <span>{principalLanguage}</span>
        <Globe className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-2'>
          <div className='w-36 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-md ring-1 ring-gray-900/5'>
            {languages.map((item) => {
              const href = path?.replace(/^\/[a-z]{2}/, item.href) || item.href;

              return (
                <Link
                  key={item.name}
                  href={href}
                  locale={item.locale}
                  className='block p-2 hover:text-primary/600'
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

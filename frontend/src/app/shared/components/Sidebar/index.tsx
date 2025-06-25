'use client';
import { Profile } from '@/app/[locale]/(users)/components/Profile';
import { LogoV2 } from '@/app/shared/components/LogoV2';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Slot } from '@radix-ui/react-slot';
import { Menu } from 'lucide-react';
import Link from 'next/link';
interface SidebarProps {
  email: string;
  name: string;
  mainNavigation: React.ReactNode;
  bottomNavigation: React.ReactNode;
}

export function Sidebar({
  email,
  name,
  mainNavigation,
  bottomNavigation,
}: SidebarProps) {
  return (
    <Collapsible.Root className='scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-300 fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 overflow-hidden bg-gray/100 py-4 pl-6 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-64 lg:overflow-auto lg:py-8'>
      <div className='flex items-center justify-center'>
        <Link href='/dashboard'>
          <LogoV2 />
        </Link>
        <Collapsible.Trigger asChild className='lg:hidden'>
          <Slot className='rounded-md shadow-none'>
            <Menu className='h-6 w-6 text-black' />
          </Slot>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        asChild
        forceMount
        className='data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade data-[state=closed]:hidden lg:data-[state=closed]:flex'
      >
        <div className='flex flex-1 flex-col gap-2'>
          {mainNavigation}

          <div className='mt-auto flex flex-col gap-6'>
            {bottomNavigation}

            <div className='h-px bg-gray/300' />
            <Profile name={name} email={email} />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

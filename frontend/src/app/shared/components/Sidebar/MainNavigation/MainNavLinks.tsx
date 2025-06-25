'use client';
import { Nav } from '@/app/shared/components/Nav';
import { LucideIcon, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ComponentType, ReactElement } from 'react';

interface MainNavLinksProps {
  item: string;
  icon: LucideIcon
  link: string;
}

export function MainNavLinks({ item, icon, link }: MainNavLinksProps) {
  const currentPath = usePathname();

  return (
    <nav className='flex flex-col gap-0.5'>
      <Nav.Root currentPath={currentPath} href={'/' + link}>
        <Nav.IconRight Icon={icon} />
        <Nav.Content content={item} />
      </Nav.Root>
    </nav>
  );
}

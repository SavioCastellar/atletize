import Link from 'next/link';
import { ReactNode } from 'react';

interface NavRootProps {
  children: ReactNode;
  href: string;
  currentPath?: string | null;
}

export function NavRoot({ children, href, currentPath }: NavRootProps) {

  const path = currentPath?.slice(3);

  return (
    <Link
      href={href}
      data-active={href === path}
      className='group flex items-center gap-3 rounded-l-xl px-8 py-3 hover:bg-white/30 active:bg-white data-[active=true]:bg-white'
    >
      {children}
    </Link>
  );
}

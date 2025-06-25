'use client';
import { UsersProvider } from '@/app/shared/contexts/UsersContext';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <UsersProvider>{children}</UsersProvider>;
}

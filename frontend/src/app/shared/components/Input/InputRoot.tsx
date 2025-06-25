import { ComponentProps, ReactNode } from 'react';

interface InputRootProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return <div className='flex flex-col items-start'>{children}</div>;
}

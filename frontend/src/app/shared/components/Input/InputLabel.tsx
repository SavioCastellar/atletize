import { ComponentProps, ReactNode } from 'react';

interface InputLabelProps extends ComponentProps<'p'> {
  children: ReactNode;
}

export function InputLabel({ children }: InputLabelProps) {
  return (
    <p className='mb-1 ml-1 text-xs font-medium text-gray-700'>{children}</p>
  );
}

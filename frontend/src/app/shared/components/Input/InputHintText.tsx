import { ComponentProps, ReactNode } from 'react';

interface InputHintTextProps extends ComponentProps<'p'> {
  children: ReactNode;
}

export function InputHintText({ children }: InputHintTextProps) {
  return <p className='ml-1 mt-1 text-xs text-gray-600'>{children}</p>;
}

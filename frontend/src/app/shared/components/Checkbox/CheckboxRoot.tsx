import { ComponentProps, ReactNode } from 'react';

interface CheckboxRootProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export function CheckboxRoot({ children, ...props }: CheckboxRootProps) {
  return (
    <div className='flex items-center gap-1' {...props}>
      {children}
    </div>
  );
}

import { ComponentProps, ReactNode } from 'react';

interface CheckboxLabelProps extends ComponentProps<'label'> {
  children: ReactNode;
}

export function CheckboxLabel({ children, ...props }: CheckboxLabelProps) {
  return (
    <label className='text-xs font-medium text-gray-700' {...props}>
      {children}
    </label>
  );
}

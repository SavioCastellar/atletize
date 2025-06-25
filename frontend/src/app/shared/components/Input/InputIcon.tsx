import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputIconProps {
  icon: ElementType;
  className?: string;
}

export function InputIcon({ icon: Icon, className }: InputIconProps) {
  return <Icon className={twMerge('h-4 w-4 text-gray-500', className)} />;
}

import { ComponentProps } from 'react';

type CheckboxIconProps = ComponentProps<'svg'>;

export function CheckboxIcon({ ...props }: CheckboxIconProps) {
  return (
    <svg
      {...props}
      className=' pointer-events-none
      absolute ml-[0.15em]
      hidden
      h-3
      w-3 text-primary/600
      peer-checked:block'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='4'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12'></polyline>
    </svg>
  );
}

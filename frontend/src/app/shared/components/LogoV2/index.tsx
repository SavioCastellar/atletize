import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { LogoV1 } from '../LogoV1';

interface LogoV2Props extends ComponentProps<'strong'> {}

export function LogoV2({ ...props }: LogoV2Props) {
  return (
    <strong
      className={twMerge(
        'mx-1 flex items-center gap-4 text-xl font-semibold text-primary/50',
        props.className
      )}
    >
      <LogoV1 width={70} height={70} />
    </strong>
  );
}

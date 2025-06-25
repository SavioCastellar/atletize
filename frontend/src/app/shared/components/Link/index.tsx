import LinkNext, { LinkProps as LinkNextProps } from 'next/link';
import { ReactNode } from 'react';

interface LinkProps extends LinkNextProps {
  children: ReactNode;
}

export function Link({ children, ...props }: LinkProps) {
  return (
    <LinkNext
      {...props}
      className={
        'text-xs font-semibold text-primary/600 hover:text-primary/800'
      }
    >
      {children}
    </LinkNext>
  );
}

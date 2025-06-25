import { twMerge } from 'tailwind-merge';

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={twMerge('mx-auto', className)}
      {...props}
    />
  );
}

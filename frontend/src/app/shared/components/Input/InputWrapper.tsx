import { Input } from '@/app/shared/components/Input';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputWrapperProps extends ComponentProps<'div'> {
  children: ReactNode;
  disabled?: boolean;
  error?: FieldError;
}

export function InputWrapper({
  error,
  children,
  disabled,
  className,
  ...props
}: InputWrapperProps) {
  return (
    <div
      data-error={!!error}
      data-disabled={disabled}
      className={twMerge(
        'focus-within:ring-offset-0: flex w-full items-center gap-2 rounded-lg border border-primary/300 px-3 py-2 shadow-sm outline-none transition duration-300 ease-in-out focus-within:border-primary/300 focus-within:ring focus-within:ring-primary/300 focus-within:ring-opacity-25 data-[error=true]:border-error/500 data-[disabled=true]:bg-gray-100 focus-within:data-[error=true]:ring-error/500 focus-within:data-[error=true]:ring-opacity-25',
        className
      )}
      {...props}
    >
      {children}

      {error && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Input.Icon className='text-error/500' icon={Info} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent color rounded-md border border-error/500 bg-error/100 bg-opacity-95 px-1 py-1 text-xs font-bold text-error/500 drop-shadow'
                sideOffset={5}
              >
                {error?.message}
                <Tooltip.Arrow className='TooltipArrow fill-error/500' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}

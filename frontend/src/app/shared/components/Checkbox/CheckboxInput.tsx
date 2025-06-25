import { ComponentProps, forwardRef } from 'react';

type CheckboxInputProps = ComponentProps<'input'>;

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        type='checkbox'
        className='checked:border-1 peer relative h-4 w-4 shrink-0 appearance-none rounded border border-gray-300 bg-white
   checked:border-primary/600 checked:bg-primary/50'
      />
    );
  }
);

CheckboxInput.displayName = 'CheckboxInput';

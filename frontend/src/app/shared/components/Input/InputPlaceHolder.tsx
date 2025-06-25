import React, { forwardRef } from 'react';

type InputPlaceHolderProps = React.ComponentProps<'input'>;

export const InputPlaceHolder = forwardRef<
  HTMLInputElement,
  InputPlaceHolderProps
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='flex-1 border-0 bg-transparent p-0 text-sm text-gray-900 placeholder-gray-500 focus:outline-none'
    />
  );
});

InputPlaceHolder.displayName = 'InputPlaceHolder';

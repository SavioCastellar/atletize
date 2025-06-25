import * as Dialog from '@radix-ui/react-dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { XCircle } from 'lucide-react';
import { ElementType, ReactNode, forwardRef } from 'react';

export interface PopupContentProps {
  children: ReactNode;
  icon: ElementType;
  onClose?: () => void;
  error?: boolean;
  disabled?: boolean;
  disabledIcon?: boolean;
  className: string;
  closeAutomatically?: boolean;
}

export const PopupContent = forwardRef<DialogProps, PopupContentProps>(
  ({ closeAutomatically = true, ...props }, ref) => {
    return (
      <Dialog.Content
        onInteractOutside={(event) => {
          !closeAutomatically ? event.preventDefault() : props.onClose?.();
        }}
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={props.className}
      >
        <div className='flex items-center justify-between'>
          <Dialog.Title className='text-xl'>
            {props.disabled || props.disabledIcon ? (
              <></>
            ) : (
              <div className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 shadow'>
                <props.icon
                  data-error={props.error}
                  className='h-8 w-6 data-[error=true]:text-error/500'
                ></props.icon>
              </div>
            )}
          </Dialog.Title>
          {props.disabled ? (
            <></>
          ) : (
            <Dialog.Close
              className='m-2 h-8 w-8 text-gray-500 underline outline-none hover:text-gray-600'
              onClick={props.onClose}
            >
              <XCircle className='h-6 w-6'></XCircle>
            </Dialog.Close>
          )}
        </div>
        {props.children}
      </Dialog.Content>
    );
  }
);
PopupContent.displayName = 'PopupContent';

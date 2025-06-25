import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PopupRootProps {
  children: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  defaultOpen?: boolean;
  className?: string;
}

export function PopupRoot({
  trigger,
  children,
  open,
  onOpenChange,
  defaultOpen,
  className,
}: PopupRootProps) {
  const handleOverlayClick = (event: React.MouseEvent) => {
    // Impede que o evento de clique no overlay feche o diálogo
    event.stopPropagation();
  };
  return (
    <div className={twMerge('flex w-full', className)}>
      <Dialog.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        {trigger ? <Dialog.Trigger>{trigger}</Dialog.Trigger> : <></>}
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={handleOverlayClick}
            className='fixed inset-0 z-50 bg-black/70'
          />
          {children}
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

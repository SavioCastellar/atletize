import { ShieldAlert } from 'lucide-react';
import { Popup } from '../Popup';

interface ErrorAlertProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ title, message, onClose }: ErrorAlertProps) {
  return (
    <Popup.Root defaultOpen={true}>
      <Popup.Content
        className='fixed left-1/2 top-1/2 z-50  h-auto w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-md bg-white p-8 text-gray-900 shadow lg:w-3/5 lg:max-w-full'
        icon={ShieldAlert}
        error={true}
        onClose={onClose}
      >
        <h1 className='mb-1 mt-2 text-base font-semibold text-gray-900'>
          {title}
        </h1>
        <p className='pr-8 text-sm font-normal text-gray-600'>{message}</p>
      </Popup.Content>
    </Popup.Root>
  );
}

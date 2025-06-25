'use client';
import { Button } from '@/app/shared/components/Button';
import { Input } from '@/app/shared/components/Input';
import { Popup } from '@/app/shared/components/Popup';
import { Toast } from '@/app/shared/components/Toast';
import { useFormspark } from '@formspark/use-formspark';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ISaveLeadsIntl } from '../domain/interfaces/ISaveLeads';

interface SaveLeadsProps {
  intl: ISaveLeadsIntl;
}

export function SaveLeads({ intl }: SaveLeadsProps) {
  const [open, setOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const [submit, submitting] = useFormspark({
    formId: process.env.NEXT_PUBLIC_FORMSPARK_ID as string,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const handlerJoinWaitlist = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!emailValue) {
      alert(intl.errorMessageToValidateEmail);
      return;
    }

    await submit({ message: emailValue });

    toast.success(intl.successMessage);
    setEmailValue('');
    setOpen(false);
  };

  return (
    <>
      <Popup.Root
        open={open}
        onOpenChange={setOpen}
        className='py-4'
        trigger={
          <a className='focus-visible:ring-primary-500 flex w-full max-w-80 items-center justify-center rounded-lg bg-primary/600 p-3 text-sm font-semibold text-white shadow-sm outline-none hover:bg-primary/700 focus-visible:ring-2 focus-visible:ring-offset-2 active:opacity-80'>
            {intl.callToActionButton}
          </a>
        }
      >
        <Popup.Content
          className='fixed left-1/2 top-1/2 z-50  h-auto w-2/5 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-md bg-white p-8 text-gray-900 shadow'
          icon={Lock}
        >
          <h1 className='mb-1 mt-2 text-base font-semibold text-gray-900'>
            {intl.callToActionButton}
          </h1>
          <form id='join-waitlist' onSubmit={handlerJoinWaitlist}>
            <div className='mt-4 w-full space-y-6 pb-2'>
              <Input.Root>
                <Input.Label>Email*</Input.Label>
                <Input.Wrapper>
                  <Input.Icon icon={Mail} />
                  <Input.PlaceHolder
                    type='text'
                    value={emailValue}
                    onChange={handleChange}
                    placeholder={'Email'}
                  />
                </Input.Wrapper>
              </Input.Root>
              <Button
                loading={submitting}
                variant='primary'
                form='join-waitlist'
                type='submit'
              >
                {intl.callToActionButton}
              </Button>
            </div>
          </form>
        </Popup.Content>
      </Popup.Root>
      <Toast />
    </>
  );
}

'use client';
import { Popup } from '@/app/shared/components/Popup';
import { AlertTriangle, BadgeAlert } from 'lucide-react';
import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { UsersContext } from '../../contexts/UsersContext';
import { IEmailToConfirmationOfAccountIntl } from '../../domain/interfaces/IEmailToConfirmationOfAccountIntl';
import { IPopupToConfirmationOfAccountIntl } from '../../domain/interfaces/IPopupToConfirmationOfAccountIntl';
import { Button } from '../Button';

interface PPopupToConfirmationOfAccount extends ComponentProps<'div'> {
  intlEmail: IEmailToConfirmationOfAccountIntl;
  intl: IPopupToConfirmationOfAccountIntl;
}

export function PopupToConfirmationOfAccount({
  intlEmail,
  intl,
  ...props
}: PPopupToConfirmationOfAccount) {
  const user = useContextSelector(UsersContext, (context) => context.user);
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(60);
  const [textButton, setTextButton] = useState(intl.button1);

  useEffect(() => {
    if (isDisabled) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setIsDisabled(false);
        setCounter(60);
      }
    }
  }, [isDisabled, counter]);

  const sendEmailToConfirmation = useCallback(async (): Promise<void> => {
    setIsDisabled(true);
    try {
      const response = await fetch('/api/email/send-confirmation-email', {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          firstName: user.first_name,
          id: user.tenant_id,
          subject: intlEmail.subject,
          intlEmail: { ...intlEmail },
        }),
      });
      setTextButton(intl.button2);
      await response.json();
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  }, [intl.button2, intlEmail, user.email, user.first_name, user.tenant_id]);

  return (
    <>
      {user.is_confirmed === false ? (
        <div
          {...props}
          className='flex w-56 items-start justify-start overflow-y-auto'
        >
          <Popup.Root open={true}>
            <Popup.Content
              className='fixed left-1/2 top-1/2 z-50  h-auto w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-md bg-white p-8 text-gray-900 shadow lg:w-3/5 lg:max-w-full'
              disabled={true}
              icon={AlertTriangle}
              closeAutomatically={false}
            >
              <div className='flex w-full flex-col items-center justify-center text-center'>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100'>
                  <BadgeAlert
                    className='h-6 w-6 text-yellow-600'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 flex flex-col items-center  justify-center sm:mt-5'>
                  <h3 className='text-base font-semibold leading-6 text-gray-900'>
                    {intl.title}
                  </h3>

                  <p className='mt-2 w-2/4 text-sm text-gray-500'>
                    {intl.hello} {user.first_name}
                    {intl.message}
                    <br />
                    <br />
                    <b>{intl.warningMessage}</b>
                  </p>
                </div>
                <div className='mt-4 w-2/4'>
                  <Button
                    onClick={sendEmailToConfirmation}
                    loading={isDisabled}
                  >
                    {textButton}
                  </Button>
                  {isDisabled && (
                    <>
                      <p>{intl.verifyMessage}</p>
                      <p>
                        {intl.awaitMessage1}
                        <b>{counter}</b>
                        {intl.awaitMessage2}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Popup.Content>
          </Popup.Root>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

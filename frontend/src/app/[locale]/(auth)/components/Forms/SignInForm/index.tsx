'use client';
import { ISignInIntl } from '@/app/[locale]/(auth)/domain/interfaces/ISignInIntl';
import { useSignin } from '@/app/[locale]/(auth)/hooks/useSignin';
import { Button } from '@/app/shared/components/Button';
import { Checkbox } from '@/app/shared/components/Checkbox';
import { ErrorAlert } from '@/app/shared/components/ErrorAlert';
import { Input } from '@/app/shared/components/Input';
import { Link } from '@/app/shared/components/Link';
import { Popup } from '@/app/shared/components/Popup';
import { Toast } from '@/app/shared/components/Toast';
import { FormInput, Lock, Mail } from 'lucide-react';

interface ISignInFormProps {
  intl: ISignInIntl;
}

export function SignInForm({ intl }: ISignInFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    onSubmit,
    setError,
    open,
    setOpen,
    emailValue,
    handleChange,
    handlerResetPassword,
  } = useSignin({ intl });

  return (
    <>
      <form
        id='signin'
        className='w-full px-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full space-y-4 pb-2'>
          <Input.Root>
            <Input.Wrapper error={errors.email}>
              <Input.Icon icon={Mail} />
              <Input.PlaceHolder
                {...register('email')}
                placeholder={intl?.form.email}
              />
            </Input.Wrapper>
          </Input.Root>
          <Input.Root>
            <Input.Wrapper error={errors.password}>
              <Input.Icon icon={FormInput} />
              <Input.PlaceHolder
                {...register('password')}
                type='password'
                placeholder={intl?.form.password}
              />
            </Input.Wrapper>
          </Input.Root>
          <Checkbox.Root>
            <Checkbox.Input {...register('stayConnected')}></Checkbox.Input>
            <Checkbox.Icon></Checkbox.Icon>
            <Checkbox.Label>{intl?.form.stayConnected}</Checkbox.Label>
          </Checkbox.Root>
        </div>

        <div className='w-full space-y-4 py-2'>
          <Button
            loading={loading}
            variant='primary'
            form='signin'
            type='submit'
          >
            {intl?.form.button}
          </Button>
        </div>
      </form>

      <Popup.Root
        open={open}
        onOpenChange={setOpen}
        className='justify-center py-4'
        trigger={
          <p className='text-xs font-semibold text-primary/600 hover:text-primary/800'>
            {intl?.form.forgotPassword}
          </p>
        }
      >
        <Popup.Content
          className='fixed left-1/2 top-1/2 z-50  h-auto w-2/5 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-md bg-white p-8 text-gray-900 shadow'
          icon={Lock}
        >
          <h1 className='mb-1 mt-2 text-base font-semibold text-gray-900'>
            {intl?.popup.title}
          </h1>
          <p className='pr-8 text-sm font-normal text-gray-600'>
            {intl?.popup.subtitle}
          </p>
          <form id='reset-password' onSubmit={handlerResetPassword}>
            <div className='mt-4 w-full space-y-6 pb-2'>
              <Input.Root>
                <Input.Label>Email*</Input.Label>
                <Input.Wrapper>
                  <Input.Icon icon={Mail} />
                  <Input.PlaceHolder
                    type='text'
                    value={emailValue}
                    onChange={handleChange}
                    placeholder={intl?.form.email}
                  />
                </Input.Wrapper>
              </Input.Root>
              <Button
                loading={loading}
                variant='primary'
                form='reset-password'
                type='submit'
              >
                {intl?.popup.button}
              </Button>
            </div>
          </form>
        </Popup.Content>
      </Popup.Root>
      <div className='align flex flex-row items-center justify-center space-x-1'>
        <p className='py-2 text-xs font-normal text-gray-600'>
          {intl?.form.noAccount}
        </p>
        <Link href={'/signup'}>{intl?.form.register}</Link>
      </div>
      {error ? (
        <ErrorAlert
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        ></ErrorAlert>
      ) : null}
      <Toast />
    </>
  );
}

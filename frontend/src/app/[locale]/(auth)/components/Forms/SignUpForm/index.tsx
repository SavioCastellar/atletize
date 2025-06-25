'use client';
import { ISignUpIntl } from '@/app/[locale]/(auth)/domain/interfaces/ISignupIntl';
import { useSignup } from '@/app/[locale]/(auth)/hooks/useSignup';
import { Button } from '@/app/shared/components/Button';
import { ErrorAlert } from '@/app/shared/components/ErrorAlert';
import { Input } from '@/app/shared/components/Input';
import { Link } from '@/app/shared/components/Link';
import { Toast } from '@/app/shared/components/Toast';
import { FormInput, Mail, User2 } from 'lucide-react';

interface ISignUpFormProps {
  intl: ISignUpIntl;
}

export function SignUpForm({ intl }: ISignUpFormProps) {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    loading,
    error,
    onSubmit,
    setError,
  } = useSignup({ intl });

  return (
    <>
      <form
        id='signup'
        className='w-full px-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full space-y-4 pb-2'>
          <Input.Root>
            <Input.Label>{intl?.form.labelName}*</Input.Label>
            <Input.Wrapper error={errors.name}>
              <Input.Icon icon={User2} />
              <Input.PlaceHolder
                {...register('name')}
                placeholder={intl?.form.placeholderName}
              />
            </Input.Wrapper>
          </Input.Root>
          <Input.Root>
            <Input.Label>{intl?.form.labelEmail}*</Input.Label>
            <Input.Wrapper error={errors.email}>
              <Input.Icon icon={Mail} />
              <Input.PlaceHolder
                {...register('email')}
                placeholder={intl?.form.placeholderEmail}
              />
            </Input.Wrapper>
          </Input.Root>
          <Input.Root>
            <Input.Label>{intl?.form.labelPassword}*</Input.Label>
            <Input.Wrapper error={errors.password}>
              <Input.Icon icon={FormInput} />
              <Input.PlaceHolder
                {...register('password')}
                type='password'
                placeholder={intl?.form.placeholderPassword}
              />
            </Input.Wrapper>
            <Input.HintText>{intl?.form.alertWarningPassword}</Input.HintText>
          </Input.Root>
          <Input.Root>
            <Input.Label>{intl?.form.labelConfirmPassword}*</Input.Label>
            <Input.Wrapper error={errors.confirm_password}>
              <Input.Icon icon={FormInput} />
              <Input.PlaceHolder
                {...register('confirm_password')}
                type='password'
                placeholder={intl?.form.placeholderConfirmPassword}
              />
            </Input.Wrapper>
          </Input.Root>

          <p className='w-80 text-xs  font-normal text-gray-500'>
            {intl?.form.messageOfPolicies}
            <Link href='terms&conditions'>
              {intl?.form.termsAndConditions}
            </Link>{' '}
            & <Link href='privacy'>{intl?.form.privacy}</Link>
          </p>
        </div>
        <div className='w-full space-y-4 py-2'>
          <Button
            loading={loading}
            variant='primary'
            form='signup'
            type='submit'
            disabled={isSubmitting}
          >
            {intl?.form.button}
          </Button>
          <div className='align flex flex-row items-center justify-center space-x-1'>
            <p className='py-2 text-xs font-normal text-gray-600'>
              {intl?.form.alreadyAccountMessage}
            </p>
            <Link href={'/signin'}>{intl?.form.alreadyAccountButton}</Link>
          </div>
        </div>
      </form>
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

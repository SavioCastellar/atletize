import { ResetPasswordForm } from '@/app/[locale]/(auth)/components/Forms/ResetPasswordForm';
import { useResetPasswordInternationalization } from '@/app/[locale]/(auth)/hooks/contents/useResetPasswordInternationalization';
import { Metadata } from 'next';

export let metadata: Metadata = {};

export default async function Password() {
  const { resetPasswordIntl } = await useResetPasswordInternationalization();

  metadata.title = resetPasswordIntl.metadata.title;

  return (
    <>
      <h1 className='pt-5 text-xl font-semibold text-gray-900'>
        {resetPasswordIntl.title}
      </h1>
      <p className='mx-10 mb-6 mt-2 text-center text-sm font-normal text-gray-600'>
        {resetPasswordIntl.headerSubtitle}
        <span className='font-semibold text-primary/700'>
          {resetPasswordIntl.subtitleWithColor}
        </span>
        {resetPasswordIntl.subtitle}
      </p>
      <ResetPasswordForm intl={resetPasswordIntl}></ResetPasswordForm>
    </>
  );
}

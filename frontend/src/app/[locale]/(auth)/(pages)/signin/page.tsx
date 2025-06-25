import { SignInForm } from '@/app/[locale]/(auth)/components/Forms/SignInForm';
import { useSigninInternationalization } from '@/app/[locale]/(auth)/hooks/contents/useSigninInternationalization';
import { Metadata } from 'next/types';

export let metadata: Metadata = {};

export default async function SignIn() {
  const { signinIntl } = await useSigninInternationalization();

  metadata.title = signinIntl.metadata.title;

  return (
    <>
      <h1 className='pt-5 text-xl font-semibold text-gray-900'>
        {signinIntl.title}
      </h1>
      <p className='mb-6 mt-2 text-sm font-normal text-gray-600'>
        {signinIntl.subtitle}
      </p>
      <SignInForm intl={signinIntl} />
    </>
  );
}

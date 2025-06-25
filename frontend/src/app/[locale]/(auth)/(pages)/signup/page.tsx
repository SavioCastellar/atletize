import { SignUpForm } from '@/app/[locale]/(auth)/components/Forms/SignUpForm';
import { useSignupInternationalization } from '@/app/[locale]/(auth)/hooks/contents/useSignupInternationalization';
import { Metadata } from 'next/types';

export let metadata: Metadata = {};

export default async function SignUp() {
  const { signupIntl } = await useSignupInternationalization();

  metadata.title = signupIntl.metadata.title;

  return (
    <>
      <h1 className='py-5 text-xl font-semibold text-gray-900'>
        {signupIntl.title}
      </h1>
      <SignUpForm intl={signupIntl}></SignUpForm>
    </>
  );
}

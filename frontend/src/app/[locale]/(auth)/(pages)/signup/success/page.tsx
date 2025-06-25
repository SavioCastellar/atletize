import { useSignupInternationalization } from '@/app/[locale]/(auth)/hooks/contents/useSignupInternationalization';
import { SuccessMessage } from '@/app/shared/components/SuccessMessage';
import { Metadata } from 'next/types';

export let metadata: Metadata = {};

export default async function SignUpSuccess() {
  const { signUpSuccessIntl } = await useSignupInternationalization();

  metadata.title = signUpSuccessIntl.metadata.title;

  return (
    <SuccessMessage
      title={signUpSuccessIntl.title}
      description={signUpSuccessIntl.description}
      textButton={signUpSuccessIntl.textButton}
      linkButton='/signin'
      redirectDelay={5000}
    />
  );
}

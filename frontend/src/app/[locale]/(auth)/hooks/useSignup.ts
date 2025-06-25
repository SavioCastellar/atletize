import {
  SignUpSchema,
  schema,
} from '@/app/[locale]/(auth)/domain/schemas/SignUp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ISignUpIntl } from '../domain/interfaces/ISignupIntl';

export const useSignup = ({ intl }: { intl: ISignUpIntl }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | {
    title: string;
    message: string;
  }>(null);
  const router = useRouter();

  const onSubmit = async (body: SignUpSchema) => {
    const { email, password, name } = body;

    setLoading(true);
    try {
      const response = await fetch('/api/users/create-users', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error('Error on register user');
      }

      setLoading(false);
      toast.success(intl?.registerSuccessMessage);
      router.replace('/signup/success');
    } catch (error) {
      setError({
        title: intl?.errors.register.title,
        message: intl?.errors.register.message,
      });
      setLoading(false);
      return;
    }
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    loading,
    error,
    onSubmit,
    setError,
  };
};

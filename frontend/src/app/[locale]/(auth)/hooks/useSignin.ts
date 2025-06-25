import {
  SignInSchema,
  schema,
} from '@/app/[locale]/(auth)/domain/schemas/SignIn';
import { supabase } from '@/app/api/auth/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ISignInIntl } from '../domain/interfaces/ISignInIntl';

export const useSignin = ({ intl }: { intl: ISignInIntl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [error, setError] = useState<null | {
    title: string;
    message: string;
  }>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const router = useRouter();

  const onSubmit = async (data: SignInSchema) => {
    const { email, password, stayConnected } = data;
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      stayConnected,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError({
        title: intl?.errors.auth.title,
        message: intl?.errors.auth.message,
      });
      return;
    }
    router.replace('/dashboard');
    toast.success(intl?.authSuccessMessage);
  };

  const handlerResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!emailValue) {
      alert('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(emailValue, {
      redirectTo: process.env.NEXT_PUBLIC_RESET_PASSWORD_URL,
    });
    setLoading(false);

    if (error) {
      setError({
        title: intl?.errors.resetPassword.title,
        message: intl?.errors.resetPassword.message,
      });
      setEmailValue('');
      return;
    }
    toast.success(intl?.resetPasswordSuccessMessage);
    setEmailValue('');
    setOpen(false);
  };

  return {
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
  };
};

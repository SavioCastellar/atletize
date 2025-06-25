import {
  ResetPasswordSchema,
  schema,
} from '@/app/[locale]/(auth)/domain/schemas/resetPassword';
import { supabase } from '@/app/api/auth/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IResetPasswordIntl } from '../domain/interfaces/IResetPasswordIntl';

export const useResetPassword = ({ intl }: { intl: IResetPasswordIntl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | {
    title: string;
    message: string;
  }>(null);

  const router = useRouter();

  const checkSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.replace('/signin');
    }
  }, [router]);

  const onSubmit = async (body: ResetPasswordSchema) => {
    await checkSession();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: body.password,
    });
    setLoading(false);
    if (error) {
      setError({
        title: intl?.errors.resetPassword.title,
        message: intl?.errors.resetPassword.message,
      });
      router.replace('/signin');
      return;
    }
    toast.success(intl?.resetPasswordSuccessMessage);

    router.replace('/signin');
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    onSubmit,
    checkSession,
    setError,
  };
};

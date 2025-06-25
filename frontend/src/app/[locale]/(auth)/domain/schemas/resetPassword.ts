import { z } from 'zod';

export const schema = z
  .object({
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
    confirm_password: z.string().nonempty('A confirme sua senha é obrigatório'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'A senha e a confirmação de senha devem ser iguais',
    path: ['confirm_password'],
  });

export type ResetPasswordSchema = z.infer<typeof schema>;

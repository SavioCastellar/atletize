import { z } from 'zod';

export const schema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email({ message: 'Insira um email válido' })
    .trim(),

  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .trim(),

  stayConnected: z.boolean(),
});

export type SignInSchema = z.infer<typeof schema>;

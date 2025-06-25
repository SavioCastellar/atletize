import { z } from "zod";

export const schema = z
  .object({
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email({ message: "Insira um email válido" })
      .trim(),

    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .trim(),

    name: z.string().nonempty("O Seu nome é obrigatório").trim(),

    confirm_password: z
      .string()
      .nonempty("A confirmação da sua senha é obrigatório")
      .trim()
      .optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "A senha e a confirmação de senha devem ser iguais",
    path: ["confirm_password"],
  });

export type SignUpSchema = z.infer<typeof schema>;

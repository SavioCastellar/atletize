import { z } from "zod"

export const ManagerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  period: z.string(),
  course: z.string().nullable(),
  reg_number: z.string().nullable(),
  contact_number: z.string().nullable(),
  position_id: z.string().nonempty("Posição é obrigatória"),
  instagram: z.string().nullable(),
  email: z.string().email("Email inválido").nullable(),
  image: z.string().nullable(),
})

export type zManagerSchema = z.infer<typeof ManagerSchema>

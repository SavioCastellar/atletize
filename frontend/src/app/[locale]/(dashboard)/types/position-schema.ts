// position-schema.ts
import { z } from "zod"

export const PositionSchema = z.object({
  name: z.string().nonempty("Nome da posição é obrigatório"),
  function_id: z.string().nonempty("Função é obrigatória"),
})

export type zPositionSchema = z.infer<typeof PositionSchema>

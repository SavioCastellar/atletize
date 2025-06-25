// types/function-schema.ts
import { z } from "zod"

export const FunctionSchema = z.object({
  name: z.string().nonempty("Nome da função é obrigatório"),
})

export type zFunctionSchema = z.infer<typeof FunctionSchema>

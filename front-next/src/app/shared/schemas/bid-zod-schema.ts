import { z } from 'zod'

const bidSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome do participante é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),

  bidValue: z
    .string()
    .min(1, { message: 'Valor inicial é obrigatório' })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'O valor inicial deve ser um número válido',
    })
    .transform(Number)
    .refine((val) => val > 0, {
      message: 'O valor inicial deve ser maior que zero',
    }),
})

export type IBidZodSchema = z.infer<typeof bidSchema>

export const useBidZodSchema = () => {
  return { bidZodSchema: bidSchema }
}

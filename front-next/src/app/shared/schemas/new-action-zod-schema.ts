import { z } from 'zod'

const parseDate = (dateString: string) => {
  const cleanedDate = dateString.replace(' as ', ' ')
  const parsedDate = new Date(cleanedDate)

  return isNaN(parsedDate.getTime()) ? null : parsedDate
}

const newAuctionSchema = z
  .object({
    itemName: z
      .string()
      .min(1, { message: 'Nome do item é obrigatório' })
      .min(3, { message: 'O nome do item deve ter pelo menos 3 caracteres' }),

    quantity: z
      .string()
      .min(1, { message: 'Quantidade é obrigatória' })
      .refine((val) => /^\d+$/.test(val), {
        message: 'A quantidade deve ser um número inteiro',
      })
      .transform(Number)
      .refine((val) => val > 0, {
        message: 'A quantidade deve ser maior que zero',
      }),

    initialPrice: z
      .string()
      .min(1, { message: 'Valor inicial é obrigatório' })
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
        message: 'O valor inicial deve ser um número válido',
      })
      .transform(Number)
      .refine((val) => val > 0, {
        message: 'O valor inicial deve ser maior que zero',
      }),

    startTime: z
      .string()
      .min(1, { message: 'Data de início é obrigatória' })
      .refine((val) => !!parseDate(val), { message: 'Data de início inválida' })
      .transform(parseDate)
      .refine((date) => date! >= new Date(Date.now()), {
        message: 'A data de início não pode ser menor que a data atual',
      }),

    endTime: z
      .string()
      .min(1, { message: 'Data de fim é obrigatória' })
      .refine((val) => !!parseDate(val), { message: 'Data de fim inválida' })
      .transform(parseDate),
  })
  .refine((data) => data.startTime! <= data.endTime!, {
    message: 'A data de início não pode ser maior que a data de fim',
    path: ['startDate'],
  })
  .refine((data) => data.endTime! > data.startTime!, {
    message: 'A data de fim deve ser maior que a data de início',
    path: ['endDate'],
  })

export type INewAuctionZodSchema = z.infer<typeof newAuctionSchema>

export const useNewAuctionZodSchema = () => {
  return { newAuctionZodSchema: newAuctionSchema }
}

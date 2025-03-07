import { isValidCPF } from '@/shared/utils/is-valid-cpf-util'
import { z } from 'zod'

const authUserZodSchema = z.object({
  cpf: z
    .string()
    .min(1, 'CPF is required')
    .length(11, 'CPF must be exactly 11 digits long')
    .regex(/^\d{11}$/, 'CPF must contain only numbers')
    .refine(isValidCPF, 'The provided CPF is invalid'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(12, 'Password cannot exceed 12 characters'),
})

export type AuthUserZodSchema = z.infer<typeof authUserZodSchema>

export { authUserZodSchema }

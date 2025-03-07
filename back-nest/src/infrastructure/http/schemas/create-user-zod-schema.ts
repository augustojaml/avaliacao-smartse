import { isValidCPF } from '@/shared/utils/is-valid-cpf-util'
import { z } from 'zod'

const createUserZodSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters long')
    .max(100, 'Full name cannot exceed 100 characters')
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      'Full name must contain only letters and spaces',
    ),

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

export type CreateUserZodSchema = z.infer<typeof createUserZodSchema>

export { createUserZodSchema }

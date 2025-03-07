import { isValidCPFHelper } from '@/app/shared/helpers/is-valid-cpf-helper'
import { z } from 'zod'

const signInTypeSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: 'CPF requerido' })
    .transform((cpf) => cpf.replace(/\D/g, ''))
    .refine((cpf) => cpf.length === 11, { message: 'CPF deve ter 11 dígitos' })
    .refine(isValidCPFHelper, { message: 'CPF inválido' }),
  password: z.string().min(1, { message: 'Password requerido' }),
})

export type ISignInZodSchema = z.infer<typeof signInTypeSchema>

export const useSignInZodSchema = () => {
  const localizedSignInZodSchema = signInTypeSchema.extend({
    password: z
      .string()
      .min(6, { message: 'Password deve ter pelo menos 6 caracteres' })
      .max(12, { message: 'Password deve ter no máximo 12 caracteres' }),
  })

  return { signInZodSchema: localizedSignInZodSchema }
}

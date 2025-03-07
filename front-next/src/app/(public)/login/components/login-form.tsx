'use client'

import { Button } from '@/app/shared/components/ui/button'
import { Input } from '@/app/shared/components/ui/input'
import { useAuth } from '@/app/shared/hooks/use-auth'
import { useToast } from '@/app/shared/providers/toast-provider'
import {
  ISignInZodSchema,
  useSignInZodSchema,
} from '@/app/shared/schemas/login-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineIdentification } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'

export const LoginForm = () => {
  const { signInZodSchema } = useSignInZodSchema()
  const [signInLoading, setSignInLoading] = useState(false)
  const { accessToken } = useAuth()

  const { showToast } = useToast()
  const { signIn } = useAuth()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInZodSchema>({
    resolver: zodResolver(signInZodSchema),
    mode: 'all',
    defaultValues: {
      cpf: '',
      password: '',
    },
  })

  const onSubmit = useCallback(async (data: ISignInZodSchema) => {
    setSignInLoading(true)
    const result = await signIn('credentials', {
      cpf: data.cpf,
      password: data.password,
      redirect: false,
    })

    if (result?.ok) {
      redirect('/')
    }

    if (result?.error) {
      showToast('UNAUTHORIZED_ERROR', 'error')
    }
    setSignInLoading(false)
  }, [])

  if (accessToken) redirect('/')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col space-y-4"
    >
      <Input
        placeholder="CPF"
        type="number"
        icon={HiOutlineIdentification}
        {...register('cpf')}
        showError={!!errors.cpf}
        error={errors.cpf?.message}
      />
      <Input
        placeholder="Senha"
        type="password"
        icon={RiLockPasswordLine}
        {...register('password')}
        showError={!!errors.password}
        error={errors.password?.message}
      />
      <Button type="submit" isLoading={signInLoading}>
        Entrar
      </Button>
    </form>
  )
}

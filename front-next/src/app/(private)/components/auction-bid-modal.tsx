'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

import { Button } from '@/app/shared/components/ui/button'
import { Input } from '@/app/shared/components/ui/input'
import { useToast } from '@/app/shared/providers/toast-provider'
import {
  IBidZodSchema,
  useBidZodSchema,
} from '@/app/shared/schemas/bid-zod-schema'
import { AxiosError } from 'axios'
import { useCreateBidMutation } from '../react-query/mutations/use-create-bid'

interface ModalBidProps {
  open: boolean
  onClose: () => void
  auctionId?: string
  participantName?: string
  onEnableBid: () => void
}

export const ModalBid = ({
  open,
  onClose,
  participantName,
  auctionId,
  onEnableBid,
}: ModalBidProps) => {
  const { bidZodSchema } = useBidZodSchema()
  const { mutateAsync: createBid, isPending } = useCreateBidMutation()
  const { showToast } = useToast()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IBidZodSchema>({
    resolver: zodResolver(bidZodSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      bidValue: 0,
    },
  })

  useEffect(() => {
    reset({
      name: participantName || '',
      bidValue: 0,
    })
  }, [participantName, reset])

  const onSubmit = async (data: IBidZodSchema) => {
    try {
      if (!auctionId) return

      await createBid({
        amount: data.bidValue,
        auctionId,
      })
      // showToast('Lance realizado com sucesso', 'success')
      reset()
      onEnableBid()

      onClose()
    } catch (error) {
      if (error && error instanceof AxiosError) {
        if (error.response?.data.errorCode === 'INVALID_BID_AMOUNT') {
          onClose()
          showToast('Valor inferior ao lance atual', 'error')
        }
      }
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="bg-cardBackground-light dark:bg-cardBackground-dark fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-textPrimary-light dark:text-textPrimary-dark text-xl font-semibold">
              Fazer um Lance
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-textSecondary-light dark:text-textSecondary-dark hover:text-primary-light">
                <FaTimes className="text-xl" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                Nome do Participante
              </label>
              <Input
                type="text"
                placeholder="Digite seu nome"
                {...register('name')}
                showError={!!errors.name}
                error={errors.name?.message}
                disabled={!!participantName}
              />
            </div>

            <div>
              <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                Valor do Lance (R$)
              </label>
              <Input
                type="text"
                placeholder="Digite o valor do lance"
                {...register('bidValue')}
                showError={!!errors.bidValue}
                error={errors.bidValue?.message}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button color="accentRed" variant="outlined">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button isLoading={isPending} onClick={handleSubmit(onSubmit)}>
              Confirmar Lance
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

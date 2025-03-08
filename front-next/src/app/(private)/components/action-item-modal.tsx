import { Button } from '@/app/shared/components/ui/button'
import { Input } from '@/app/shared/components/ui/input'
import { useWebSocket } from '@/app/shared/hooks/use-web-socket'
import { useToast } from '@/app/shared/providers/toast-provider'
import {
  INewAuctionZodSchema,
  useNewAuctionZodSchema,
} from '@/app/shared/schemas/new-action-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { useCreateAuctionMutation } from '../react-query/mutations/use-create-auction'

interface ActionItemModalProps {
  open: boolean
  onClose: () => void
}

export const ActionItemModal = ({ open, onClose }: ActionItemModalProps) => {
  const { newAuctionZodSchema } = useNewAuctionZodSchema()
  const { mutateAsync: addAction, isPending: onLoadingAddAction } =
    useCreateAuctionMutation()
  const { showToast } = useToast()

  const { socket } = useWebSocket({ options: {} })

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<INewAuctionZodSchema>({
    resolver: zodResolver(newAuctionZodSchema),
    mode: 'all',
  })

  const onSubmit = async (data: INewAuctionZodSchema) => {
    try {
      await addAction({
        itemName: data.itemName,
        quantity: data.quantity,
        initialPrice: data.initialPrice,
        startTime: data.startTime!,
        endTime: data.endTime!,
      })
      socket?.emit('new-auction', data)
      showToast('Leilão cadastrado com sucesso', 'success')
    } catch (error) {
      showToast('Falha ao cadastrar leilão', 'error')
    }
    onClose()
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="bg-cardBackground-light dark:bg-cardBackground-dark fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-textPrimary-light dark:text-textPrimary-dark text-xl font-semibold">
              Cadastrar Item de Leilão
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
                Nome do Item
              </label>
              <Input
                type="text"
                placeholder="Digite o nome do item"
                {...register('itemName')}
                showError={!!errors.itemName}
                error={errors.itemName?.message}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="w-[48%]">
                <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                  Quantidade
                </label>
                <Input
                  type="number"
                  placeholder="Digite a quantidade"
                  {...register('quantity')}
                  showError={!!errors.quantity}
                  error={errors.quantity?.message}
                />
              </div>

              <div className="w-[48%]">
                <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                  Valor Inicial (R$)
                </label>
                <Input
                  type="number"
                  placeholder="Digite o preço inicial"
                  {...register('initialPrice')}
                  showError={!!errors.initialPrice}
                  error={errors.initialPrice?.message}
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="w-[48%]">
                <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                  Data e Hora do Início
                </label>
                <Input
                  type="datetime-local"
                  placeholder="Digite a data e hora"
                  style={{ width: '99%' }}
                  {...register('startTime')}
                  showError={!!errors.startTime}
                  error={errors.startTime?.message}
                />
              </div>
              <div className="w-[48%]">
                <label className="text-textPrimary-light dark:text-textPrimary-dark text-sm">
                  Data e Hora do Fim
                </label>
                <Input
                  type="datetime-local"
                  placeholder="Digite a data e hora"
                  style={{ width: '99%' }}
                  {...register('endTime')}
                  showError={!!errors.endTime}
                  error={errors.endTime?.message}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outlined">Cancelar</Button>
            </Dialog.Close>
            <Button
              isLoading={onLoadingAddAction}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

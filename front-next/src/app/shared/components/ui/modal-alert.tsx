'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FaTimes } from 'react-icons/fa'
import { Button } from './button'

interface ModalAlertProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle: string
  cancelText?: string
  confirmText?: string
  onConfirm: () => void
}

export const ModalAlert = ({
  open,
  onClose,
  title,
  subtitle,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  onConfirm,
}: ModalAlertProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="bg-cardBackground-light dark:bg-cardBackground-dark fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-textPrimary-light dark:text-textPrimary-dark text-xl font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-textSecondary-light dark:text-textSecondary-dark hover:text-primary-light">
                <FaTimes className="text-xl" />
              </button>
            </Dialog.Close>
          </div>

          <p className="text-textSecondary-light dark:text-textSecondary-dark mb-4">
            {subtitle}
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outlined"
              color="accentRed"
              size="sm"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              variant="outlined"
              color="accentGreen"
              size="sm"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

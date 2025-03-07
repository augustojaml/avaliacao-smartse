'use client'

import { Button } from '@/app/shared/components/ui/button'
import { BiNews } from 'react-icons/bi'
import { useModalAuctionStore } from '../../../shared/store/use-modal-auction-store'
import { ActionItemModal } from '../../components/action-item-modal'
import { AuctionItemsTable } from '../../components/auction-items-table'

export default function NewAuctionPage() {
  const { isOpen, onOpenNew, onClose } = useModalAuctionStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-textPrimary-light dark:text-textPrimary-dark text-lg font-semibold">
            Gerenciamento de Itens do Leilão
          </h2>
          <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm">
            Adicione, edite e gerencie os itens disponíveis no leilão.
          </p>
        </div>
        <div className="flex items-center">
          <Button onClick={onOpenNew} icon={BiNews}>
            Adicionar
          </Button>
        </div>
      </div>

      <AuctionItemsTable />
      <ActionItemModal open={isOpen} onClose={onClose} />
    </div>
  )
}

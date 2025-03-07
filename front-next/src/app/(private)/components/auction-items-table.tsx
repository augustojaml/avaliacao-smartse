import { Button } from '@/app/shared/components/ui/button'
import { ModalAlert } from '@/app/shared/components/ui/modal-alert'
import { formatCurrencyPtBRIntl } from '@/app/shared/helpers/format-currency-ptbr-intl'
import { formatDatePtBRIntl } from '@/app/shared/helpers/format-date-ptbr-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useGetAuctionsQuery } from '../react-query/queries/use-get-auctions-query'
import { AuctionItemTableSkeleton } from './auction-items-table-skeleton'

export const AuctionItemsTable = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const { data: auctionData, isLoading: isLoadingAuctions } =
    useGetAuctionsQuery()

  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="mx-auto w-full">
      <div className="bg-cardBackground-light dark:bg-cardBackground-dark flex w-full flex-col gap-3 rounded-lg p-4 shadow-lg">
        {isLoadingAuctions && <AuctionItemTableSkeleton />}

        {!isLoadingAuctions && (
          <table className="w-full border-collapse gap-3 rounded-lg p-4 text-left text-sm shadow-lg">
            <thead className="text-textPrimary-dark bg-primary-light dark:bg-primary-dark bg-opacity-100">
              <tr>
                <th className="px-4 py-2">Nome do Item</th>
                <th className="px-4 py-2 text-center">Quantidade</th>
                <th className="px-4 py-2 text-end">Valor Inicial</th>
                <th className="px-4 py-2 text-end">Início do Leilão</th>
                <th className="px-4 py-2 text-end">Fim do Leilão</th>
              </tr>
            </thead>
            <tbody>
              {auctionData?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`dark:border-primary-light/30 border-primary-light/30 border-b ${
                    index % 2 === 0 ? 'dark:bg-secondary-dark bg-gray-50' : ''
                  }`}
                >
                  <td className="text-textPrimary-light dark:text-textPrimary-dark px-4 py-3 text-start font-medium">
                    {item.itemName}
                  </td>
                  <td className="text-textPrimary-light dark:text-textPrimary-dark px-4 py-3 text-center font-semibold">
                    {item.quantity}
                  </td>
                  <td className="text-textSecondary-light dark:text-textSecondary-dark px-4 py-3 text-end font-semibold">
                    {formatCurrencyPtBRIntl(item.initialPrice)}
                  </td>
                  <td className="text-textSecondary-light dark:text-textSecondary-dark px-4 py-3 text-end">
                    {formatDatePtBRIntl(item.startTime)}
                  </td>
                  <td className="text-textSecondary-light dark:text-textSecondary-dark px-4 py-3 text-end">
                    {formatDatePtBRIntl(item.endTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex items-center justify-end">
          <Button
            onClick={handleBack}
            icon={BsArrowLeft}
            size="sm"
            variant="outlined"
          >
            Voltar
          </Button>
        </div>
      </div>
      <ModalAlert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Atenção"
        subtitle="Tem certeza que deseja excluir esse item?"
        onConfirm={() => setOpenAlert(false)}
      />
    </div>
  )
}

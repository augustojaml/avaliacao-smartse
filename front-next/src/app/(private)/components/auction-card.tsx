'use client'

import { Button } from '@/app/shared/components/ui/button'
import { formatCurrencyPtBRIntl } from '@/app/shared/helpers/format-currency-ptbr-intl'
import { formatDatePtBRIntl } from '@/app/shared/helpers/format-date-ptbr-intl'
import { useRouter } from 'next/navigation'
import { RiAuctionFill } from 'react-icons/ri'
import { AuctionProps } from '../dtos/auctions-dto'
import { useGetMaxBidByAuctionIdQuery } from '../react-query/queries/use-get-max-bid-by-auction-id-query'
import { StatusAuctionElapsed } from './status-auction-elapsed'

const allowedStatus = ['waiting', 'closed']

interface AuctionCardProps {
  onOpenModalDetail: () => void
  auctionData: AuctionProps
  countdown?: number
}

export const AuctionCard = ({
  auctionData,
  onOpenModalDetail,
  countdown = 0,
}: AuctionCardProps) => {
  const router = useRouter()

  const { data: maxBid } = useGetMaxBidByAuctionIdQuery(auctionData.id)

  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark flex w-full flex-col gap-3 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-textPrimary-light dark:text-textPrimary-dark text-lg font-bold">
          {auctionData.itemName}
        </h2>
        <RiAuctionFill className="text-primary-light dark:text-primary-dark text-xl" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <strong className="text-sm font-semibold">Preço inicial</strong>
          <span className="text-primary-light dark:text-primary-dark text-sm">
            {formatCurrencyPtBRIntl(auctionData.initialPrice)}/
            <strong className="text-accentGreen text-xs">
              {formatCurrencyPtBRIntl(maxBid?.amount || 0)}
            </strong>
          </span>
        </div>
      </div>
      <div className="item-center flex justify-between">
        <div className="flex flex-col">
          <strong className="text-sm font-semibold">Data inicial</strong>
          <span className="text-primary-light dark:text-primary-dark text-sm">
            {formatDatePtBRIntl(auctionData.startTime)}
          </span>
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-semibold">Data Final</strong>
          <span className="text-primary-light dark:text-primary-dark text-sm">
            {formatDatePtBRIntl(auctionData.endTime)}
          </span>
        </div>
      </div>
      <StatusAuctionElapsed auction={auctionData!} />

      <div className="mt-auto flex justify-start gap-3">
        <Button
          disabled={allowedStatus.includes(auctionData.status) || countdown > 0}
          onClick={onOpenModalDetail}
          color="primary"
          size="sm"
          variant="outlined"
        >
          {countdown === 0 ? 'Dar lance' : `Aguarde ${countdown}s`}
        </Button>

        <Button
          onClick={() => router.push(`/auctions/${auctionData.id}`)}
          variant="outlined"
          size="sm"
          color="accentOrange"
        >
          Detalhes
        </Button>
      </div>
    </div>
  )
}

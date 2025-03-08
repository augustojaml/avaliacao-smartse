'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/app/shared/components/ui/button'
import { formatCurrencyPtBRIntl } from '@/app/shared/helpers/format-currency-ptbr-intl'
import { BsArrowLeft } from 'react-icons/bs'
import { AuctionSkeleton } from '../../components/auction-detail-skeleton'
import { NoBidMessage } from '../../components/no-bid-message'
import { StatusAuctionElapsed } from '../../components/status-auction-elapsed'
import { useGetAuctionByIdQuery } from '../../react-query/queries/use-get-auction-by-id-query'
import { useGetBidByAuctionIdQuery } from '../../react-query/queries/use-get-bids-by-auction-id-query'
import { useGetMaxBidByAuctionIdQuery } from '../../react-query/queries/use-get-max-bid-by-auction-id-query'

export default function AuctionDetailPage() {
  const router = useRouter()
  const { auction_id } = useParams<{ auction_id: string }>()

  const { data: auctionDetail, isLoading } = useGetAuctionByIdQuery(auction_id)
  const { data: maxBid } = useGetMaxBidByAuctionIdQuery(auction_id)

  const { data: bids, isLoading: bidsLoading } = useGetBidByAuctionIdQuery(
    auctionDetail?.id,
  )

  const handleBack = () => {
    router.back()
  }

  if (isLoading || bidsLoading || !auctionDetail) {
    return <AuctionSkeleton />
  }

  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark relative mx-auto w-full rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-end">
        <Button
          onClick={handleBack}
          icon={BsArrowLeft}
          size="sm"
          variant="outlined"
        >
          Voltar
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-textPrimary-light dark:text-textPrimary-dark text-lg font-semibold">
            {auctionDetail?.itemName}
          </h2>
          <p className="text-primary-light dark:text-primary-dark text-lg font-semibold">
            <span className="text-textPrimary-light dark:text-textPrimary-dark">
              Preço Atual
            </span>
            : {formatCurrencyPtBRIntl(auctionDetail.initialPrice)}/
            <strong className="text-accentGreen text-xs">
              {formatCurrencyPtBRIntl(maxBid?.amount || 0)}
            </strong>
          </p>

          {auctionDetail.status === 'closed' && (
            <div className="text-primary-light dark:text-primary-dark text-lg font-semibold">
              <span className="text-textPrimary-light dark:text-textPrimary-dark">
                Vencedor
              </span>
              : {maxBid?.participant.fullName}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-center space-y-2">
          <StatusAuctionElapsed auction={auctionDetail!} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="dark:bg-secondary-dark mt-2 rounded-lg bg-gray-50">
          {bids && bids.length > 0 ? (
            bids?.map((bid) => (
              <div
                key={bid.id}
                className="flex justify-between border-b border-gray-300 py-2 last:border-none dark:border-gray-700"
              >
                <span className="text-textPrimary-light dark:text-textPrimary-dark font-medium">
                  {bid.user.fullName}
                </span>
                <span className="text-accentGreen font-semibold">
                  {formatCurrencyPtBRIntl(bid.amount)}
                </span>
              </div>
            ))
          ) : (
            <NoBidMessage />
          )}
        </div>
      </div>
    </div>
  )
}

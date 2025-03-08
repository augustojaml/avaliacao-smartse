import { useStatusElapsed } from '@/app/shared/hooks/use-status-elapsed'
import { useToastBidMessage } from '@/app/shared/providers/ToastBidMessage'
import { JSX, useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'
import { AuctionProps, StatusProps } from '../dtos/auctions-dto'
import { useUpdateAuctionMutation } from '../react-query/mutations/use-update-auction'
import { useGetMaxBidByAuctionIdQuery } from '../react-query/queries/use-get-max-bid-by-auction-id-query'

interface StatusIndicatorProps {
  auction: AuctionProps
}

export const StatusAuctionElapsed = ({ auction }: StatusIndicatorProps) => {
  const { diff, status, statusBarPercent } = useStatusElapsed(
    auction.startTime,
    auction.endTime,
  )
  const { mutateAsync: updateAuction } = useUpdateAuctionMutation()

  const [currentStatus, setCurrentStatus] = useState<StatusProps>(
    () => auction.status,
  )

  const { data: maxBid } = useGetMaxBidByAuctionIdQuery(auction.id)
  const { showWinnerToast } = useToastBidMessage()

  useEffect(() => {
    if (status === currentStatus && status !== 'closed') return
    setCurrentStatus(status)

    if (status === 'closed' && maxBid && currentStatus !== 'closed') {
      showWinnerToast(
        maxBid?.participant.fullName || '',
        maxBid?.product || '',
        maxBid?.amount || 0,
      )
    }
    updateAuction({
      data: {
        status,
      },
      id: auction.id,
    })
  }, [status])

  const statusConfig: Record<
    StatusProps,
    { icon: JSX.Element; text: string; color: string }
  > = {
    waiting: {
      icon: <FaClock className="text-accentOrange" />,
      text: 'Aguardando',
      color: 'text-textSecondary-light dark:text-textSecondary-dark',
    },
    open: {
      icon: <FaCheckCircle className="text-accentGreen" />,
      text: 'Aberto',
      color: 'text-textPrimary-light dark:text-textPrimary-dark',
    },
    closed: {
      icon: <FaTimesCircle className="text-accentRed" />,
      text: 'Fechado',
      color: 'text-textSecondary-light dark:text-textSecondary-dark',
    },
  }

  const { icon, text, color } =
    statusConfig[currentStatus] || statusConfig.waiting

  return (
    <div className="my-2 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className={`${color} font-semibold`}>{text}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <FaClock className="text-primary-light dark:text-primary-dark" />
          <span className="text-textSecondary-light dark:text-textSecondary-dark">
            Tempo restante: <strong>{diff}</strong>
          </span>
        </div>

        <div className="dark:bg-secondary-dark h-2 w-full overflow-hidden rounded-full bg-gray-300">
          <div
            className={`bg-primary-light h-full rounded-full`}
            style={{ width: `${statusBarPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

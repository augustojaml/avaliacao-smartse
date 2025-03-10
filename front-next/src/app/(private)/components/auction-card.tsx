'use client'

import { Button } from '@/app/shared/components/ui/button'
import { formatCurrencyPtBRIntl } from '@/app/shared/helpers/format-currency-ptbr-intl'
import { formatDatePtBRIntl } from '@/app/shared/helpers/format-date-ptbr-intl'
import { useAuth } from '@/app/shared/hooks/use-auth'
import { useInactiveBidCountdown } from '@/app/shared/hooks/use-inactive-bid-count-down'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiAuctionFill } from 'react-icons/ri'
import { useCheckInactivityBid } from '../../shared/hooks/use-check-inactivity-bid'
import { AuctionProps } from '../dtos/auctions-dto'
import { useGetMaxBidByAuctionIdQuery } from '../react-query/queries/use-get-max-bid-by-auction-id-query'
import { ModalBid } from './auction-bid-modal'
import { StatusAuctionElapsed } from './status-auction-elapsed'

const allowedStatus = ['waiting', 'closed']

interface AuctionCardProps {
  auctionData: AuctionProps
}

export const AuctionCard = ({ auctionData }: AuctionCardProps) => {
  const router = useRouter()
  const { data: maxBid } = useGetMaxBidByAuctionIdQuery(auctionData.id)
  const { user } = useAuth()
  const [openModalBid, setOpenModalBid] = useState(false)
  const { countdown, startCountdown } = useInactiveBidCountdown()
  const [localCountdown, setLocalCountdown] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  const { globalCountdown } = useCheckInactivityBid({ auctionData })

  // Atualiza o contador local quando o contador global muda
  useEffect(() => {
    if (globalCountdown !== null && globalCountdown !== undefined) {
      setLocalCountdown(globalCountdown)
    }
  }, [globalCountdown])

  // Mantém o card visível mesmo quando o contador chega a zero
  useEffect(() => {
    if (localCountdown === 0) {
      // Em vez de desaparecer, talvez mostre uma mensagem ou mude a aparência
      // mas mantenha o card visível
      setIsVisible(true) // Mantém sempre visível
    }
  }, [localCountdown])

  const statusBackground = {
    open: 'bg-accentGreen-light',
    closed: 'bg-accentRed-light',
    waiting: 'bg-accentOrange-light',
  }

  // Se não estiver visível, não renderiza nada
  if (!isVisible) return null

  // Função segura para obter o valor da contagem regressiva
  const getCountdownValue = (): number => {
    if (localCountdown !== null && localCountdown !== undefined) {
      return localCountdown
    }
    if (globalCountdown !== null && globalCountdown !== undefined) {
      return globalCountdown
    }
    return 0 // Valor padrão se ambos forem nulos
  }

  // Verifica se temos um valor válido para exibir
  const hasValidCountdown = localCountdown !== null || globalCountdown !== null

  return (
    <div
      className={`${statusBackground[auctionData.status]} flex w-full flex-col gap-3 rounded-lg p-4 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-textPrimary-light text-lg font-bold">
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
          onClick={() => setOpenModalBid(true)}
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

        <ModalBid
          open={openModalBid}
          onClose={() => setOpenModalBid(false)}
          participantName={user?.fullName}
          auctionId={auctionData.id}
          onEnableBid={() => {
            if (auctionData.status === 'open') {
              startCountdown()
            }
          }}
        />
      </div>

      {/* Contador global de 2 minutos */}
      <div className="h-4">
        {auctionData.status === 'open' && hasValidCountdown && (
          <div className="mt-2 flex items-center text-xs text-gray-600 dark:text-gray-400">
            {getCountdownValue() === 0 ? (
              <span className="text-accentRed-light">Tempo esgotado!</span>
            ) : (
              <>
                Tempo restante para próximo lance:{' '}
                <strong className="text-primary-light dark:text-primary-dark">
                  {Math.floor(getCountdownValue() / 60)}:
                  {(getCountdownValue() % 60).toString().padStart(2, '0')}
                </strong>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

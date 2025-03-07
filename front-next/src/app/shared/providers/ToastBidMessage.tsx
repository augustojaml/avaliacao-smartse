'use client'

import { BidSocketResponseProps } from '@/app/(private)/dtos/bid-dto'
import * as Toast from '@radix-ui/react-toast'
import { useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi'
import { formatCurrencyPtBRIntl } from '../helpers/format-currency-ptbr-intl'
import { useWebSocket } from '../hooks/use-web-socket'

interface BidToastContextProps {
  showBidToast: (
    participantName: string,
    amount: number,
    type?: 'success' | 'error' | 'info' | 'warning',
  ) => void
  showWinnerToast: (
    participantName: string,
    product: string,
    amount: number,
  ) => void
}

const BidToastContext = createContext<BidToastContextProps | undefined>(
  undefined,
)

export const BidToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [openWinner, setOpenWinner] = useState(false)

  const [participantName, setParticipantName] = useState('')
  const [amount, setAmount] = useState(0)
  const [product, setProduct] = useState('')
  const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>(
    'success',
  )

  const [isMounted, setIsMounted] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showBidToast = (
    participantName: string,
    amount: number,
    type: 'success' | 'error' | 'info' | 'warning' = 'success',
  ) => {
    setParticipantName(participantName)
    setAmount(amount)
    setType(type)
    setOpen(false)
    setTimeout(() => setOpen(true), 10)
  }

  const showWinnerToast = (
    participantName: string,
    product: string,
    amount: number,
  ) => {
    setParticipantName(participantName)
    setProduct(product)
    setAmount(amount)
    setOpenWinner(false)
    setTimeout(() => setOpenWinner(true), 10)
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 15000)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (openWinner) {
      const timer = setTimeout(() => setOpenWinner(false), 15000)
      return () => clearTimeout(timer)
    }
  }, [openWinner])

  const { on, socket } = useWebSocket({ options: {} })

  useEffect(() => {
    if (socket) {
      on('broadcast', async (data: BidSocketResponseProps) => {
        showBidToast(data.user.fullName, data.amount)
        await queryClient.invalidateQueries({ queryKey: ['auctions'] })
        await queryClient.invalidateQueries({ queryKey: ['bids-details'] })
        await queryClient.invalidateQueries({ queryKey: ['max-bid'] })
      })

      // on(
      //   'auction-winner',
      //   (data: {
      //     bid: { participant: string; amount: number; product: string }
      //   }) => {
      //     showWinnerToast(
      //       data.bid.participant,
      //       data.bid.product,
      //       data.bid.amount,
      //     )
      //   },
      // )
    }
  }, [socket])

  const icons = {
    success: <FiCheckCircle className="text-accentGreen h-5 w-5" />,
    error: <FiXCircle className="text-accentRed h-5 w-5" />,
    info: <FiInfo className="text-primaryLight h-5 w-5" />,
    warning: <FiAlertTriangle className="text-accentOrange h-5 w-5" />,
  }

  const backgroundStyles = {
    success: 'bg-sidebar-light/90 dark:bg-sidebar-dark/90 text-accentGreen',
    error: 'bg-white/50 text-accentRed',
    info: 'bg-sidebar-light/90 dark:bg-sidebar-dark/90 text-primaryLight',
    warning: 'bg-sidebar-light/90 dark:bg-sidebar-dark/90 text-accentOrange',
  }

  const borderColors = {
    success: 'border-l-4 border-accentGreen',
    error: 'border-l-4 border-accentRed',
    info: 'border-l-4 border-primaryLight',
    warning: 'border-l-4 border-accentOrange',
  }

  return (
    <BidToastContext.Provider value={{ showBidToast, showWinnerToast }}>
      {children}

      {isMounted &&
        createPortal(
          <Toast.Provider swipeDirection="right">
            {/* Toast para novos lances */}
            <Toast.Root
              id="bidToast"
              open={open}
              onOpenChange={setOpen}
              className={clsx(
                'custom-toast fixed flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 shadow-lg',
                borderColors[type],
                backgroundStyles[type],
                'top-28 right-8',
              )}
            >
              {icons[type]}
              <div>
                <Toast.Title className="text-lg font-bold">
                  Novo Lance Recebido!
                </Toast.Title>
                <Toast.Description className="text-sm font-semibold">
                  {participantName} deu um lance de{' '}
                  <span className="font-bold">
                    {formatCurrencyPtBRIntl(amount)}
                  </span>
                  ! 💰
                </Toast.Description>
              </div>
              <Toast.Action asChild altText="Fechar">
                <button
                  className="ml-auto cursor-pointer text-lg font-bold"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </Toast.Action>
            </Toast.Root>

            {/* Toast para vencedor do leilão */}
            <Toast.Root
              id="winnerToast"
              open={openWinner}
              onOpenChange={setOpenWinner}
              className="custom-toast border-accentGreen bg-sidebar-light dark:bg-sidebar-dark text-accentGreen fixed top-40 right-8 flex w-full max-w-sm items-center gap-3 rounded-lg border-l-4 px-4 py-3 shadow-lg"
            >
              <FiCheckCircle className="text-accentGreen h-5 w-5" />
              <div>
                <Toast.Title className="text-lg font-bold">
                  Leilão Finalizado! 🎉
                </Toast.Title>
                <Toast.Description className="text-sm font-semibold">
                  {participantName} venceu o leilão do produto{' '}
                  <span className="font-bold">{product}</span> com um lance de{' '}
                  <span className="font-bold">
                    {formatCurrencyPtBRIntl(amount)}
                  </span>
                  ! 🏆
                </Toast.Description>
              </div>
              <Toast.Action asChild altText="Fechar">
                <button
                  className="ml-auto cursor-pointer text-lg font-bold"
                  onClick={() => setOpenWinner(false)}
                >
                  ✕
                </button>
              </Toast.Action>
            </Toast.Root>

            <Toast.Viewport className="fixed right-0 bottom-0 m-4 flex w-96 flex-col gap-2" />
          </Toast.Provider>,
          document.body,
        )}
    </BidToastContext.Provider>
  )
}

export const useToastBidMessage = () => {
  const context = useContext(BidToastContext)
  if (!context) {
    throw new Error('useToastBidMessage must be used within a BidToastProvider')
  }
  return context
}

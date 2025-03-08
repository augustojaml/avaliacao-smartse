import { useWebSocket } from '@/app/shared/hooks/use-web-socket'
import { useEffect, useState } from 'react'
import { AuctionProps } from '../../(private)/dtos/auctions-dto'
import { useUpdateAuctionMutation } from '../../(private)/react-query/mutations/use-update-auction'

interface UseCheckInactivityProps {
  auctionData: AuctionProps
}

export const useCheckInactivityBid = ({
  auctionData,
}: UseCheckInactivityProps) => {
  const { socket } = useWebSocket({ options: {} })
  const [globalCountdown, setGlobalCountdown] = useState<number | null>(null)
  const { mutateAsync: updateAuction } = useUpdateAuctionMutation()

  useEffect(() => {
    if (socket && auctionData.status === 'open') {
      socket.emit('get-auction-timer', { auctionId: auctionData.id })
      socket.emit('start-auction-timer', { auctionId: auctionData.id })

      const handleTimerSync = (data: {
        auctionId: string
        expiresAt: number | null
      }) => {
        if (data.auctionId === auctionData.id && data.expiresAt) {
          const remainingSeconds = Math.max(
            0,
            Math.floor((data.expiresAt - Date.now()) / 1000),
          )
          setGlobalCountdown(remainingSeconds)
        }
      }

      const handleTimerExpired = async (data: {
        auctionId: string
        message: string
      }) => {
        await updateAuction({
          data: {
            status: 'closed',
          },
          id: data.auctionId,
        })
        setGlobalCountdown(null)
      }

      socket.on('auction-timer-sync', handleTimerSync)
      socket.on('auction-timer-expired', handleTimerExpired)

      return () => {
        socket.off('auction-timer-sync', handleTimerSync)
        socket.off('auction-timer-expired', handleTimerExpired)
      }
    }
  }, [socket, auctionData.id, auctionData.status])

  useEffect(() => {
    if (globalCountdown === null || globalCountdown <= 0) return

    const intervalId = setInterval(() => {
      setGlobalCountdown((prev) => (prev && prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [globalCountdown])

  return { globalCountdown }
}

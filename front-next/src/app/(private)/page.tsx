'use client'

import Link from 'next/link'
import { useState } from 'react'
import { RiAuctionFill } from 'react-icons/ri'
import { Button } from '../shared/components/ui/button'
import { IsAdmin } from '../shared/components/ui/is-admin'
import { useAuth } from '../shared/hooks/use-auth'
import { ModalBid } from './components/auction-bid-modal'
import { AuctionCard } from './components/auction-card'
import { AuctionCardSkeleton } from './components/auction-card-skeleton'
import { NoAuctionMessage } from './components/no-auction-message'
import { useGetAuctionsQuery } from './react-query/queries/use-get-auctions-query'

export default function AuctionsPage() {
  const [isOpenModalBid, setIsOpenModalBid] = useState(false)
  const { user } = useAuth()
  const { data: auctionData, isLoading } = useGetAuctionsQuery()
  const [auctionId, setAuctionId] = useState<string | undefined>(undefined)
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({})

  const startCountdown = (id: string, duration = 5) => {
    setCountdowns((prev) => ({ ...prev, [id]: duration }))

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        if (prev[id] <= 1) {
          clearInterval(interval)
          return { ...prev, [id]: 0 }
        }
        return { ...prev, [id]: prev[id] - 1 }
      })
    }, 1000)
  }

  const handleOpenModalBid = (auctionId: string) => {
    setIsOpenModalBid(true)
    setAuctionId(auctionId)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-textPrimary-light dark:text-textPrimary-dark text-lg font-semibold">
            Catálogo de Leilão
          </h2>
          <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm">
            Confira os itens disponíveis e faça seu lance.
          </p>
        </div>
        <IsAdmin>
          <Link href="/auctions/admin">
            <Button icon={RiAuctionFill} className="text-sm md:text-base">
              Novo Leilão
            </Button>
          </Link>
        </IsAdmin>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <AuctionCardSkeleton key={index} />
          ))}
        </div>
      )}

      {auctionData && auctionData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {auctionData?.map((auction) => (
            <AuctionCard
              key={auction.id}
              auctionData={auction}
              onOpenModalDetail={() => handleOpenModalBid(auction.id)}
              countdown={countdowns[auction.id] ?? 0}
            />
          ))}
        </div>
      ) : (
        <NoAuctionMessage />
      )}

      <ModalBid
        open={isOpenModalBid}
        onClose={() => setIsOpenModalBid(false)}
        participantName={user?.fullName}
        auctionId={auctionId}
        onEnableBid={() => {
          if (auctionId) {
            startCountdown(auctionId)
          }
        }}
      />
    </div>
  )
}

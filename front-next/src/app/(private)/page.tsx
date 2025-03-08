'use client'

import Link from 'next/link'
import { RiAuctionFill } from 'react-icons/ri'
import { Button } from '../shared/components/ui/button'
import { IsAdmin } from '../shared/components/ui/is-admin'
import { ApiErrorMessage } from './components/api-error-message'
import { AuctionCard } from './components/auction-card'
import { AuctionCardSkeleton } from './components/auction-card-skeleton'
import { NoAuctionMessage } from './components/no-auction-message'
import { useGetAuctionsQuery } from './react-query/queries/use-get-auctions-query'

export default function AuctionsPage() {
  const { data: auctionData, isLoading, error } = useGetAuctionsQuery()

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

      {/* Exibe mensagem de erro */}
      {error && <ApiErrorMessage />}

      {/* Skeletons enquanto carrega */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <AuctionCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Exibe os leilões quando os dados estiverem carregados */}
      {!isLoading && !error && auctionData && auctionData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {auctionData.map((auction) => (
            <AuctionCard key={auction.id} auctionData={auction} />
          ))}
        </div>
      ) : (
        /* Se não houver leilões, exibe a mensagem */
        !isLoading && !error && <NoAuctionMessage />
      )}
    </div>
  )
}

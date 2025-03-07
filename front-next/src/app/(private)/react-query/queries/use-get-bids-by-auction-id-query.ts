'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useQuery } from '@tanstack/react-query'
import { bidService } from '../../services/bid-services'

export const useGetBidByAuctionIdQuery = (auctionId?: string) => {
  const { accessToken } = useAuth()
  clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  return useQuery({
    queryKey: ['bids-details', auctionId],
    queryFn: async () => {
      const bids = await bidService.getByAuctionId(auctionId ?? '')
      return bids ?? []
    },
    enabled: !!auctionId && !!accessToken,
    staleTime: 1000 * 60 * 5,
  })
}

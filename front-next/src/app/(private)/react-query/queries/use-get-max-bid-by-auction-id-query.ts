'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useQuery } from '@tanstack/react-query'
import { bidService } from '../../services/bid-services'

export const useGetMaxBidByAuctionIdQuery = (auctionId?: string) => {
  const { accessToken } = useAuth()
  clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  return useQuery({
    queryKey: ['max-bid', auctionId],
    queryFn: async () => {
      const bids = await bidService.getMaxByAuctionId(auctionId ?? '')
      return bids
    },
    enabled: !!auctionId && !!accessToken,
    staleTime: 1000 * 60 * 5,
  })
}

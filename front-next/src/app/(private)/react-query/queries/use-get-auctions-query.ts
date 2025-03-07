'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useQuery } from '@tanstack/react-query'
import { auctionsService } from '../../services/auction-services'

export const useGetAuctionsQuery = () => {
  const { accessToken } = useAuth()
  clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  return useQuery({
    queryKey: ['auctions'],
    queryFn: async () => {
      const auctions = await auctionsService.getPosts()
      return auctions ?? []
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  })
}

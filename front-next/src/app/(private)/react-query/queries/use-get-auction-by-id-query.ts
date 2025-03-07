'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useQuery } from '@tanstack/react-query'
import { auctionsService } from '../../services/auction-services'

export const useGetAuctionByIdQuery = (id: string) => {
  const { accessToken } = useAuth()
  clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  return useQuery({
    queryKey: ['auction', id],
    queryFn: async () => {
      if (!id) return null
      return await auctionsService.getById(id)
    },
    enabled: !!id && !!accessToken,
    staleTime: 1000 * 60 * 5,
  })
}

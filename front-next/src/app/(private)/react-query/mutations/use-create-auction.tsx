'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateAuctionProps } from '../../dtos/auctions-dto'
import { auctionsService } from '../../services/auction-services'

export const useCreateAuctionMutation = () => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateAuctionProps) => {
      clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return await auctionsService.create(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auctions'] })
    },
  })
}

'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICreateBidProps } from '../../dtos/bid-dto'
import { bidService } from '../../services/bid-services'

export const useCreateBidMutation = () => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ICreateBidProps) => {
      clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return await bidService.create(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bids-details'] })
      await queryClient.invalidateQueries({ queryKey: ['auctions'] })
      await queryClient.invalidateQueries({ queryKey: ['max-bid'] })
    },
  })
}

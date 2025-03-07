import { useAuth } from '@/app/shared/hooks/use-auth'
import { clientApi } from '@/app/shared/libs/axios-lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { StatusProps } from '../../dtos/auctions-dto'
import { auctionsService } from '../../services/auction-services'

interface UpdateAuctionProps {
  status: StatusProps
}

export const useUpdateAuctionMutation = () => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateAuctionProps
    }) => {
      clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return await auctionsService.update(id, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auctions'] })
    },
  })
}

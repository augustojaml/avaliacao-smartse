import { clientApi } from '@/app/shared/libs/axios-lib'
import {
  BidProps,
  BidResponse,
  BidsResponse,
  BindProps,
  ICreateBidProps,
  MaxBidProps,
  MaxBidResponse,
} from '../dtos/bid-dto'

export const bidService = {
  async getByAuctionId(auctionId: string): Promise<BidProps[]> {
    const { data } = await clientApi.get<BidsResponse>(
      `/bids?auction_id=${auctionId}`,
    )
    return data.bids
  },
  async create(data: ICreateBidProps): Promise<BindProps> {
    const { data: response } = await clientApi.post<BidResponse>('/bids', data)
    return response.bid
  },

  async getMaxByAuctionId(auctionId: string): Promise<MaxBidProps> {
    const { data } = await clientApi.get<MaxBidResponse>(
      `/bids/max?auction_id=${auctionId}`,
    )
    return data.bid
  },
}

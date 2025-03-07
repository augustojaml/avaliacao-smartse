/* eslint-disable @typescript-eslint/no-explicit-any */
import { clientApi } from '@/app/shared/libs/axios-lib'
import {
  AuctionProps,
  AuctionResponse,
  AuctionsResponse,
  CreateAuctionProps,
} from '../dtos/auctions-dto'

export const auctionsService = {
  async getPosts(): Promise<AuctionProps[]> {
    const { data } = await clientApi.get<AuctionsResponse>('/auctions')
    return data.auctions
  },

  async getById(id: string): Promise<AuctionProps> {
    const { data } = await clientApi.get<AuctionResponse>(`/auctions/${id}`)
    return data.auction
  },

  async create(data: CreateAuctionProps): Promise<AuctionProps> {
    const { data: response } = await clientApi.post<AuctionResponse>(
      '/auctions',
      data,
    )
    return response.auction
  },
  async update(id: string, data: any): Promise<AuctionProps> {
    const { data: response } = await clientApi.put<AuctionResponse>(
      `/auctions/${id}`,
      data,
    )
    return response.auction
  },
}

import { AuctionEntity } from '@/domain/entities/auctions-entity'

export interface IUpdateAuctionRequest {
  id: string
  userId: string
  status: 'waiting' | 'open' | 'closed'
}

export const acceptsStatus = ['waiting', 'open', 'closed']

export const toUpdateAuctionResponse = (auction: AuctionEntity) => {
  return {
    auction: {
      id: auction.id,
      itemName: auction.props.itemName,
      quantity: auction.props.quantity,
      initialPrice: auction.props.initialPrice,
      startTime: auction.props.startTime,
      endTime: auction.props.endTime,
      status: auction.props.status,
      creatorId: auction.props.creatorId,
    },
  }
}

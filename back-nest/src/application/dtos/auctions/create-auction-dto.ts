import { AuctionEntity } from '@/domain/entities/auctions-entity'

export interface ICreateAuctionRequest {
  itemName: string
  quantity: number
  initialPrice: number
  startTime: Date
  endTime: Date
  creatorId: string
}

export const toCreateAuctionResponse = (auction: AuctionEntity) => {
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

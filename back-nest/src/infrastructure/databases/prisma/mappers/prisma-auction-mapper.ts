import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { Auction as AuctionPrisma } from '@prisma/client'

/**
 itemName: string
  quantity: number
  initialPrice: number
  startTime: Date
  endTime: Date
 */

export const PrismaAuctionMapper = {
  toPrisma(auction: AuctionEntity) {
    return {
      id: auction.id,
      itemName: auction.props.itemName,
      quantity: auction.props.quantity,
      initialPrice: auction.props.initialPrice,
      startTime: auction.props.startTime,
      endTime: auction.props.endTime,
      status: auction.props.status,
      creatorId: auction.props.creatorId,
    }
  },
  toDomain(auction: AuctionPrisma) {
    return AuctionEntity.create(
      {
        itemName: auction.itemName,
        quantity: auction.quantity,
        initialPrice: auction.initialPrice,
        startTime: auction.startTime,
        endTime: auction.endTime,
        status: auction.status,
        creatorId: auction.creatorId,
      },
      auction.id,
    )
  },
}

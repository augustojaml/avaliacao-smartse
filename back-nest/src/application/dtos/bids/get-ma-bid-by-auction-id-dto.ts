import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { BidEntity } from '@/domain/entities/bid-entity'
import { UserEntity } from '@/domain/entities/user-entity'

export interface IGetMaxBidByAuctionIdRequest {
  userId: string
  auctionId: string
}

export const toResponseGetMaxBidByAuctionId = ({
  bid,
  user,
  auction,
}: {
  bid: BidEntity | null
  user: UserEntity | null
  auction: AuctionEntity | null
}) => ({
  bid: bid
    ? {
        id: bid.id,
        amount: bid.props.amount,
        product: auction?.props.itemName ?? null,
        participant: user?.props.fullName ?? null,
      }
    : null,
})

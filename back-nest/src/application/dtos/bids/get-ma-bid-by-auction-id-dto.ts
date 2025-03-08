import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { BidEntity } from '@/domain/entities/bid-entity'

export interface IGetMaxBidByAuctionIdRequest {
  userId: string
  auctionId: string
}

export const toResponseGetMaxBidByAuctionId = ({
  bid,
  auction,
}: {
  bid: BidEntity | null
  auction: AuctionEntity | null
}) => ({
  bid: bid
    ? {
        id: bid.id,
        amount: bid.props.amount,
        product: auction?.props.itemName ?? null,
        participant: bid.props.participant
          ? {
              id: bid.props.participant.id,
              fullName: bid.props.participant.props.fullName,
              cpf: bid.props.participant.props.cpf,
            }
          : null,
      }
    : null,
})

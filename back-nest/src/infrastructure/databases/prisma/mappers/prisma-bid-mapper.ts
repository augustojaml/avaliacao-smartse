import { BidEntity } from '@/domain/entities/bid-entity'

export const PrismaBidMapper = {
  toPrisma(bid: BidEntity) {
    return {
      id: bid.id,
      auctionId: bid.props.auctionId,
      participantId: bid.props.participantId,
      amount: bid.props.amount,
      participant: bid.props.participant,
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toDomain(bid: any) {
    return BidEntity.create(
      {
        auctionId: bid.auctionId,
        participantId: bid.participantId,
        amount: bid.amount,
        participant: bid.participant,
      },
      bid.id,
    )
  },
}

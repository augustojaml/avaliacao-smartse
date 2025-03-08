import { BidEntity } from '@/domain/entities/bid-entity'
import { UserEntity } from '@/domain/entities/user-entity'
import { Prisma } from '@prisma/client'

type BidWithUser = Prisma.BidGetPayload<{ include: { participant: true } }>

export const PrismaBidMapper = {
  toPrisma(bid: BidEntity) {
    return {
      id: bid.id,
      auctionId: bid.props.auctionId,
      participantId: bid.props.participantId,
      amount: bid.props.amount,
    }
  },
  toDomain(bid: Omit<BidWithUser, 'participant'> | BidWithUser) {
    return BidEntity.create(
      {
        auctionId: bid.auctionId,
        participantId: bid.participantId,
        amount: bid.amount,
        participant:
          'participant' in bid ? UserEntity.create(bid.participant) : undefined,
      },
      bid.id,
    )
  },
}

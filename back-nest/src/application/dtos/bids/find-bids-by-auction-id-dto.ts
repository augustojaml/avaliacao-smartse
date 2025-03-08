import { BidEntity } from '@/domain/entities/bid-entity'
import { UserEntity } from '@/domain/entities/user-entity'

export interface IFindBidsByAuctionIdRequest {
  userId: string
  auctionId: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUser = (user?: UserEntity | null) => {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    fullName: user.props.fullName,
    cpf: user.props.cpf,
  }
}

export const toFindBidByActionIdResponse = (bids: BidEntity[]) => {
  return {
    bids: bids.map((bid) => ({
      id: bid.id,
      auctionId: bid.props.auctionId,
      participantId: bid.props.participantId,
      amount: bid.props.amount,
      user: toUser(bid.props.participant),
    })),
  }
}

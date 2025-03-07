import { BidEntity } from '@/domain/entities/bid-entity'

export interface IFindBidsByAuctionIdRequest {
  userId: string
  auctionId: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUser = (user: any) => {
  return {
    id: user.id,
    fullName: user.fullName,
    cpf: user.cpf,
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

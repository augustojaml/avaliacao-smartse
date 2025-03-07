import { BidEntity } from '@/domain/entities/bid-entity'
import { UserEntity } from '@/domain/entities/user-entity'

export interface ICreateBidRequest {
  auctionId: string
  participantId: string
  amount: number
}

const toBidUserResponse = (user: UserEntity) => {
  return {
    id: user.id,
    fullName: user.props.fullName,
    cpf: user.props.cpf,
  }
}

export const toCreateBidResponse = (bid: BidEntity, user: UserEntity) => {
  return {
    bid: {
      id: bid.id,
      auctionId: bid.props.auctionId,
      participantId: bid.props.participantId,
      amount: bid.props.amount,
      user: toBidUserResponse(user),
    },
  }
}

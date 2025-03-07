import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { UserEntity } from '../../../domain/entities/user-entity'

export interface IFindAllActionsRequest {
  creatorId: string
}

const toCreatorResponse = (creator?: UserEntity | null) => {
  if (!creator) {
    return null
  }

  return {
    id: creator.id,
    name: creator.props.fullName,
    email: creator.props.cpf,
  }
}

export const toFindAllActionsResponse = (auctions: AuctionEntity[]) => {
  return {
    auctions: auctions.map((auction) => ({
      id: auction.id,
      itemName: auction.props.itemName,
      quantity: auction.props.quantity,
      initialPrice: auction.props.initialPrice,
      startTime: auction.props.startTime,
      endTime: auction.props.endTime,
      status: auction.props.status,
      creatorId: auction.props.creatorId,
      creator: toCreatorResponse(auction.props.creator),
    })),
  }
}

import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { BidEntity } from '@/domain/entities/bid-entity'
import { UserEntity } from '@/domain/entities/user-entity'
import { faker } from '@faker-js/faker'

interface ICreateFakeAuctionProps {
  quantity?: number
  initialPrice?: number
  startTime?: Date
  endTime?: Date
  creatorId?: string
  creator?: UserEntity
  bids?: BidEntity[]
}

export const createAuctionFaker = ({
  quantity = 1,
  initialPrice = 100,
  startTime = new Date(),
  endTime = new Date(),
  creatorId,
  creator,
}: ICreateFakeAuctionProps = {}) => {
  const newAuction = {
    itemName: faker.commerce.productName(),
    quantity,
    initialPrice,
    startTime,
    endTime,
    creatorId,
    creator: creator ?? null,
  }

  return newAuction
}

export const createEntityAuctionFaker = ({
  quantity = 1,
  initialPrice = 100,
  startTime = new Date(),
  endTime = new Date(),
  creatorId,
  creator,
}: ICreateFakeAuctionProps = {}) => {
  const auctionEntity = AuctionEntity.create({
    itemName: faker.commerce.productName(),
    quantity,
    initialPrice,
    startTime,
    endTime,
    creatorId: creatorId!,
    creator: creator ?? null,
  })

  return auctionEntity
}

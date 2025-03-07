import {
  IGetMaxBidByAuctionIdRequest,
  toResponseGetMaxBidByAuctionId,
} from '@/application/dtos/bids/get-ma-bid-by-auction-id-dto'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { BidsRepository } from '@/domain/repositories/bids-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetMaxBidByAuctionIdUserCase {
  constructor(
    private usersRepository: UsersRepository,
    private bidsRepository: BidsRepository,
    private auctionRepository: AuctionsRepository,
  ) {}

  async execute(bidData: IGetMaxBidByAuctionIdRequest) {
    const findUser = await this.usersRepository.findById(bidData.userId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const findBids = await this.bidsRepository.findMaxValued(bidData.auctionId)

    const findAuction = await this.auctionRepository.findById(bidData.auctionId)

    if (!findAuction) {
      throw new ResourceNotFoundError()
    }

    return toResponseGetMaxBidByAuctionId({
      bid: findBids,
      user: findUser,
      auction: findAuction,
    })
  }
}

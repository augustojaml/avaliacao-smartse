import {
  ICreateBidRequest,
  toCreateBidResponse,
} from '@/application/dtos/bids/create-bid-dto'
import { InvalidBidAmountError } from '@/domain/errors/i.nvalid-bid-amount-error'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { BidsRepository } from '@/domain/repositories/bids-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'
import { BidEntity } from '../../../domain/entities/bid-entity'

@Injectable()
export class CreateBidUserCase {
  constructor(
    private usersRepository: UsersRepository,
    private auctionsRepository: AuctionsRepository,
    private bidsRepository: BidsRepository,
  ) {}

  async execute(bidData: ICreateBidRequest) {
    const findUser = await this.usersRepository.findById(bidData.participantId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const findAuction = await this.auctionsRepository.findById(
      bidData.auctionId,
    )

    if (!findAuction) {
      throw new ResourceNotFoundError()
    }

    const findMaxBidValue = await this.bidsRepository.findMaxValued(
      bidData.auctionId,
    )

    if (
      (findMaxBidValue && findMaxBidValue.props.amount >= bidData.amount) ||
      findAuction.props.initialPrice > bidData.amount
    ) {
      throw new InvalidBidAmountError()
    }

    const bindEntity = BidEntity.create({
      auctionId: bidData.auctionId,
      participantId: bidData.participantId,
      amount: bidData.amount,
    })

    const bid = await this.bidsRepository.create(bindEntity)

    return toCreateBidResponse(bid, findUser, findAuction)
  }
}

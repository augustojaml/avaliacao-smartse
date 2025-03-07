import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

import { InvalidStatusTypeError } from '@/domain/errors/invalid-status-type-error'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'
import {
  acceptsStatus,
  IUpdateAuctionRequest,
  toUpdateAuctionResponse,
} from '../../dtos/auctions/update-auction-dto'

@Injectable()
export class UpdateAuctionStatusUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private auctionsRepository: AuctionsRepository,
  ) {}

  async execute(auctionData: IUpdateAuctionRequest) {
    const findUser = await this.usersRepository.findById(auctionData.userId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    if (!acceptsStatus.includes(auctionData.status)) {
      throw new InvalidStatusTypeError()
    }

    const findAuction = await this.auctionsRepository.findById(auctionData.id)

    if (!findAuction) {
      throw new ResourceNotFoundError()
    }

    findAuction.props.status = auctionData.status

    const updateAction = await this.auctionsRepository.updateStatus(findAuction)

    if (!updateAction) {
      throw new ResourceNotFoundError()
    }

    return toUpdateAuctionResponse(updateAction)
  }
}

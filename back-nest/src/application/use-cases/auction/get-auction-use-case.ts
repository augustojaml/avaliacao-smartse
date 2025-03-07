import {
  IGetAuctionRequest,
  toGetAuctionResponse,
} from '@/application/dtos/auctions/get-auction-dto'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAuctionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private auctionsRepository: AuctionsRepository,
  ) {}

  async execute(auctionsData: IGetAuctionRequest) {
    const findUser = await this.usersRepository.findById(auctionsData.creatorId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const auctionRepo = await this.auctionsRepository.findById(
      auctionsData.auctionId,
    )

    if (!auctionRepo) {
      throw new ResourceNotFoundError()
    }

    return toGetAuctionResponse(auctionRepo)
  }
}

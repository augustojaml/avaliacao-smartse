import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'
import {
  ICreateAuctionRequest,
  toCreateAuctionResponse,
} from '../../dtos/auctions/create-auction-dto'
@Injectable()
export class CreateAuctionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private auctionsRepository: AuctionsRepository,
  ) {}

  async execute(auctionData: ICreateAuctionRequest) {
    const findUser = await this.usersRepository.findById(auctionData.creatorId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const auctionEntity = AuctionEntity.create(auctionData)

    const auctionRepo = await this.auctionsRepository.create(auctionEntity)

    return toCreateAuctionResponse(auctionRepo)
  }
}

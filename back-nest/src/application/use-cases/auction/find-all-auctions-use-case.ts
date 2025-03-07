import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'
import {
  IFindAllActionsRequest,
  toFindAllActionsResponse,
} from '../../dtos/auctions/find-all-auctions-dto'

@Injectable()
export class FindAllActionsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private auctionsRepository: AuctionsRepository,
  ) {}

  async execute(auctionsData: IFindAllActionsRequest) {
    const findUser = await this.usersRepository.findById(auctionsData.creatorId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const auctionRepo = await this.auctionsRepository.findAll()

    return toFindAllActionsResponse(auctionRepo)
  }
}

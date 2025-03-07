import {
  IFindBidsByAuctionIdRequest,
  toFindBidByActionIdResponse,
} from '@/application/dtos/bids/find-bids-by-auction-id-dto'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { BidsRepository } from '@/domain/repositories/bids-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindBidsByAuctionIdUserCase {
  constructor(
    private usersRepository: UsersRepository,
    private bidsRepository: BidsRepository,
  ) {}

  async execute(bidData: IFindBidsByAuctionIdRequest) {
    const findUser = await this.usersRepository.findById(bidData.userId)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const findBids = await this.bidsRepository.findBidsByAuctionId(
      bidData.auctionId,
    )

    return toFindBidByActionIdResponse(findBids)
  }
}

import { GetMaxBidByAuctionIdUserCase } from '@/application/use-cases/bids/get-max-bid-by-auction-id-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import {
  Controller,
  Get,
  HttpCode,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'

@Controller('/bids/max')
export class GetMaxBidByAuctionIdController {
  constructor(private readonly findBids: GetMaxBidByAuctionIdUserCase) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(@Query('auction_id') auctionId: string, @Request() req) {
    const participantId = req.user.sub

    const result = await this.findBids.execute({
      userId: participantId,
      auctionId,
    })

    return result
  }
}

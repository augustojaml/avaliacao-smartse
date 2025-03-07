import { FindBidsByAuctionIdUserCase } from '@/application/use-cases/bids/find-bids-by-auction-id-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import {
  Controller,
  Get,
  HttpCode,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'

@Controller('/bids')
export class FindAllBidsByAuctionIdController {
  constructor(private readonly findBids: FindBidsByAuctionIdUserCase) {}

  @Get()
  @HttpCode(200) // Código 200 para GET (201 é para criação)
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

import { UpdateAuctionStatusUseCase } from '@/application/use-cases/auction/update-auction-status-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'

@Controller('/auctions')
export class UpdateAuctionStatusController {
  constructor(private readonly updateAuction: UpdateAuctionStatusUseCase) {}

  @Put(':auction_id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body() body: { status: 'waiting' | 'open' | 'closed' },
    @Param('auction_id') auctionId: string,
    @Request() req,
  ) {
    const { status } = body
    const creatorId = req.user.sub

    const updateAction = await this.updateAuction.execute({
      id: auctionId,
      userId: creatorId,
      status,
    })

    return updateAction
  }
}

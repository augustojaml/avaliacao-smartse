import { GetAuctionUseCase } from '@/application/use-cases/auction/get-auction-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import {
  Controller,
  Get,
  HttpCode,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common'

@Controller('/auctions')
export class GetAuctionByIdController {
  constructor(private readonly getAction: GetAuctionUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(@Param('id') id: string, @Request() req) {
    const creatorId = req.user.sub

    const auction = await this.getAction.execute({
      creatorId,
      auctionId: id,
    })

    return auction
  }
}

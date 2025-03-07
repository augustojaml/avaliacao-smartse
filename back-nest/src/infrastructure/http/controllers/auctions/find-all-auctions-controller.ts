import { FindAllActionsUseCase } from '@/application/use-cases/auction/find-all-auctions-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common'

@Controller('/auctions')
export class FindAllAuctionsController {
  constructor(private readonly findAllAuctions: FindAllActionsUseCase) {}

  @Get()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async handle(@Request() req) {
    const creatorId = req.user.sub

    const actions = await this.findAllAuctions.execute({
      creatorId,
    })

    return actions
  }
}

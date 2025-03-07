import { CreateAuctionUseCase } from '@/application/use-cases/auction/create-auction-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import {
  createAuctionSchema,
  CreateAuctionZodSchema,
} from '../../schemas/create-auction-zod-schema'

@Controller('/auctions')
export class CreateAuctionsController {
  constructor(private readonly createAuction: CreateAuctionUseCase) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createAuctionSchema))
  async handle(@Body() body: CreateAuctionZodSchema, @Request() req) {
    const { itemName, quantity, initialPrice, startTime, endTime } = body
    const creatorId = req.user.sub

    const auction = {
      itemName,
      quantity,
      initialPrice,
      startTime,
      endTime,
      creatorId,
    }

    const createdAuction = await this.createAuction.execute(auction)

    return createdAuction
  }
}

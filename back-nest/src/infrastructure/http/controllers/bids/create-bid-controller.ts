import { CreateBidUserCase } from '@/application/use-cases/bids/create-bid-use-case'
import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import { SocketIoGatewayService } from '@/domain/services/socket-io-gateway-service'
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
  createBidZodSchema,
  CreateBidZodSchema,
} from '../../schemas/create-bid-zod-schema'

/**
auctionId: auctionCreated.id,
participantId: userCreated.id,
amount: 1500,
 */

@Controller('/bids')
export class CreateBidController {
  constructor(
    private readonly createBid: CreateBidUserCase,
    private readonly socketIO: SocketIoGatewayService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createBidZodSchema))
  async handle(@Body() body: CreateBidZodSchema, @Request() req) {
    const { auctionId, amount } = body
    const participantId = req.user.sub

    const result = await this.createBid.execute({
      auctionId,
      participantId,
      amount,
    })

    this.socketIO.sendBidToAll(result.bid)
    return result
  }
}

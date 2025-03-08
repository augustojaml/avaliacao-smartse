import { BidEntity } from '@/domain/entities/bid-entity'
import { BidsRepository } from '@/domain/repositories/bids-interface'
import { PrismaService } from '@/domain/services/prisma-service'
import { Injectable } from '@nestjs/common'
import { PrismaBidMapper } from '../mappers/prisma-bid-mapper'

@Injectable()
export class PrismaBidsRepository implements BidsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(bid: BidEntity): Promise<BidEntity> {
    const newBid = await this.prisma.bid.create({
      data: PrismaBidMapper.toPrisma(bid),
    })

    return PrismaBidMapper.toDomain(newBid)
  }

  async findMaxValued(auctionId: string): Promise<BidEntity | null> {
    const maxBid = await this.prisma.bid.findFirst({
      where: { auctionId },
      orderBy: { amount: 'desc' },
      include: {
        participant: true,
      },
    })

    return maxBid ? PrismaBidMapper.toDomain(maxBid) : null
  }

  async findBidsByAuctionId(auctionId: string): Promise<BidEntity[]> {
    const bids = await this.prisma.bid.findMany({
      where: {
        auctionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        participant: true,
      },
    })

    return bids.map(PrismaBidMapper.toDomain)
  }
}

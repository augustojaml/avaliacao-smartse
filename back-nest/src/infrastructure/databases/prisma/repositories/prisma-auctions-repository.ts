import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { PrismaService } from '@/domain/services/prisma-service'
import { Injectable } from '@nestjs/common'
import { PrismaAuctionMapper } from '../mappers/prisma-auction-mapper'

@Injectable()
export class PrismaAuctionsRepository implements AuctionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(auction: AuctionEntity): Promise<AuctionEntity> {
    const newAuction = await this.prisma.auction.create({
      data: PrismaAuctionMapper.toPrisma(auction),
    })
    return PrismaAuctionMapper.toDomain(newAuction)
  }

  async findById(id: string): Promise<AuctionEntity | null> {
    const findAuction = await this.prisma.auction.findUnique({
      where: {
        id,
      },
    })

    if (!findAuction) {
      return null
    }

    return PrismaAuctionMapper.toDomain(findAuction)
  }

  async findAll(): Promise<AuctionEntity[]> {
    const findAllAuctions = await this.prisma.auction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return findAllAuctions.map(PrismaAuctionMapper.toDomain)
  }

  async updateStatus(auction: AuctionEntity): Promise<AuctionEntity | null> {
    const findAuction = await this.prisma.auction.update({
      where: {
        id: auction.id,
      },
      data: {
        status: auction.props.status,
        endTime: auction.props.endTime,
      },
    })

    if (!findAuction) {
      return null
    }

    return PrismaAuctionMapper.toDomain(findAuction)
  }
}

import { AuctionEntity } from '@/domain/entities/auctions-entity'
import { AuctionsRepository } from '@/domain/repositories/auction-interface'

export class InMemoryAuctionsRepository implements AuctionsRepository {
  public items: AuctionEntity[] = []
  create(auction: AuctionEntity): Promise<AuctionEntity> {
    this.items.push(auction)
    return Promise.resolve(auction)
  }

  findById(id: string): Promise<AuctionEntity | null> {
    const findAuction = this.items.find((auction) => auction.id === id)
    return Promise.resolve(findAuction ?? null)
  }

  async findAll(): Promise<AuctionEntity[]> {
    return Promise.resolve(this.items)
  }

  updateStatus(auction: AuctionEntity): Promise<AuctionEntity | null> {
    const auctionIndex = this.items.findIndex((item) => item.id === auction.id)

    if (auctionIndex === -1) {
      return Promise.resolve(null)
    }

    this.items[auctionIndex] = auction // Atualiza o leilão na lista

    return Promise.resolve(this.items[auctionIndex])
  }
}

import { BidEntity } from '@/domain/entities/bid-entity'
import { BidsRepository } from '@/domain/repositories/bids-interface'

export class InMemoryBidsRepository implements BidsRepository {
  public items: BidEntity[] = []
  async create(bids: BidEntity): Promise<BidEntity> {
    this.items.push(bids)
    return Promise.resolve(bids)
  }

  findMaxValued(auctionId: string): Promise<BidEntity | null> {
    const findMaxBid = this.items
      .filter((bid) => bid.props.auctionId === auctionId) // Filtra lances do leilão
      .reduce(
        (maxBid, currentBid) =>
          currentBid.props.amount > (maxBid?.props.amount ?? 0)
            ? currentBid
            : maxBid,
        null as BidEntity | null,
      )

    return Promise.resolve(findMaxBid)
  }

  async findBidsByAuctionId(auctionId: string): Promise<BidEntity[]> {
    const bids = this.items.filter((bid) => bid.props.auctionId === auctionId)
    return Promise.resolve(bids)
  }
}

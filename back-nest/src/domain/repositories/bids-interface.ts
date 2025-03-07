// eslint-disable-next-line prettier/prettier
import { BidEntity } from '@/domain/entities/bid-entity';

export abstract class BidsRepository {
  abstract create(bid: BidEntity): Promise<BidEntity>
  abstract findMaxValued(auctionId: string): Promise<BidEntity | null>
  abstract findBidsByAuctionId(auctionId: string): Promise<BidEntity[]>
}

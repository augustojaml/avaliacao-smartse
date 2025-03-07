// eslint-disable-next-line prettier/prettier
import { AuctionEntity } from '@/domain/entities/auctions-entity';

export abstract class AuctionsRepository {
  abstract create(auction: AuctionEntity): Promise<AuctionEntity>
  abstract findById(id: string): Promise<AuctionEntity | null>
  abstract findAll(): Promise<AuctionEntity[]>
  abstract updateStatus(auction: AuctionEntity): Promise<AuctionEntity | null>
}

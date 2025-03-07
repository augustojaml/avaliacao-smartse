import { BaseEntity } from '@/domain/abstracts/base-entity'
import { Optional } from '@/shared/types/optional'
import { UserEntity } from './user-entity'

interface IAuctionProps {
  itemName: string
  quantity: number
  initialPrice: number
  startTime: Date
  endTime: Date
  status?: 'waiting' | 'open' | 'closed'
  creatorId: string
  creator?: UserEntity | null
  createdAt?: Date
  updatedAt?: Date
}

export class AuctionEntity extends BaseEntity<IAuctionProps> {
  private constructor(props: IAuctionProps, id?: string) {
    super(props, id)
  }

  static create(
    props: Optional<IAuctionProps, 'status' | 'creator' | 'createdAt'>,
    id?: string,
  ): AuctionEntity {
    return new AuctionEntity(
      {
        ...props,
        status: props.status ?? 'waiting',
        creator: props.creator ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}

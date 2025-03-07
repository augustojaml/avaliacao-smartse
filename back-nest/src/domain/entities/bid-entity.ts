import { BaseEntity } from '@/domain/abstracts/base-entity'
import { Optional } from '@/shared/types/optional'
import { UserEntity } from './user-entity'

interface IBidProps {
  auctionId: string
  participantId: string
  amount: number
  createdAt?: Date
  updatedAt?: Date
  participant?: UserEntity | null
}

export class BidEntity extends BaseEntity<IBidProps> {
  private constructor(props: IBidProps, id?: string) {
    super(props, id)
  }

  static create(
    props: Optional<IBidProps, 'participant' | 'createdAt'>,
    id?: string,
  ): BidEntity {
    return new BidEntity(
      {
        ...props,
        participant: props.participant ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}

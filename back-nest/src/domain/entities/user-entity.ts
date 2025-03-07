import { BaseEntity } from '@/domain/abstracts/base-entity'
import { Optional } from '@/shared/types/optional'

interface IUserProps {
  fullName: string
  cpf: string
  password: string
  role?: 'admin' | 'user'
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends BaseEntity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  static create(
    props: Optional<IUserProps, 'role' | 'createdAt' | 'updatedAt'>,
    id?: string,
  ): UserEntity {
    return new UserEntity(
      {
        ...props,
        role: props.role ?? 'user',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }
}

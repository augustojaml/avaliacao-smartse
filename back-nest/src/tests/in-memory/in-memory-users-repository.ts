import { UserEntity } from '@/domain/entities/user-entity'
import { UsersRepository } from '@/domain/repositories/users-interface'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserEntity[] = []

  async create(user: UserEntity): Promise<UserEntity> {
    this.items.push(user)
    return Promise.resolve(user)
  }

  async findByCpf(cpf: string): Promise<UserEntity | null> {
    const findUser = this.items.find((user) => user.props.cpf === cpf)
    return Promise.resolve(findUser ?? null)
  }

  async findById(id: string): Promise<UserEntity | null> {
    const findUser = this.items.find((user) => user.id === id)
    return Promise.resolve(findUser ?? null)
  }
}

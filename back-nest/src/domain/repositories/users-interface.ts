// eslint-disable-next-line prettier/prettier
import { UserEntity } from '@/domain/entities/user-entity';

export abstract class UsersRepository {
  abstract create(user: UserEntity): Promise<UserEntity>
  abstract findByCpf(cpf: string): Promise<UserEntity | null>
  abstract findById(id: string): Promise<UserEntity | null>
}

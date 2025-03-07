import { UserEntity } from '@/domain/entities/user-entity'
import { User as UserPrisma } from '@prisma/client'

export const PrismaUserMapper = {
  toPrisma(user: UserEntity) {
    return {
      id: user.id,
      fullName: user.props.fullName,
      cpf: user.props.cpf,
      password: user.props.password,
      role: user.props.role,
    }
  },
  toDomain(user: UserPrisma) {
    return UserEntity.create(
      {
        fullName: user.fullName,
        cpf: user.cpf,
        password: user.password,
        role: user.role,
      },
      user.id,
    )
  },
}

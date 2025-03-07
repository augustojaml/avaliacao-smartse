import { UserEntity } from '@/domain/entities/user-entity'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { PrismaService } from '@/domain/services/prisma-service'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })
    return PrismaUserMapper.toDomain(newUser)
  }

  async findByCpf(cpf: string): Promise<UserEntity | null> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!findUser) {
      return null
    }

    return PrismaUserMapper.toDomain(findUser)
  }

  async findById(id: string): Promise<UserEntity | null> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!findUser) {
      return null
    }

    return PrismaUserMapper.toDomain(findUser)
  }
}

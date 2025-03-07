import { ResourceAlreadyExistsError } from '@/domain/errors/resource-already-exists-error'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { PasswordService } from '@/domain/services/password-services'
import { Injectable } from '@nestjs/common'
import { UserEntity } from '../../../domain/entities/user-entity'
import {
  ICreateUserRequest,
  toCreateUserResponse,
} from '../../dtos/users/create-user-dto'

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(userData: ICreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByCpf(userData.cpf)

    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError()
    }

    const hashPassword = await this.passwordService.hashPassword(
      userData.password,
    )

    const userEntity = UserEntity.create({
      fullName: userData.fullName,
      cpf: userData.cpf,
      password: hashPassword,
    })

    const userRepo = await this.usersRepository.create(userEntity)

    return toCreateUserResponse(userRepo)
  }
}

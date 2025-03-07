import {
  IAuthUserRequest,
  toAuthUserResponse,
} from '@/application/dtos/users/auth-user-dto'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { PasswordService } from '@/domain/services/password-services'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(authData: IAuthUserRequest) {
    const findUser = await this.usersRepository.findByCpf(authData.cpf)

    if (!findUser) {
      throw new UnauthorizedError()
    }

    const isValidPassword = await this.passwordService.comparePasswords(
      authData.password,
      findUser.props.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedError()
    }

    return toAuthUserResponse(findUser)
  }
}

import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { PasswordService } from '@/domain/services/password-services'

import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { AuthUserUseCase } from './auth-user-use-case'

let userRepo: InMemoryUsersRepository
let passwordService: PasswordService
let sut: AuthUserUseCase

describe('AuthUserUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    passwordService = new PasswordService()
    sut = new AuthUserUseCase(userRepo, passwordService)
  })

  it('should be able to authenticate a user with valid credentials', async () => {
    const hashPassword = await passwordService.hashPassword('123456')
    const userEntity = createEntityUserFaker({ password: hashPassword })

    await userRepo.create(userEntity)

    const authUser = await sut.execute({
      cpf: userEntity.props.cpf,
      password: '123456',
    })

    expect(authUser).toHaveProperty('user')
    expect(authUser.user).toMatchObject({
      fullName: userEntity.props.fullName,
      cpf: userEntity.props.cpf,
      role: userEntity.props.role,
    })
  })

  it('should not be able to create a new user with invalid cpf', async () => {
    const hashPassword = await passwordService.hashPassword('123456')
    const userEntity = createEntityUserFaker({ password: hashPassword })

    await userRepo.create(userEntity)

    await expect(async () =>
      sut.execute({
        cpf: 'invalid-cpf',
        password: '123456',
      }),
    ).rejects.instanceOf(UnauthorizedError)
  })

  it('should not be able to create a new user with invalid password', async () => {
    const hashPassword = await passwordService.hashPassword('123456')
    const userEntity = createEntityUserFaker({ password: hashPassword })

    await userRepo.create(userEntity)

    await expect(async () =>
      sut.execute({
        cpf: userEntity.props.cpf,
        password: 'invalid-password',
      }),
    ).rejects.instanceOf(UnauthorizedError)
  })
})

import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceAlreadyExistsError } from '@/domain/errors/resource-already-exists-error'
import { PasswordService } from '@/domain/services/password-services'
import { createUserFaker } from '@/tests/factories/create-users.faker'
import { CreateUserUseCase } from './create-user-use-case'

let userRepo: InMemoryUsersRepository
let passwordService: PasswordService
let sut: CreateUserUseCase

describe('CreateUserUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    passwordService = new PasswordService()
    sut = new CreateUserUseCase(userRepo, passwordService)
  })

  it('should be able to create a new user', async () => {
    const newUser = createUserFaker()

    const userCreated = await sut.execute(newUser)

    expect(userCreated).toHaveProperty('user')
    expect(userCreated.user).toMatchObject({
      fullName: newUser.fullName,
      cpf: newUser.cpf,
      role: newUser.role,
    })
  })

  it('should not be able to create a new user if user already exists', async () => {
    const newUser = createUserFaker()

    await sut.execute(newUser)

    await expect(() => sut.execute(newUser)).rejects.instanceOf(
      ResourceAlreadyExistsError,
    )
  })
})

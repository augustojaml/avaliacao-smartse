import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { createEntityAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { FindAllActionsUseCase } from './find-all-auctions-use-case'

let userRepo: InMemoryUsersRepository
let auctionRepo: InMemoryAuctionsRepository
let sut: FindAllActionsUseCase

describe('FindAllActionsUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    sut = new FindAllActionsUseCase(userRepo, auctionRepo)
  })

  it('should be able to find all actions', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const auctionCreated = await auctionRepo.create(
      createEntityAuctionFaker({
        creatorId: userCreated.id,
        creator: userCreated,
      }),
    )
    await auctionRepo.create(
      createEntityAuctionFaker({
        creatorId: userCreated.id,
        creator: userCreated,
      }),
    )

    const actions = await sut.execute({ creatorId: userCreated.id })

    expect(actions.auctions.length).toBe(2)
    expect(actions.auctions[0]).toMatchObject({
      itemName: auctionCreated.props.itemName,
      quantity: auctionCreated.props.quantity,
      creator: {
        id: userCreated.id,
        name: userCreated.props.fullName,
        email: userCreated.props.cpf,
      },
    })
  })

  it('should not be able to find all actions with invalid creatorId', async () => {
    await expect(async () => {
      await sut.execute({ creatorId: 'invalid-user-id' })
    }).rejects.instanceOf(UnauthorizedError)
  })
})

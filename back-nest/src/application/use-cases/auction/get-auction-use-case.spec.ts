import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { createEntityAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { GetAuctionUseCase } from './get-auction-use-case'

let userRepo: InMemoryUsersRepository
let auctionRepo: InMemoryAuctionsRepository

let sut: GetAuctionUseCase

describe('GetAuctionUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    sut = new GetAuctionUseCase(userRepo, auctionRepo)
  })

  it('should be able to get action by id', async () => {
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

    const response = await sut.execute({
      creatorId: userCreated.id,
      auctionId: auctionCreated.id,
    })

    expect(response).toHaveProperty('auction')
    expect(response.auction).toMatchObject({
      itemName: auctionCreated.props.itemName,
      quantity: auctionCreated.props.quantity,
      creator: {
        name: userCreated.props.fullName,
        email: userCreated.props.cpf,
      },
    })
  })

  it('should not be able to find all actions with invalid creatorId', async () => {
    await expect(async () => {
      await sut.execute({
        creatorId: 'invalid-user-id',
        auctionId: 'invalid-id',
      })
    }).rejects.instanceOf(UnauthorizedError)
  })
  it('should not be able to find all actions with invalid auctionId', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    await expect(async () => {
      await sut.execute({
        creatorId: userCreated.id,
        auctionId: 'invalid-id',
      })
    }).rejects.instanceOf(ResourceNotFoundError)
  })
})

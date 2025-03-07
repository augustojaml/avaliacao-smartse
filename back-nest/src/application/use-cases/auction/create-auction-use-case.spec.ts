import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { createAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { CreateAuctionUseCase } from './create-auction-use-case'

let userRepo: InMemoryUsersRepository
let auctionRepo: InMemoryAuctionsRepository
let sut: CreateAuctionUseCase

describe('CreateUserUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    sut = new CreateAuctionUseCase(userRepo, auctionRepo)
  })

  it('should be able to create a new action', async () => {
    const newUser = createEntityUserFaker()

    const userCreated = await userRepo.create(newUser)

    const createdAuction = createAuctionFaker()

    const auctionCreated = await sut.execute({
      ...createdAuction,
      creatorId: userCreated.id,
    })

    expect(auctionCreated).toHaveProperty('auction')
    expect(auctionCreated.auction).toMatchObject({
      itemName: createdAuction.itemName,
      quantity: createdAuction.quantity,
      initialPrice: createdAuction.initialPrice,
      startTime: createdAuction.startTime,
      endTime: createdAuction.endTime,
      creatorId: userCreated.id,
    })
  })

  it('should not be able to create a new action with invalid creatorId', async () => {
    const createdAuction = createAuctionFaker()

    await expect(async () => {
      await sut.execute({
        ...createdAuction,
        creatorId: 'invalid-id',
      })
    }).rejects.instanceOf(UnauthorizedError)
  })
})

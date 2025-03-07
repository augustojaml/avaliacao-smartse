import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidBidAmountError } from '@/domain/errors/i.nvalid-bid-amount-error'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { createEntityAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { InMemoryBidsRepository } from '@/tests/in-memory/in-memory-bids-repository'
import { CreateBidUserCase } from './create-bid-use-case'

let userRepo: InMemoryUsersRepository
let auctionRepo: InMemoryAuctionsRepository
let bidRepo: InMemoryBidsRepository
let sut: CreateBidUserCase

describe('CreateBidUserCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    bidRepo = new InMemoryBidsRepository()
    sut = new CreateBidUserCase(userRepo, auctionRepo, bidRepo)
  })

  it('should be able to create a new bid', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const createdAuction = createEntityAuctionFaker({
      creatorId: userCreated.id,
    })
    const auctionCreated = await auctionRepo.create(createdAuction)

    const bidCreated = await sut.execute({
      auctionId: auctionCreated.id,
      participantId: userCreated.id,
      amount: 1500,
    })

    expect(bidCreated).toHaveProperty('bid')
    expect(bidCreated.bid).toMatchObject({
      auctionId: expect.any(String),
      participantId: expect.any(String),
      amount: expect.any(Number),
    })
  })

  it('should not be able to create a new bid with invalid user', async () => {
    await expect(async () =>
      sut.execute({
        auctionId: 'invalid-auction-id',
        participantId: 'invalid-participant-id',
        amount: 1500,
      }),
    ).rejects.instanceOf(UnauthorizedError)
  })

  it('should not be able to create a new bid with invalid auction', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    await expect(async () =>
      sut.execute({
        auctionId: 'invalid-auction-id',
        participantId: userCreated.id,
        amount: 1500,
      }),
    ).rejects.instanceOf(ResourceNotFoundError)
  })

  it('It should not be possible to place a bid with a value less than or equal to the highest bid placed.', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const createdAuction = createEntityAuctionFaker({
      creatorId: userCreated.id,
    })
    const auctionCreated = await auctionRepo.create(createdAuction)

    await sut.execute({
      auctionId: auctionCreated.id,
      participantId: userCreated.id,
      amount: 1500,
    })

    await expect(async () =>
      sut.execute({
        auctionId: auctionCreated.id,
        participantId: userCreated.id,
        amount: 1499,
      }),
    ).rejects.instanceOf(InvalidBidAmountError)
  })
})

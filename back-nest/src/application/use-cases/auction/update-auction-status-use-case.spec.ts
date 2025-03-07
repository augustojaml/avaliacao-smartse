import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidStatusTypeError } from '@/domain/errors/invalid-status-type-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { createEntityAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { UpdateAuctionStatusUseCase } from './update-auction-status-use-case'

let userRepo: InMemoryUsersRepository
let auctionRepo: InMemoryAuctionsRepository
let sut: UpdateAuctionStatusUseCase

describe('UpdateAuctionStatusUseCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    sut = new UpdateAuctionStatusUseCase(userRepo, auctionRepo)
  })

  it('should be able to update a action status to waiting', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const newAuction = createEntityAuctionFaker({ creatorId: userCreated.id })
    const auctionCreated = await auctionRepo.create(newAuction)
    const updatedAction = await sut.execute({
      userId: userCreated.id,
      id: auctionCreated.id,
      status: 'waiting',
    })
    expect(updatedAction).toHaveProperty('auction')
    expect(updatedAction.auction.status).toEqual('waiting')
  })

  it('should be able to update a action status to closed', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const newAuction = createEntityAuctionFaker({ creatorId: userCreated.id })
    const auctionCreated = await auctionRepo.create(newAuction)
    const updatedAction = await sut.execute({
      userId: userCreated.id,
      id: auctionCreated.id,
      status: 'closed',
    })
    expect(updatedAction).toHaveProperty('auction')
    expect(updatedAction.auction.status).toEqual('closed')
  })

  it('should not be able to update action with invalid creatorId', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const newAuction = createEntityAuctionFaker({ creatorId: userCreated.id })
    const auctionCreated = await auctionRepo.create(newAuction)

    await expect(async () => {
      await sut.execute({
        userId: 'invalid-id',
        id: auctionCreated.id,
        status: 'waiting',
      })
    }).rejects.instanceOf(UnauthorizedError)
  })

  it('should not be able to update action with invalid status type', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const newAuction = createEntityAuctionFaker({ creatorId: userCreated.id })
    const auctionCreated = await auctionRepo.create(newAuction)

    await expect(async () => {
      await sut.execute({
        userId: userCreated.id,
        id: auctionCreated.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: 'invalid-status' as any,
      })
    }).rejects.instanceOf(InvalidStatusTypeError)
  })
})

import { InMemoryUsersRepository } from '@/tests/in-memory/in-memory-users-repository'

import { beforeEach, describe, expect, it } from 'vitest'

import { BidEntity } from '@/domain/entities/bid-entity'
import { createEntityAuctionFaker } from '@/tests/factories/create-auctions.faker'
import { createEntityUserFaker } from '@/tests/factories/create-users.faker'
import { InMemoryAuctionsRepository } from '@/tests/in-memory/in-memory-auctions-repository'
import { InMemoryBidsRepository } from '@/tests/in-memory/in-memory-bids-repository'
import { GetMaxBidByAuctionIdUserCase } from './get-max-bid-by-auction-id-use-case'

let userRepo: InMemoryUsersRepository
let bidRepo: InMemoryBidsRepository
let auctionRepo: InMemoryAuctionsRepository
let sut: GetMaxBidByAuctionIdUserCase

describe('GetMaxBidByAuctionIdUserCase Unit Tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    bidRepo = new InMemoryBidsRepository()
    auctionRepo = new InMemoryAuctionsRepository()
    sut = new GetMaxBidByAuctionIdUserCase(userRepo, bidRepo, auctionRepo)
  })

  it('should be able to create a new bid', async () => {
    const newUser = createEntityUserFaker()
    const userCreated = await userRepo.create(newUser)

    const createdAuction = createEntityAuctionFaker({
      creatorId: userCreated.id,
    })
    const auctionCreated = await auctionRepo.create(createdAuction)

    await bidRepo.create(
      BidEntity.create({
        auctionId: auctionCreated.id,
        participantId: userCreated.id,
        amount: 150,
        participant: userCreated,
      }),
    )

    await bidRepo.create(
      BidEntity.create({
        auctionId: auctionCreated.id,
        participantId: userCreated.id,
        amount: 350,
        participant: userCreated,
      }),
    )

    await bidRepo.create(
      BidEntity.create({
        auctionId: auctionCreated.id,
        participantId: userCreated.id,
        amount: 30,
        participant: userCreated,
      }),
    )

    const response = await sut.execute({
      auctionId: auctionCreated.id,
      userId: userCreated.id,
    })

    expect(response).toHaveProperty('bid')
    expect(response.bid).toMatchObject({
      amount: 350,
    })
  })
})

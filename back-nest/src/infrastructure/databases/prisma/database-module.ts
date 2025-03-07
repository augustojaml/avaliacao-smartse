import { AuctionsRepository } from '@/domain/repositories/auction-interface'
import { BidsRepository } from '@/domain/repositories/bids-interface'
import { UsersRepository } from '@/domain/repositories/users-interface'
import { PrismaService } from '@/domain/services/prisma-service'
import { Module } from '@nestjs/common'
import { PrismaAuctionsRepository } from './repositories/prisma-auctions-repository'
import { PrismaBidsRepository } from './repositories/prisma-bids-repository'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: AuctionsRepository, useClass: PrismaAuctionsRepository },
    { provide: BidsRepository, useClass: PrismaBidsRepository },
  ],
  exports: [PrismaService, UsersRepository, AuctionsRepository, BidsRepository],
})
export class DatabaseModule {}

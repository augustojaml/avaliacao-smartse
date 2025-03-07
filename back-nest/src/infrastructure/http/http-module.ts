import { CreateAuctionUseCase } from '@/application/use-cases/auction/create-auction-use-case'
import { FindAllActionsUseCase } from '@/application/use-cases/auction/find-all-auctions-use-case'
import { GetAuctionUseCase } from '@/application/use-cases/auction/get-auction-use-case'
import { UpdateAuctionStatusUseCase } from '@/application/use-cases/auction/update-auction-status-use-case'
import { CreateBidUserCase } from '@/application/use-cases/bids/create-bid-use-case'
import { FindBidsByAuctionIdUserCase } from '@/application/use-cases/bids/find-bids-by-auction-id-use-case'
import { GetMaxBidByAuctionIdUserCase } from '@/application/use-cases/bids/get-max-bid-by-auction-id-use-case'
import { AuthUserUseCase } from '@/application/use-cases/users/auth-user-use-case'
import { CreateUserUseCase } from '@/application/use-cases/users/create-user-use-case'
import { DomainModule } from '@/domain/domain-module'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databases/prisma/database-module'
import { CreateAuctionsController } from './controllers/auctions/create-auction-controller'
import { FindAllAuctionsController } from './controllers/auctions/find-all-auctions-controller'
import { GetAuctionByIdController } from './controllers/auctions/get-auction-controller'
import { UpdateAuctionStatusController } from './controllers/auctions/update-auction-status-controller'
import { CreateBidController } from './controllers/bids/create-bid-controller'
import { FindAllBidsByAuctionIdController } from './controllers/bids/find-all-bids-by-auction-id-controller'
import { GetMaxBidByAuctionIdController } from './controllers/bids/get-max-bid-by-auction-id-controller'
import { AuthUserController } from './controllers/users/auth-user-controller'
import { CreateUserController } from './controllers/users/create-user-controller'
@Module({
  imports: [DatabaseModule, DomainModule],
  controllers: [
    CreateUserController,
    AuthUserController,
    CreateAuctionsController,
    FindAllAuctionsController,
    GetAuctionByIdController,
    UpdateAuctionStatusController,
    CreateBidController,
    FindAllBidsByAuctionIdController,
    GetMaxBidByAuctionIdController,
  ],
  providers: [
    CreateUserUseCase,
    AuthUserUseCase,
    CreateAuctionUseCase,
    FindAllActionsUseCase,
    GetAuctionUseCase,
    UpdateAuctionStatusUseCase,
    CreateBidUserCase,
    FindBidsByAuctionIdUserCase,
    GetMaxBidByAuctionIdUserCase,
  ],
})
export class HttpModule {}

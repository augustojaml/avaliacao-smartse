import { JwtAuthGuard } from '@/domain/guard/jwt-auth-guard'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthService } from './services/jwt-auth-guard-service'
import { PasswordService } from './services/password-services'
import { SocketIoGatewayService } from './services/socket-io-gateway-service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    PasswordService,
    JwtAuthService,
    JwtAuthGuard,
    SocketIoGatewayService,
  ],
  exports: [
    PasswordService,
    JwtAuthService,
    JwtAuthGuard,
    JwtModule,
    SocketIoGatewayService,
  ],
})
export class DomainModule {}

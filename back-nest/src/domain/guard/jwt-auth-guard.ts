import { JwtAuthService } from '@/domain/services/jwt-auth-guard-service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const user = this.jwtAuthService.validateToken(request)

    request.user = user

    return true
  }
}

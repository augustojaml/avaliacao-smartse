import { AuthUserUseCase } from '@/application/use-cases/users/auth-user-use-case'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import {
  AuthUserZodSchema,
  authUserZodSchema,
} from '../../schemas/auth-user-zod-schema'

@Controller('/sessions')
export class AuthUserController {
  constructor(
    private readonly authUser: AuthUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authUserZodSchema))
  async handle(@Body() body: AuthUserZodSchema) {
    const { cpf, password } = body

    const result = await this.authUser.execute({
      cpf,
      password,
    })

    const accessToken = this.jwtService.sign({
      sub: result.user.id,
    })

    return {
      access_token: accessToken,
      user: result.user,
    }
  }
}

import { CreateUserUseCase } from '@/application/use-cases/users/create-user-use-case'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import {
  CreateUserZodSchema,
  createUserZodSchema,
} from '../../schemas/create-user-zod-schema'

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserZodSchema))
  async handle(@Body() body: CreateUserZodSchema) {
    const { fullName, cpf, password } = body

    const result = await this.createUser.execute({
      fullName,
      cpf,
      password,
    })
    return result
  }
}

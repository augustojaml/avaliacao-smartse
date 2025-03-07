import { UserEntity } from '@/domain/entities/user-entity'

export interface IAuthUserRequest {
  cpf: string
  password: string
}

export const toAuthUserResponse = (user: UserEntity) => {
  return {
    user: {
      id: user.id,
      fullName: user.props.fullName,
      cpf: user.props.cpf,
      role: user.props.role,
    },
  }
}

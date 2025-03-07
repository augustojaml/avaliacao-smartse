import { UserEntity } from '../../../domain/entities/user-entity'

export interface ICreateUserRequest {
  fullName: string
  cpf: string
  password: string
}

export const toCreateUserResponse = (user: UserEntity) => {
  return {
    user: {
      id: user.id,
      fullName: user.props.fullName,
      cpf: user.props.cpf,
      role: user.props.role,
    },
  }
}

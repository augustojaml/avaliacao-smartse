import { UserEntity } from '@/domain/entities/user-entity'
import { faker } from '@faker-js/faker'

interface ICreateFakeUserProps {
  role?: 'admin' | 'user'
  password?: string
}

export const createUserFaker = ({
  role = 'user',
  password = '123456',
}: ICreateFakeUserProps = {}) => {
  const newUser = {
    fullName: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    password,
    role,
  }

  return newUser
}

export const createEntityUserFaker = ({
  role = 'user',
  password = '123456',
}: ICreateFakeUserProps = {}) => {
  const userEntity = UserEntity.create({
    fullName: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    role,
    password,
  })

  return userEntity
}

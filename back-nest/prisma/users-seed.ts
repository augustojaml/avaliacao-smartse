import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
const saltRounds = 10 // Defining a fixed salt value

async function main() {
  const users = [
    {
      id: uuidv4(),
      fullName: 'William Anderson',
      cpf: '12345678909',
      password: await bcrypt.hash('admin123', saltRounds),
      role: Role.admin,
    },
    {
      id: uuidv4(),
      fullName: 'John Smith',
      cpf: '98765432100',
      password: await bcrypt.hash('password123', saltRounds),
      role: Role.user,
    },
    {
      id: uuidv4(),
      fullName: 'Emily Johnson',
      cpf: '11122233344',
      password: await bcrypt.hash('password123', saltRounds),
      role: Role.user,
    },
    {
      id: uuidv4(),
      fullName: 'Michael Brown',
      cpf: '55566677788',
      password: await bcrypt.hash('password123', saltRounds),
      role: Role.user,
    },
    {
      id: uuidv4(),
      fullName: 'Sophia Wilson',
      cpf: '99988877766',
      password: await bcrypt.hash('password123', saltRounds),
      role: Role.user,
    },
  ]

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  })

  console.log('Seed successfully executed')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

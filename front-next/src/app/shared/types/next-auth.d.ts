import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      fullName: string
      cpf: string
      role: string
      access_token: string
    }
  }

  interface User {
    id: string
    fullName: string
    cpf: string
    role: string
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    fullName: string
    cpf: string
    role: string
    access_token: string
  }
}

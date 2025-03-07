import axios from 'axios'
import { console } from 'inspector'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        cpf: { label: 'CPF', type: 'text', placeholder: '00000000000' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/sessions`,
            {
              cpf: credentials?.cpf,
              password: credentials?.password,
            },
          )

          const { access_token, user } = response.data

          if (user && access_token) {
            return {
              id: user.id,
              fullName: user.fullName,
              cpf: user.cpf,
              role: user.role,
              access_token,
            }
          }

          return null
        } catch (error) {
          console.error('Erro na autenticação:', error)
          throw new Error('UNAUTHORIZED_ERROR')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.fullName = user.fullName
        token.cpf = user.cpf
        token.role = user.role
        token.access_token = user.access_token
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.fullName = token.fullName
        session.user.cpf = token.cpf
        session.user.role = token.role
        session.user.access_token = token.access_token
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// necessário para evitar erro prettier/prettier

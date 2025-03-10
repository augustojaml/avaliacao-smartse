import { signIn, signOut, useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session } = useSession()

  return {
    user: session?.user,
    accessToken: session?.user?.access_token,
    signIn,
    signOut,
  }
}

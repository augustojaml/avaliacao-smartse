import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface IsAdminProps {
  children: ReactNode
}

export const IsAdmin = ({ children }: IsAdminProps) => {
  const { data: session } = useSession()

  if (session?.user?.role !== 'admin') {
    return null
  }

  return children
}

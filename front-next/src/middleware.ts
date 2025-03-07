import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

interface TokenPayload {
  exp?: number
  role?: string
}

export async function middleware(req: NextRequest) {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as TokenPayload | null

  const isAuthenticated = !!token

  const isAdmin = token?.role === 'admin'
  const isAdminRoute = req.nextUrl.pathname.includes('/admin')

  const currentTime = Math.floor(Date.now() / 1000)
  const isValidToken = token?.exp ? token.exp > currentTime : false

  if (!isAuthenticated || !isValidToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auctions/:path*', '/admin/:path*'],
}

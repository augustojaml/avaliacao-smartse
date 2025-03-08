import { jwtDecode } from 'jwt-decode'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

interface TokenPayload {
  exp?: number
  role?: string
  access_token?: string
}

interface AccessTokenPayload {
  sub?: string
  exp?: number
  iat?: number
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Obtém o token da sessão
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as TokenPayload | null

  const isAuthenticated = !!token

  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!isAuthenticated && pathname === '/login') {
    return NextResponse.next()
  }

  const protectedRoutes = ['/', '/auctions', '/admin']
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token?.access_token) {
    try {
      const decoded = jwtDecode<AccessTokenPayload>(token.access_token)
      const currentTime = Math.floor(Date.now() / 1000)

      if (decoded.exp && decoded.exp < currentTime) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auctions/:path*', '/admin/:path*', '/login'],
}

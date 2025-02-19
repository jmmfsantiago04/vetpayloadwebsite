import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If accessing /dashboard, let the page handle the redirect
  if (request.nextUrl.pathname === '/dashboard') {
    return NextResponse.next()
  }

  // Extract userId from URL for /dashboard/[userId] routes
  const userId = request.nextUrl.pathname.split('/')[2]

  // If trying to access another user's dashboard, redirect to own dashboard
  if (userId && userId !== token.id) {
    return NextResponse.redirect(new URL(`/dashboard/${token.id}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"]
} 
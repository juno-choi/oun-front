import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 보호가 필요한 경로 목록
const protectedRoutes = ['/routine', '/start']
const authRoutes = ['/login', '/login/oauth2/google?']

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const refreshToken = request.cookies.get('refresh_token')
  const path = request.nextUrl.pathname

  // 로그인이 필요한 페이지에 접근하는 경우
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // 이미 로그인된 상태에서 로그인 페이지에 접근하는 경우
  if (authRoutes.includes(path) && accessToken) {
    return NextResponse.redirect(new URL('/start', request.url))
  }

  return NextResponse.next()
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    '/routine/:path*',
    '/start/:path*',
    '/login'
  ]
} 
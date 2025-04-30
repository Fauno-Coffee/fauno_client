import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(request.nextUrl.origin);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/login',
};

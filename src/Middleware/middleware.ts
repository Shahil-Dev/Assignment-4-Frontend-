import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = {
  customer: ['/cart', '/checkout', '/orders', '/profile'],
  provider: ['/provider/dashboard', '/provider/menu', '/provider/orders'],
  admin: ['/admin', '/admin/users', '/admin/orders', '/admin/categories'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;


  const isProtectedRoute = [...protectedRoutes.customer, ...protectedRoutes.provider, ...protectedRoutes.admin].some(route =>
    pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (userRole === 'CUSTOMER' && (pathname.startsWith('/provider') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (userRole === 'PROVIDER' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/provider/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/profile/:path*',
    '/provider/:path*',
    '/admin/:path*'
  ],
};
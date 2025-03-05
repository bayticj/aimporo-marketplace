import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and required roles/permissions
const protectedRoutes = [
  {
    path: '/dashboard/admin',
    roles: ['admin'],
    permissions: []
  },
  {
    path: '/dashboard/gigs',
    roles: ['seller', 'admin'],
    permissions: ['create gigs', 'edit gigs', 'view gigs']
  },
  {
    path: '/dashboard/orders/selling',
    roles: ['seller', 'admin'],
    permissions: ['manage orders', 'view orders']
  },
  {
    path: '/dashboard/orders/buying',
    roles: ['buyer', 'admin'],
    permissions: ['view orders']
  },
  {
    path: '/dashboard/earnings',
    roles: ['seller', 'admin'],
    permissions: ['view transactions']
  }
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const matchedRoute = protectedRoutes.find(route => 
    pathname.startsWith(route.path)
  );
  
  if (matchedRoute) {
    // Get the token from cookies or authorization header
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    // For client-side navigation, we'll rely on the client-side auth check
    // This is because localStorage is not accessible in middleware
    // So we'll only redirect if we're sure there's no token
    if (!token && !request.headers.get('x-middleware-skip')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    // Continue to the protected route
    return NextResponse.next();
  }
  
  // For non-protected routes, continue
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*'
  ],
}; 
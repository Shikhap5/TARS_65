import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Middleware for future authentication checks and redirects
  const path = request.nextUrl.pathname

  // Redirect to login if accessing protected routes without auth
  if (path.startsWith("/student") || path.startsWith("/admin")) {
    // In a real app, check if user is authenticated
    // For now, allow access (auth is handled client-side)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*"],
}

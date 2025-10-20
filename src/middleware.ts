// middleware.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for route protection
 * - Checks if access/refresh tokens exist in cookies
 * - Redirects unauthenticated users
 * - Restricts admin-only routes
 */
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Get cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Redirect to login if no tokens
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  // Admin-only route check
  if (pathname.startsWith("/dashboard/admin") || pathname.startsWith("/admin")) {
    try {
      // Send both cookies to backend
      const cookieHeader = [
        accessToken ? `accessToken=${accessToken}` : "",
        refreshToken ? `refreshToken=${refreshToken}` : "",
      ]
        .filter(Boolean)
        .join("; ");

      const res = await fetch(`http://localhost:5000/auth/me`, {
        method: "GET",
        headers: { cookie: cookieHeader },
      });

      // Redirect to login if backend rejects
      if (!res.ok) {
        return NextResponse.redirect(`${origin}/auth/login`);
      }

      const data = await res.json();

      console.log(data)

      // Redirect if user is not admin
      if (!data?.data?.roles?.includes("admin")) {
        return NextResponse.redirect(`${origin}/unauthorised`);
      }
    } catch {
      return NextResponse.redirect(`${origin}/auth/login`);
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

/**
 * Apply middleware only to secure routes
 */
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

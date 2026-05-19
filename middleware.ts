import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If it's a protected route and user is not authenticated, redirect to login
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (user) {
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const userRole = userData?.role;

    // Owner-only routes
    if (request.nextUrl.pathname.startsWith("/dashboard/owner")) {
      if (userRole !== "owner") {
        return NextResponse.redirect(new URL("/dashboard/client", request.url));
      }
    }

    // Client-only routes
    if (request.nextUrl.pathname.startsWith("/dashboard/client")) {
      if (userRole !== "client") {
        return NextResponse.redirect(new URL("/dashboard/owner", request.url));
      }
    }
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ["/login", "/signup"];
  if (authRoutes.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard/client", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g., .svg, .png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
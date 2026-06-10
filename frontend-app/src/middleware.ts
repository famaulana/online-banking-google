import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the session cookie
  const sessionCookie = request.cookies.get("user_session")?.value;

  let user = null;
  if (sessionCookie) {
    try {
      // Decode and parse the session
      user = JSON.parse(decodeURIComponent(sessionCookie));
    } catch (e) {
      console.error("Failed to parse user session cookie", e);
    }
  }

  const { pathname } = request.nextUrl;

  // 1. Protection for Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (user.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // 2. Protection for Customer Routes
  if (pathname.startsWith("/customer")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (user.role !== "customer") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // 3. Login Page Redirects
  if (pathname === "/login") {
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 4. Root Path Redirects
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    if (user) {
      url.pathname = user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Config to specify which paths the middleware should intercept
export const config = {
  matcher: [
    "/",
    "/login",
    "/unauthorized",
    "/admin/:path*",
    "/customer/:path*",
  ],
};

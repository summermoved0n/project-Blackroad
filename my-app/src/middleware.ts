import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/build-trip") ||
    req.nextUrl.pathname.includes("/booking");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/build-trip",
    "/tours/:path*/booking",
    "/profile",
    "/booking-history",
    "/favorites",
  ],
};

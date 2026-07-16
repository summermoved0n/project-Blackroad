import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  console.log(isAuthPage);

  const isProtectedRoute =
    req.nextUrl.pathname.includes("/profile") ||
    req.nextUrl.pathname.startsWith("/build-trip") ||
    req.nextUrl.pathname.includes("/booking") ||
    req.nextUrl.pathname.includes("/favorites");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/login",
    "/build-trip",
    "/tours/:path*/booking",
    "/profile",
    "/profile/edit",
    "/booking-history",
    "/favorites",
  ],
};

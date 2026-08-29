import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { serverEnv } from "@/lib/env/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/build-trip") ||
    req.nextUrl.pathname.includes("/booking") ||
    req.nextUrl.pathname.startsWith("/favorites");

  let isAuthenticated = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(serverEnv.JWT_SECRET);

      const { payload } = await jwtVerify(token, secret);
      const id = payload.id;
      const sessionVersion = payload.sessionVersion;

      if (!Number.isInteger(id) || !Number.isInteger(sessionVersion)) {
        throw new Error("Invalid session payload");
      }

      const user = await prisma.user.findUnique({
        where: { id: id as number },
        select: { sessionVersion: true },
      });

      if (!user || user.sessionVersion !== sessionVersion) {
        throw new Error("Session has been invalidated");
      }

      isAuthenticated = true;
    } catch {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");

      return response;
    }
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
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

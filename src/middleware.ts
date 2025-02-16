import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/auth";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  admin: [/^\/admin/],
  user: [/^\/user/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  return NextResponse.redirect(
    new URL(`/login?redirect=${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/admin", "/admin/:page*", "/user", "/user/:page*"],
};

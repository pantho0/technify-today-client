import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  admin: [/^\/admin/],
  user: [/^\/user/],
};

type Role = keyof typeof roleBasedRoutes;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = {
    userId: "xyz",
    role: "admin",
  };

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/user", "/user/:page*", "/admin", "/admin/:page*"],
};

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";

const ADMIN_AUTH_PAGES = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/otp-verification",
  "/admin/reset-password",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token?.role === "admin";

  if (pathname.startsWith(ADMIN_DASHBOARD_PATH) && !isAdmin) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (ADMIN_AUTH_PAGES.some((page) => pathname.startsWith(page)) && isAdmin) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  }

  return NextResponse.next();
}

// Artist routes have no login flow built yet — add "/artist/:path*" here
// once /artist/login exists, following the same isAdmin-style role check.
export const config = {
  matcher: ["/admin/:path*"],
};

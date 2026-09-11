import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  isUserProtectedPath,
  isUserGuestOnlyPath,
  getRoleHomePath,
  USER_SIGN_IN_PATH,
} from "@/lib/auth/authRoutes";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";
const ADMIN_DASHBOARD_HOME_PATH = "/admin/dashboard/overview";

const ADMIN_AUTH_PAGES = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/otp-verification",
  "/admin/reset-password",
];

// Auth-gated redirects must never be cached — a stale 307 (from before
// login/logout) served by the browser's own HTTP cache would strand the
// user on the wrong page even on a fresh, typed-URL navigation.
function redirectNoStore(url) {
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token?.role === "admin";

  if (pathname.startsWith(ADMIN_DASHBOARD_PATH) && !isAdmin) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.nextUrl);
    const targetPath =
      pathname === ADMIN_DASHBOARD_PATH || pathname === `${ADMIN_DASHBOARD_PATH}/`
        ? ADMIN_DASHBOARD_HOME_PATH
        : pathname;
    loginUrl.searchParams.set("callbackUrl", `${targetPath}${request.nextUrl.search}`);
    return redirectNoStore(loginUrl);
  }

  if (ADMIN_AUTH_PAGES.some((page) => pathname.startsWith(page)) && isAdmin) {
    return redirectNoStore(new URL(ADMIN_DASHBOARD_HOME_PATH, request.nextUrl));
  }

  // --- Listener ("user" role) area ------------------------------------------
  // The user's own auth screens: anyone already signed in goes to their home.
  if (isUserGuestOnlyPath(pathname)) {
    if (token) {
      return redirectNoStore(new URL(getRoleHomePath(token.role), request.nextUrl));
    }
    return NextResponse.next();
  }

  if (isUserProtectedPath(pathname)) {
    if (!token) {
      const loginUrl = new URL(USER_SIGN_IN_PATH, request.nextUrl);
      loginUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`);
      return redirectNoStore(loginUrl);
    }

    // Signed in, but not as a listener — hand them to their own area. The
    // path comparison stops an unrecognised role from redirecting in a loop.
    if (token.role !== "user") {
      const roleHome = getRoleHomePath(token.role);
      if (roleHome !== pathname) {
        return redirectNoStore(new URL(roleHome, request.nextUrl));
      }
    }
  }

  return NextResponse.next();
}

// Next statically analyses this array, so the paths have to be literals and
// can't be spread from `@/lib/auth/authRoutes` — keep the two lists in sync.
// Artist routes have no login flow built yet — add "/artist/:path*" here
// once /artist/login exists, following the same isAdmin-style role check.
export const config = {
  matcher: [
    "/admin/:path*",
    // Listener area (the `(user)` route group).
    "/",
    "/albums/:path*",
    "/audio-books/:path*",
    "/downloads/:path*",
    "/explore/:path*",
    "/library/:path*",
    "/notifications/:path*",
    "/podcasts/:path*",
    "/profile/:path*",
    "/shop/:path*",
    "/subscription/:path*",
    "/tickets/:path*",
    "/trending/:path*",
    "/watch/:path*",
    // Listener auth screens.
    "/login/:path*",
    "/register/:path*",
    "/verify-email/:path*",
    "/forgot-password/:path*",
    "/otp-verification/:path*",
    "/reset-password/:path*",
  ],
};

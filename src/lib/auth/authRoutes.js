/**
 * Single source of truth for which paths belong to the signed-in user area,
 * which are the user's guest-only auth screens, and where each role lands.
 *
 * Imported by `src/middleware.js` (edge runtime) and by `axiosPrivate`
 * (browser), so it must stay free of Node/React/next-auth imports.
 */

// Every route rendered inside the `(user)` route group.
export const userProtectedPaths = [
  "/",
  "/albums",
  "/audio-books",
  "/downloads",
  "/explore",
  "/library",
  "/notifications",
  "/podcasts",
  "/profile",
  "/shop",
  "/subscription",
  "/tickets",
  "/trending",
  "/watch",
];

// The user's own auth screens — a signed-in account has no business here.
export const userGuestOnlyPaths = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/otp-verification",
  "/reset-password",
];

export const USER_SIGN_IN_PATH = "/login";
export const ADMIN_SIGN_IN_PATH = "/admin/login";

const roleHomePaths = {
  user: "/",
  admin: "/admin/dashboard/overview",
  artist: "/artist/dashboard",
};

// Exact match, or a nested segment of it. `/` is matched exactly on purpose —
// treating it as a prefix would swallow every path in the app.
const matchesPath = (pathname, path) =>
  pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

export function isUserProtectedPath(pathname) {
  return userProtectedPaths.some((path) => matchesPath(pathname, path));
}

export function isUserGuestOnlyPath(pathname) {
  return userGuestOnlyPaths.some((path) => matchesPath(pathname, path));
}

export function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/** Where a signed-out visitor on `pathname` should be sent to sign in. */
export function getSignInPath(pathname = "") {
  return isAdminPath(pathname) ? ADMIN_SIGN_IN_PATH : USER_SIGN_IN_PATH;
}

/** Landing page for an already-signed-in account of `role`. */
export function getRoleHomePath(role) {
  return roleHomePaths[role] ?? roleHomePaths.user;
}

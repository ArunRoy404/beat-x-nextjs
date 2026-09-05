import { axiosPublic } from "@/lib/axios/axiosPublic";
import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the auth resource. Kept separate from hooks so
 * non-React callers (e.g. NextAuth's `authorize`/`jwt` callbacks) can reuse
 * the same request shape instead of duplicating it.
 */
export async function loginRequest({ email, password }) {
  const res = await axiosPublic.post("/auth/login", { email, password });
  return res.data.data;
}

export async function registerRequest({ name, email, password, role }) {
  const res = await axiosPublic.post("/auth/register", { name, email, password, role });
  return res.data.data;
}

export async function verifyEmailRequest({ email, otp }) {
  const res = await axiosPublic.post("/auth/verify-email", { email, otp });
  return res.data.data;
}

export async function resendVerificationRequest({ email }) {
  const res = await axiosPublic.post("/auth/resend-verification", { email });
  return res.data.data;
}

export async function refreshTokenRequest({ refreshToken }) {
  const res = await axiosPublic.post("/auth/refresh", { refreshToken });
  return res.data.data;
}

export async function forgotPasswordRequest({ email }) {
  const res = await axiosPublic.post("/auth/forgot-password", { email });
  return res.data.data;
}

export async function resetPasswordRequest({ email, otp, newPassword }) {
  const res = await axiosPublic.post("/auth/reset-password", { email, otp, newPassword });
  return res.data.data;
}

export async function logoutRequest() {
  const res = await axiosPrivate.post("/auth/logout");
  return res.data.data;
}

export async function getLoginHistoryRequest() {
  const res = await axiosPrivate.get("/auth/login-history");
  return res?.data?.data ?? res?.data;
}


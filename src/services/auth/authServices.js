import { axiosPublic } from "@/lib/axios/axiosPublic";

/**
 * Raw API calls for the auth resource. Kept separate from hooks so
 * non-React callers (e.g. NextAuth's `authorize`) can reuse the same
 * request shape instead of duplicating it.
 */
export async function loginRequest({ email, password }) {
  const res = await axiosPublic.post("/auth/login", { email, password });
  return res.data.data;
}

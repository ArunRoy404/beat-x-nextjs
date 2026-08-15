import axios from "axios";
import { normalizeAxiosError } from "./normalizeAxiosError";
import { getApiBaseUrl } from "./getApiBaseUrl";

/**
 * For endpoints that require the signed-in user's access token. Works from
 * both Server Components/route handlers and Client Components — the token
 * source is resolved per-call since NextAuth's client/server session helpers
 * aren't interchangeable.
 */
export const axiosPrivate = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      const { signOut } = await import("next-auth/react");
      await signOut({ callbackUrl: "/admin/login" });
    }

    return Promise.reject(normalizeAxiosError(error));
  }
);

async function getAccessToken() {
  if (typeof window === "undefined") {
    const { getServerSession } = await import("next-auth/next");
    const { authOptions } = await import("@/lib/auth/authOptions");
    const session = await getServerSession(authOptions);
    return session?.accessToken;
  }

  const { getSession } = await import("next-auth/react");
  const session = await getSession();
  return session?.accessToken;
}

export default axiosPrivate;

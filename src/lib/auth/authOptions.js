import { decode as defaultDecode, encode as defaultEncode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest, verifyEmailRequest, refreshTokenRequest } from "@/services/auth/authServices";
import { decodeJwt } from "./decodeJwt";
import { env } from "@/config/env";

async function refreshAccessToken(token) {
  try {
    const { accessToken, refreshToken } = await refreshTokenRequest({
      refreshToken: token.refreshToken,
    });
    const { exp } = decodeJwt(accessToken);

    return {
      ...token,
      accessToken,
      refreshToken,
      accessTokenExpires: exp * 1000,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

/**
 * Both credential flows (password login and signup OTP verification) return
 * the same `{ accessToken, refreshToken, role }` payload, so they share one
 * mapper into the user object NextAuth stores on the JWT.
 */
function toSessionUser({ accessToken, refreshToken, role }) {
  const { sub, email, exp } = decodeJwt(accessToken);

  return {
    id: sub,
    email,
    role,
    accessToken,
    refreshToken,
    accessTokenExpires: exp * 1000,
  };
}

export const authOptions = {
  secret: env.nextAuthSecret,
  session: { strategy: "jwt" },
  jwt: {
    async decode(params) {
      try {
        return await defaultDecode(params);
      } catch {
        // Return null if token decryption fails (corrupted token, changed secret, invalid IV)
        // so NextAuth treats it as unauthenticated instead of throwing a fatal JWT_SESSION_ERROR.
        return null;
      }
    },
    async encode(params) {
      return await defaultEncode(params);
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const tokens = await loginRequest({
            email: credentials?.email,
            password: credentials?.password,
          });

          return toSessionUser(tokens);
        } catch (error) {
          throw new Error(error?.message || "Invalid email or password");
        }
      },
    }),
    // Signup email verification: POST /auth/verify-email already answers with
    // a full token pair, so confirming the OTP signs the account straight in
    // instead of bouncing the user back through the login form.
    CredentialsProvider({
      id: "email-otp",
      name: "Email Verification",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Verification code", type: "text" },
      },
      async authorize(credentials) {
        try {
          const tokens = await verifyEmailRequest({
            email: credentials?.email,
            otp: credentials?.otp,
          });

          return toSessionUser(tokens);
        } catch (error) {
          throw new Error(error?.message || "Invalid or expired verification code");
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always return an absolute URL: next-auth's client-side signIn() calls
      // `new URL(data.url)` which throws "Failed to construct 'URL': Invalid URL" if relative.
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (parsed.origin === baseUrl || parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
          return url;
        }
      } catch {}
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = { id: token.id, email: token.email, role: token.role };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

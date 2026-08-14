import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest, refreshTokenRequest } from "@/services/auth/authServices";
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

export const authOptions = {
  secret: env.nextAuthSecret,
  session: { strategy: "jwt" },
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
          const { accessToken, refreshToken, role } = await loginRequest({
            email: credentials?.email,
            password: credentials?.password,
          });

          const { sub, email, exp } = decodeJwt(accessToken);

          return {
            id: sub,
            email,
            role,
            accessToken,
            refreshToken,
            accessTokenExpires: exp * 1000,
          };
        } catch (error) {
          throw new Error(error?.message || "Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
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

"use client"

import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"

/**
 * Confirms the signup OTP and signs the account in with the same call —
 * POST /auth/verify-email already answers with an accessToken/refreshToken
 * pair, so it runs through NextAuth's "email-otp" provider (see
 * `authOptions`) rather than a bare mutation. Verifying twice would burn the
 * one-time code, which is why the page must not also call the service
 * directly.
 *   const { mutate: verifyEmail, isPending } = useVerifyEmail()
 *   verifyEmail({ email, otp }, { onSuccess, onError })
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: async ({ email, otp }) => {
      const result = await signIn("email-otp", {
        email,
        otp,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    },
  })
}

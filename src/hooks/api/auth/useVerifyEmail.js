import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

/**
 * Confirms the signup OTP and signs the account in with the same call —
 * POST /auth/verify-email already answers with an accessToken/refreshToken
 * pair, so it runs through NextAuth's "email-otp" provider (see
 * `authOptions`) rather than a bare mutation.
 * Encapsulates toast notifications and post-verification redirect.
 *   const { mutate: verifyEmail, isPending } = useVerifyEmail({ redirectTo: "/" })
 *   verifyEmail({ email, otp })
 */
export function useVerifyEmail({ redirectTo = "/" } = {}) {
  const router = useRouter()

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
    onSuccess: (_data, variables) => {
      toast.success("Email verified! Welcome to BeatX.")
      const destination = variables?.redirectTo || redirectTo
      if (destination) {
        router.push(destination)
        router.refresh()
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Invalid or expired verification code")
    },
  })
}

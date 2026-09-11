import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signIn, getSession } from "next-auth/react"
import { toast } from "sonner"
import { getRoleHomePath, isAdminPath } from "@/lib/auth/authRoutes"

/**
 * Confirms the signup OTP and signs the account in with the same call —
 * POST /auth/verify-email already answers with an accessToken/refreshToken
 * pair, so it runs through NextAuth's "email-otp" provider (see
 * `authOptions`) rather than a bare mutation.
 * Encapsulates toast notifications and role-based post-verification redirect.
 *   const { mutate: verifyEmail, isPending } = useVerifyEmail({ redirectTo: "/" })
 *   verifyEmail({ email, otp })
 */
export function useVerifyEmail({ redirectTo } = {}) {
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

      let session = await getSession()
      if (!session?.user?.role) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        session = await getSession()
      }

      return { result, session }
    },
    onSuccess: (data, variables) => {
      toast.success("Email verified! Welcome to BeatX.")

      const role = data?.session?.user?.role
      const roleHome = getRoleHomePath(role)
      const requestedDestination = variables?.redirectTo || redirectTo

      let destination = roleHome
      if (role === "admin") {
        destination = requestedDestination && isAdminPath(requestedDestination)
          ? requestedDestination
          : roleHome
      } else {
        destination = requestedDestination && !isAdminPath(requestedDestination)
          ? requestedDestination
          : roleHome
      }

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

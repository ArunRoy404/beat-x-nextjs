import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { forgotPasswordRequest } from "@/services/auth/authServices"

/**
 * Sends a password-reset OTP to the given email.
 * Encapsulates toast notifications and navigation.
 *   const { mutate: sendResetCode, isPending } = useForgotPassword({ redirectTo: "/otp-verification" })
 *   sendResetCode({ email })
 */
export function useForgotPassword({ redirectTo } = {}) {
  const router = useRouter()

  return useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: (_data, variables) => {
      toast.success(variables?.isResend ? "Verification code resent!" : "Verification code sent to your email!")
      if (redirectTo && variables?.email) {
        router.push(`${redirectTo}?email=${encodeURIComponent(variables.email)}`)
      }
    },
    onError: (error, variables) => {
      toast.error(error?.response?.data?.message || error?.message || (variables?.isResend ? "Could not resend verification code" : "Could not send verification code"))
    },
  })
}

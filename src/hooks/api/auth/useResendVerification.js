import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { resendVerificationRequest } from "@/services/auth/authServices"

/**
 * Encapsulates resend verification code mutation and toast feedback.
 *   const { mutate: resendVerification, isPending } = useResendVerification()
 *   resendVerification({ email })
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerificationRequest,
    onSuccess: () => {
      toast.success("Verification code resent!")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not resend verification code")
    },
  })
}


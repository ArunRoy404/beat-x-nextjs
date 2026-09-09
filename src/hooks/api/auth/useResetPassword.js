import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { resetPasswordRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: resetPassword, isPending } = useResetPassword({ redirectTo: "/reset-password/success" })
 *   resetPassword({ email, otp, newPassword })
 */
export function useResetPassword({ redirectTo = "/reset-password/success" } = {}) {
  const router = useRouter()

  return useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: (_data, variables) => {
      toast.success("Password changed successfully!")
      const destination = variables?.redirectTo || redirectTo
      if (destination) {
        router.push(destination)
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not reset password")
    },
  })
}

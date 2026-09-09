import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { registerRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: registerAccount, isPending } = useRegister()
 *   registerAccount({ name, email, password, role })
 */
export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data, variables) => {
      toast.success(data?.message || "Check your email for the verification code.")
      const targetEmail = data?.email || variables?.email
      if (targetEmail) {
        router.push(`/verify-email?email=${encodeURIComponent(targetEmail)}`)
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not create your account")
    },
  })
}

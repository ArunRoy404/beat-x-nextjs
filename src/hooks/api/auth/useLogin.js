import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

/**
 * Signs the user in via NextAuth's Credentials provider (which calls the
 * backend login API server-side and stores the resulting tokens in the
 * session).
 * Encapsulates toast notifications and post-login redirection.
 *   const { mutate: login, isPending } = useLogin({ redirectTo: "/" })
 *   login({ email, password })
 */
export function useLogin({ redirectTo = "/" } = {}) {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: (_data, variables) => {
      toast.success("Logged in successfully!")
      const destination = variables?.redirectTo || redirectTo
      if (destination) {
        router.push(destination)
        // Destination may have been cached client-side as an unauthenticated redirect — force fresh check
        router.refresh()
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Invalid email or password")
    },
  })
}

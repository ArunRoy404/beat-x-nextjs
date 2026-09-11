import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signIn, getSession } from "next-auth/react"
import { toast } from "sonner"
import { getRoleHomePath, isAdminPath } from "@/lib/auth/authRoutes"

/**
 * Signs the user in via NextAuth's Credentials provider (which calls the
 * backend login API server-side and stores the resulting tokens in the
 * session).
 * Encapsulates toast notifications and role-based post-login redirection.
 *   const { mutate: login, isPending } = useLogin({ redirectTo: "/" })
 *   login({ email, password })
 */
export function useLogin({ redirectTo } = {}) {
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

      let session = await getSession()
      if (!session?.user?.role) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        session = await getSession()
      }

      return { result, session }
    },
    onSuccess: (data, variables) => {
      toast.success("Logged in successfully!")

      const role = data?.session?.user?.role
      const roleHome = getRoleHomePath(role)
      const requestedDestination = variables?.redirectTo || redirectTo

      let destination = roleHome
      if (role === "admin") {
        // Admin must land in admin area. If requested a specific admin route, honor it. Otherwise go to admin home.
        destination = requestedDestination && isAdminPath(requestedDestination)
          ? requestedDestination
          : roleHome
      } else {
        // Non-admin (listener/user/artist) must not land in admin area.
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
      toast.error(error?.response?.data?.message || error?.message || "Invalid email or password")
    },
  })
}

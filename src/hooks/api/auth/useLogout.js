"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { logoutRequest } from "@/services/auth/authServices"

/**
 * Invalidates the token server-side, then always clears the local NextAuth
 * session (even if the backend call fails — a flaky logout request should
 * never trap the user in a signed-in state) and wipes every cached query,
 * since all of it belonged to the session that just ended.
 *
 * All side-effects (toast.promise, navigation, query invalidation) are encapsulated here:
 *   const { logout, isPending } = useLogout({ redirectTo: "/admin/login" })
 *   logout()
 */
export function useLogout({ redirectTo = "/login" } = {}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await logoutRequest()
      } finally {
        await signOut({ redirect: false })
      }
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })

  const logout = (options) => {
    const targetRedirect =
      typeof options?.redirectTo === "string" ? options.redirectTo : redirectTo

    const promise = mutation.mutateAsync().then(() => {
      if (targetRedirect) {
        router.push(targetRedirect)
        // Force fresh check in case proxy/middleware cached redirect
        router.refresh()
      }
    })

    toast.promise(promise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: (err) => err?.response?.data?.message || "Something went wrong while logging out",
    })

    return promise
  }

  return {
    ...mutation,
    mutate: logout,
    mutateAsync: logout,
    logout,
  }
}


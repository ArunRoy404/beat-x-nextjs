"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { logoutRequest } from "@/services/auth/authServices"

/**
 * Invalidates the token server-side, then always clears the local NextAuth
 * session (even if the backend call fails — a flaky logout request should
 * never trap the user in a signed-in state) and wipes every cached query,
 * since all of it belonged to the session that just ended.
 *   const { mutate: logout, isPending } = useLogout()
 *   logout(undefined, { onSuccess, onError })
 */
export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
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
}

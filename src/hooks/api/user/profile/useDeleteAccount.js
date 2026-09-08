"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { deleteMyAccountRequest } from "@/services/user/profileServices"

/**
 * Deletes the account, then tears the local session down — the tokens are
 * dead server-side, so leaving the app in a signed-in state would only
 * produce 401s on the next request.
 *   const { mutate: deleteAccount, isPending } = useDeleteAccount()
 *   deleteAccount({ password }, { onSuccess, onError })
 */
export function useDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ password }) => {
      const data = await deleteMyAccountRequest({ password })
      await signOut({ redirect: false })
      return data
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

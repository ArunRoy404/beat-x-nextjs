"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { deleteMyAccountRequest } from "@/services/user/profileServices"

/**
 * Deletes the account, then tears the local session down, wipes cache, shows
 * toast, and redirects to registration.
 *   const { mutate: deleteAccount, isPending } = useDeleteAccount({ redirectTo: "/register" })
 *   deleteAccount({ password })
 */
export function useDeleteAccount({ redirectTo = "/register" } = {}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ password }) => {
      const data = await deleteMyAccountRequest({ password })
      await signOut({ redirect: false })
      return data
    },
    onSuccess: () => {
      queryClient.clear()
      toast.success("Your account has been deleted.")
      if (redirectTo) {
        router.push(redirectTo)
        router.refresh()
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete your account.")
    },
  })
}

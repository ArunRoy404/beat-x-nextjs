"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { banUserRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Bans a user's account (permanent, until reactivated).
 *   const { mutate: banUser, isPending } = useBanUser()
 *   banUser({ id, reason })
 */
export function useBanUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: banUserRequest,
    onSuccess: (_data, variables) => {
      toast.warning("User banned!")
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to ban user.")
    },
  })
}

"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { suspendUserRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Suspends a user's account.
 *   const { mutate: suspendUser, isPending } = useSuspendUser()
 *   suspendUser({ id, reason })
 */
export function useSuspendUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: suspendUserRequest,
    onSuccess: (_data, variables) => {
      toast.warning("User suspended!")
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to suspend user.")
    },
  })
}

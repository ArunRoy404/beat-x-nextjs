"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { reactivateUserRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Clears a suspended/banned user back to active.
 *   const { mutate: reactivateUser, isPending } = useReactivateUser()
 *   reactivateUser({ id })
 */
export function useReactivateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reactivateUserRequest,
    onSuccess: (_data, variables) => {
      toast.success("User reactivated!")
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to reactivate user.")
    },
  })
}

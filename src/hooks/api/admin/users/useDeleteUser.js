"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteUserRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Admin-initiated deletion of any user account.
 *   const { mutate: deleteUser, isPending } = useDeleteUser()
 *   deleteUser({ id })
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      toast.success("User deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete user.")
    },
  })
}

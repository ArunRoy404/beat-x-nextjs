"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { inviteUserRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Invites a new staff (admin/developer) account — creates it with a temp
 * password and emails it to the invitee.
 *   const { mutate: inviteUser, isPending } = useInviteUser()
 *   inviteUser({ email, role })
 */
export function useInviteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: inviteUserRequest,
    onSuccess: () => {
      toast.success("Invitation sent!")
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to send invitation.")
    },
  })
}

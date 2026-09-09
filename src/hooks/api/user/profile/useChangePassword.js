"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { changeMyPasswordRequest } from "@/services/user/profileServices"

/**
 * Changes the signed-in listener's password (PATCH /users/change-password).
 * Nothing cached is derived from the password, so no query is invalidated —
 * and if the backend rotates tokens, axiosPrivate's 401 handler signs the
 * user out on the next request.
 *   const { mutate: changePassword, isPending } = useChangePassword()
 *   changePassword({ currentPassword, newPassword, confirmPassword }, { onSuccess })
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: changeMyPasswordRequest,
    onSuccess: () => {
      toast.success("Password changed successfully!")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to change your password.")
    },
  })
}

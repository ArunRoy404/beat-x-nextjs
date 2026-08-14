"use client"

import { useMutation } from "@tanstack/react-query"
import { resetPasswordRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: resetPassword, isPending } = useResetPassword()
 *   resetPassword({ email, otp, newPassword }, { onSuccess, onError })
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordRequest,
  })
}

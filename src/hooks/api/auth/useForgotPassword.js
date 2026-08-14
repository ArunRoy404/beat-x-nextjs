"use client"

import { useMutation } from "@tanstack/react-query"
import { forgotPasswordRequest } from "@/services/auth/authServices"

/**
 * Sends a password-reset OTP to the given email.
 *   const { mutate: sendResetCode, isPending } = useForgotPassword()
 *   sendResetCode({ email }, { onSuccess, onError })
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordRequest,
  })
}

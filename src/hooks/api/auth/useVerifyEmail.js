"use client"

import { useMutation } from "@tanstack/react-query"
import { verifyEmailRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: verifyEmail, isPending } = useVerifyEmail()
 *   verifyEmail({ email, otp }, { onSuccess, onError })
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmailRequest,
  })
}

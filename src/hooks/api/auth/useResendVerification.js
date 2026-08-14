"use client"

import { useMutation } from "@tanstack/react-query"
import { resendVerificationRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: resendVerification, isPending } = useResendVerification()
 *   resendVerification({ email }, { onSuccess, onError })
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerificationRequest,
  })
}

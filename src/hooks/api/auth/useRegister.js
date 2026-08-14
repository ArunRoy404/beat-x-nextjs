"use client"

import { useMutation } from "@tanstack/react-query"
import { registerRequest } from "@/services/auth/authServices"

/**
 *   const { mutate: register, isPending } = useRegister()
 *   register({ name, email, password, role }, { onSuccess, onError })
 */
export function useRegister() {
  return useMutation({
    mutationFn: registerRequest,
  })
}

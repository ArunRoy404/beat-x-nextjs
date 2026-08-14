"use client"

import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"

/**
 * Signs the user in via NextAuth's Credentials provider (which calls the
 * backend login API server-side and stores the resulting tokens in the
 * session). Consumers get back the usual mutation shape:
 *   const { mutate: login, isPending, error } = useLogin()
 *   login({ email, password }, { onSuccess, onError })
 */
export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    },
  })
}

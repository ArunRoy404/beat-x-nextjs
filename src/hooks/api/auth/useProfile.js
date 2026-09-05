"use client"

import { useQuery } from "@tanstack/react-query"
import { getProfileRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Custom hook to fetch the currently authenticated user's profile (/users/me).
 */
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getProfileRequest,
  })
}

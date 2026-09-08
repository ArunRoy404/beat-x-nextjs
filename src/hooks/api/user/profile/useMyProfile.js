"use client"

import { useQuery } from "@tanstack/react-query"
import { getMyProfileRequest } from "@/services/user/profileServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * The signed-in listener's own profile (GET /users/me).
 *   const { data: profile, isLoading } = useMyProfile()
 */
export function useMyProfile() {
  return useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: getMyProfileRequest,
  })
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { getLoginHistoryRequest } from "@/services/auth/authServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Custom hook to fetch user login history (/auth/login-history).
 */
export function useLoginHistory() {
  return useQuery({
    queryKey: queryKeys.auth.loginHistory(),
    queryFn: getLoginHistoryRequest,
  })
}

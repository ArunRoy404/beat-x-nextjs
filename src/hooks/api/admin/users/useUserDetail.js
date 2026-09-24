"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserDetailRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single admin user's detail record.
 *   const { data: user, isLoading } = useUserDetail(id)
 */
export function useUserDetail(id) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => getUserDetailRequest({ id }),
    enabled: !!id,
  })
}

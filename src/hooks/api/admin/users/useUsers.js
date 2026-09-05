"use client"

import { useQuery } from "@tanstack/react-query"
import { getUsersRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches the admin users list.
 *   const { data: users = [], isLoading, isError, error, refetch } = useUsers(params)
 */
export function useUsers(params) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => getUsersRequest(params),
  })
}

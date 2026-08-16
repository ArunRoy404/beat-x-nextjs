"use client"

import { useQuery } from "@tanstack/react-query"
import { getUsersRequest } from "@/services/admin/usersServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches the full admin users list.
 *   const { data: users = [], isLoading, isError, error, refetch } = useUsers()
 */
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: getUsersRequest,
  })
}

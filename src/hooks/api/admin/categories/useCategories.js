"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesRequest } from "@/services/admin/categoryServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches the (podcast) category list.
 *   const { data, isLoading, isError, error, refetch } = useCategories(params)
 */
export function useCategories(params) {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => getCategoriesRequest(params),
  });
}

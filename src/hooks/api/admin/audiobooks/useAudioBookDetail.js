"use client"

import { useQuery } from "@tanstack/react-query"
import { getAudioBookDetailRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single audiobook. Disabled until an id is given.
 * Resolves to { book, chapters, userProgress } — not a flattened book object.
 *   const { data, isLoading, refetch } = useAudioBookDetail(id)
 *   const { book, chapters } = data ?? {}
 */
export function useAudioBookDetail(id) {
  return useQuery({
    queryKey: queryKeys.audiobooks.detail(id),
    queryFn: () => getAudioBookDetailRequest({ id }),
    enabled: Boolean(id),
  })
}

"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

/**
 * Reads/writes admin list filter+search+pagination state from the URL query
 * string, so filters are shareable/bookmarkable and the SSR page can
 * prefetch the exact matching page (see buildXParams helpers next to each
 * list hook, e.g. useAudioBooks.js's buildAudioBooksParams).
 *   const { get, setParams } = useUrlListParams()
 *   const status = get("status", "all")
 *   setParams({ status: "active" })          // also clears "page"
 *   setParams({ page: 2 }, { resetPage: false })
 */
export function useUrlListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const get = useCallback(
    (key, fallback = "") => searchParams.get(key) ?? fallback,
    [searchParams]
  )

  const setParams = useCallback(
    (updates, { resetPage = true } = {}) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })

      if (resetPage && !("page" in updates)) {
        params.delete("page")
      }

      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return { get, setParams, searchParams }
}

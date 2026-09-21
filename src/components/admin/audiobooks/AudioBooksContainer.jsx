"use client"

import React, { useEffect, useState } from "react"
import AudioBookCard from "./AudioBookCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { useAudioBooks } from "@/hooks/api/admin/audiobooks/useAudioBooks"
import { AUDIOBOOKS_PAGE_SIZE, buildAudioBooksParams } from "@/hooks/api/admin/audiobooks/audioBooksParams"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions"

const STATUS_TABS = ["All", "Draft", "Active", "Archived"]
const SEARCH_DEBOUNCE_MS = 300

const AudioBooksContainer = () => {
  const { get, setParams } = useUrlListParams()

  const selectedStatus = get("status", "all")
  const selectedGenre = get("genre", "all")
  const urlSearch = get("q", "")
  const currentPage = Number(get("page", "1")) || 1

  const [searchInput, setSearchInput] = useState(urlSearch)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim() !== urlSearch) {
        setParams({ q: searchInput.trim() })
      }
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  // `useGenres()` resolves to a paginated object ({ data, total, ... }),
  // never a bare array — `const { data: genres = [] } = useGenres()` only
  // guards against `undefined`, so `genres.map(...)` below used to throw
  // "genres.map is not a function" the moment real data landed (same root
  // cause as the crash already fixed on the Podcasts route).
  const genresQuery = useGenres(TAXONOMY_OPTIONS_PARAMS)
  const genresData = genresQuery?.data
  const genresList =
    genresData?.genre ??
    genresData?.genres ??
    genresData?.data ??
    (Array.isArray(genresData) ? genresData : [])

  const genreOptions = [
    { value: "all", label: "All Genres" },
    ...genresList.map((genre) => ({ value: genre?._id, label: genre?.name || "Unnamed Genre" })),
  ]

  const params = buildAudioBooksParams({
    status: selectedStatus,
    genre: selectedGenre,
    q: urlSearch,
    page: currentPage,
  })

  const { data, isLoading, isError, error, refetch } = useAudioBooks(params)
  // The Postman collection's saved example showed the list nested under
  // `data.data`, but the real live server nests it under `data.audio` —
  // the example was stale. Same bug class as the Users `data.admins` and
  // Videos `data.videos` mismatches found earlier; `data?.data` is kept as
  // a fallback only in case an older/different server build is in play.
  const books = data?.audio ?? data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / AUDIOBOOKS_PAGE_SIZE) || 1

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={STATUS_TABS}
            activeTab={STATUS_TABS.find((tab) => tab.toLowerCase() === selectedStatus) || "All"}
            onChange={(tab) => setParams({ status: tab.toLowerCase() === "all" ? undefined : tab.toLowerCase() })}
          />

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap">
            <CommonSelect
              value={selectedGenre}
              onChange={(genre) => setParams({ genre: genre === "all" ? undefined : genre })}
              options={genreOptions}
              className="w-44 h-8 px-4 text-[12px] border-border bg-transparent"
            />
            <CommonSearch
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search audiobooks..."
              className="flex-1 md:w-72"
            />
          </div>
        </>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-secondary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="text-red-error text-sm">{error?.message || "Failed to load audiobooks."}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Cards Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
            {books.map((book) => (
              <div key={book?._id}>
                <AudioBookCard book={book} />
              </div>
            ))}
            {books.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[24px]">
                No audiobooks found.
              </div>
            )}
          </div>

          {/* Pagination Bar */}
          <CommonPagination
            currentPage={currentPage}
            totalItems={total}
            pageSize={AUDIOBOOKS_PAGE_SIZE}
            totalPages={totalPages}
            onPageChange={(page) => setParams({ page }, { resetPage: false })}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default AudioBooksContainer

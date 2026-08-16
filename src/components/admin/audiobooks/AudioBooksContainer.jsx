"use client"

import React, { useEffect, useState } from "react"
import AudioBookCard from "./AudioBookCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import UploadAudioBookDialog from "@/components/dialogs/admin/audiobooks/UploadAudioBookDialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"
import { useAudioBooks, AUDIOBOOKS_PAGE_SIZE } from "@/hooks/api/admin/audiobooks/useAudioBooks"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const STATUS_TABS = ["All", "Draft", "Active", "Archived"]
const SEARCH_DEBOUNCE_MS = 300

const AudioBooksContainer = () => {
  const selectedStatus = useAdminDashboardAudioBooksStore((state) => state.selectedStatus)
  const setSelectedStatus = useAdminDashboardAudioBooksStore((state) => state.setSelectedStatus)
  const selectedGenre = useAdminDashboardAudioBooksStore((state) => state.selectedGenre)
  const setSelectedGenre = useAdminDashboardAudioBooksStore((state) => state.setSelectedGenre)
  const searchQuery = useAdminDashboardAudioBooksStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardAudioBooksStore((state) => state.setSearchQuery)
  const currentPage = useAdminDashboardAudioBooksStore((state) => state.currentPage)
  const setCurrentPage = useAdminDashboardAudioBooksStore((state) => state.setCurrentPage)

  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchQuery.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const { data: genres = [] } = useGenres()
  const genreOptions = [
    { value: "all", label: "All Genres" },
    ...genres.map((genre) => ({ value: genre._id, label: genre.name })),
  ]

  const params = {
    page: currentPage,
    limit: AUDIOBOOKS_PAGE_SIZE,
    ...(selectedStatus !== "all" && { status: selectedStatus }),
    ...(selectedGenre !== "all" && { genre: selectedGenre }),
    ...(debouncedSearch && { q: debouncedSearch }),
  }

  const { data, isLoading, isError, error, refetch } = useAudioBooks(params)
  const books = data?.data ?? []
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
            onChange={(tab) => setSelectedStatus(tab.toLowerCase())}
          />

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap">
            <CommonSelect
              value={selectedGenre}
              onChange={setSelectedGenre}
              options={genreOptions}
              className="w-44 h-8 px-4 text-[12px] border-border bg-transparent"
            />
            <CommonSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audiobooks..."
              className="flex-1 md:w-72"
            />
            <UploadAudioBookDialog />
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
              <div key={book._id}>
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
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default AudioBooksContainer

"use client"

import React, { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { useVideos } from "@/hooks/api/admin/videos/useVideos"
import { buildVideosParams } from "@/hooks/api/admin/videos/videosParams"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const STATUS_TABS = ["All", "Active", "Draft", "Archived"]
const SEARCH_DEBOUNCE_MS = 300
const VIDEOS_PAGE_SIZE = 20

const VideosContainer = () => {
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

  const genresQuery = useGenres()
  const genresData = genresQuery?.data
  const genresList =
    genresData?.genre ??
    genresData?.genres ??
    genresData?.data ??
    (Array.isArray(genresData) ? genresData : [])

  const genreOptions = [
    { value: "all", label: "All Genres" },
    ...genresList.map((genre) => ({
      value: genre?._id || genre?.id,
      label: genre?.name || "Unnamed Genre",
    })),
  ]

  const params = buildVideosParams({
    status: selectedStatus,
    genre: selectedGenre,
    q: urlSearch,
    page: currentPage,
    limit: VIDEOS_PAGE_SIZE,
  })

  const { data, isLoading, isError, error, refetch } = useVideos(params)
  const videos = data?.data ?? []
  const total = data?.total ?? 0
  const limit = data?.limit ?? VIDEOS_PAGE_SIZE
  const totalPages = Math.ceil(total / limit) || 1

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
              placeholder="Search videos..."
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
          <span className="text-red-error text-sm">{error?.message || "Failed to load videos."}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Cards Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
            {videos.map((video) => (
              <div key={video._id} className="flex h-full">
                <VideoCard video={video} />
              </div>
            ))}
            {videos.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[24px]">
                No videos found.
              </div>
            )}
          </div>

          {/* Pagination Bar */}
          <CommonPagination
            currentPage={currentPage}
            totalItems={total}
            pageSize={limit}
            totalPages={totalPages}
            onPageChange={(page) => setParams({ page }, { resetPage: false })}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default VideosContainer

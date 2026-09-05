"use client"

import React, { useEffect, useState } from "react"
import DataTable from "@/components/ui/DataTable"
import { getPodcastsColumns } from "@/components/DataTableColumns/admin/podcasts/PodcastsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import PodcastsCardsContainer from "./PodcastsCardsContainer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { usePodcasts } from "@/hooks/api/admin/podcasts/usePodcasts"
import { PODCASTS_PAGE_SIZE, buildPodcastsParams } from "@/hooks/api/admin/podcasts/podcastsParams"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const STATUS_TABS = ["All", "Draft", "Active", "Archived"]
const SEARCH_DEBOUNCE_MS = 300

const PodcastsContainer = () => {
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

  const { data: genres = [] } = useGenres()
  const genreOptions = [
    { value: "all", label: "All Genres" },
    ...genres.map((genre) => ({ value: genre._id, label: genre.name })),
  ]

  const params = buildPodcastsParams({
    status: selectedStatus,
    genre: selectedGenre,
    q: urlSearch,
    page: currentPage,
  })

  const { data, isLoading, isError, error, refetch } = usePodcasts(params)
  const podcasts = data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / PODCASTS_PAGE_SIZE) || 1

  const columns = getPodcastsColumns()

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
            {/* Commented out genre filter per user instruction */}
            {/* <CommonSelect
              value={selectedGenre}
              onChange={(genre) => setParams({ genre: genre === "all" ? undefined : genre })}
              options={genreOptions}
              className="w-44 h-8 px-4 text-[12px] border-border bg-transparent"
            /> */}
            <CommonSearch
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search podcasts..."
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
          <span className="text-red-error text-sm">{error?.message || "Failed to load podcasts."}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block">
            <DataTable
              columns={columns}
              data={podcasts}
            />
          </div>

          {/* Mobile view */}
          <div className="block md:hidden">
            <PodcastsCardsContainer podcasts={podcasts} />
          </div>

          {/* Pagination Bar */}
          <CommonPagination
            currentPage={currentPage}
            totalItems={total}
            pageSize={PODCASTS_PAGE_SIZE}
            totalPages={totalPages}
            onPageChange={(page) => setParams({ page }, { resetPage: false })}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default PodcastsContainer

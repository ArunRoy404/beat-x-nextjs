"use client"

import React, { useState } from "react"
import DataTable from "@/components/ui/DataTable"
import { getPodcastsColumns } from "@/components/DataTableColumns/admin/PodcastsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import PodcastsCardsContainer from "./PodcastsCardsContainer"
import { useAdminDashboardPodcastsStore } from "@/zustandStore/admin/adminStore/adminDashboardPodcastsStore"

const PodcastsContainer = () => {
  const podcasts = useAdminDashboardPodcastsStore((state) => state.podcastsList)
  
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const columns = getPodcastsColumns()

  // Filter list
  const filteredPodcasts = podcasts.filter((pod) => {
    // Status / Tab Filter
    if (selectedStatusFilter !== "All") {
      const filterLower = selectedStatusFilter.toLowerCase()
      if (filterLower === "my podcasts") {
        if (pod.artist.toLowerCase() !== "arif hossain") return false
      } else if (filterLower === "taken down") {
        if (pod.status.toLowerCase() !== "take down" && pod.status.toLowerCase() !== "taken down") return false
      } else {
        if (pod.status.toLowerCase() !== filterLower) return false
      }
    }
    
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !pod.title.toLowerCase().includes(q) &&
        !pod.artist.toLowerCase().includes(q) &&
        !pod.series.toLowerCase().includes(q) &&
        !pod.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredPodcasts.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedPodcasts = filteredPodcasts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "Taken Down", "My Podcasts"]

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={tabs}
            activeTab={selectedStatusFilter}
            onChange={(tab) => {
              setSelectedStatusFilter(tab)
              setCurrentPage(1)
            }}
          />

          {/* Search Input */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search ....."
              className="flex-1 md:w-72"
            />
          </div>
        </>
      }
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={paginatedPodcasts}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <PodcastsCardsContainer podcasts={paginatedPodcasts} />
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </CommonTableContainer>
  )
}

export default PodcastsContainer

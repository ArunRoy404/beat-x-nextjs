"use client"

import React, { useState } from "react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/artist/music/SongsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import SongsCardsContainer from "./SongsCardsContainer"
import { useArtistMusicStore } from "@/zustandStore/artist/artistStore/artistMusicStore"

const SongsContainer = () => {
  const songs = useArtistMusicStore((state) => state.songsList)

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const columns = getSongsColumns()

  // Filter list
  const filteredSongs = songs.filter((song) => {
    // Status / Tab Filter
    if (selectedStatusFilter !== "All") {
      if (song.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) return false
    }

    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !song.title.toLowerCase().includes(q) &&
        !(song.artist || "").toLowerCase().includes(q) &&
        !(song.album || "").toLowerCase().includes(q) &&
        !song.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredSongs.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedSongs = filteredSongs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected"]

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
          data={paginatedSongs}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <SongsCardsContainer songs={paginatedSongs} />
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

export default SongsContainer

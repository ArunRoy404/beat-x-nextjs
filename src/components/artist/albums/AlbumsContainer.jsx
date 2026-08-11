"use client"

import React, { useState } from "react"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import AlbumsCardsContainer from "./AlbumsCardsContainer"
import { useArtistAlbumsStore } from "@/zustandStore/artist/artistStore/artistAlbumsStore"

const AlbumsContainer = () => {
  const albums = useArtistAlbumsStore((state) => state.albumsList)

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Filter list
  const filteredAlbums = albums.filter((album) => {
    // Status / Tab Filter
    if (selectedStatusFilter !== "All") {
      if (album.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) return false
    }

    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !album.name.toLowerCase().includes(q) &&
        !(album.artist || "").toLowerCase().includes(q) &&
        !album.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredAlbums.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedAlbums = filteredAlbums.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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
      {/* Card grid (all breakpoints) */}
      <AlbumsCardsContainer albums={paginatedAlbums} />

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

export default AlbumsContainer

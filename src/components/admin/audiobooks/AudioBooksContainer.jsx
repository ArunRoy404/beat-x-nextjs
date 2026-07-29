"use client"

import React, { useState } from "react"
import AudioBookCard from "./AudioBookCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"

const AudioBooksContainer = () => {
  const books = useAdminDashboardAudioBooksStore((state) => state.audioBooksList)
  
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Filter list
  const filteredBooks = books.filter((book) => {
    // Status Filter
    if (selectedStatusFilter !== "All") {
      if (book.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) {
        return false
      }
    }
    
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !book.title.toLowerCase().includes(q) &&
        !book.artist.toLowerCase().includes(q) &&
        !book.narrator.toLowerCase().includes(q) &&
        !book.category.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredBooks.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const tabs = ["All", "Published", "Draft"]

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
      {/* Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
        {paginatedBooks.map((book) => (
          <div key={book.id}>
            <AudioBookCard book={book} />
          </div>
        ))}
        {paginatedBooks.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[24px]">
            No audiobooks found.
          </div>
        )}
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

export default AudioBooksContainer

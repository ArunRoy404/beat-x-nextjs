"use client"

import React, { useState } from "react"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import EventsCardsContainer from "./EventsCardsContainer"
import { useArtistEventsStore } from "@/zustandStore/artist/artistStore/artistEventsStore"

const EventsContainer = () => {
  const events = useArtistEventsStore((state) => state.eventsList)

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Filter list
  const filteredEvents = events.filter((event) => {
    // Status / Tab Filter
    if (selectedStatusFilter !== "All") {
      if (event.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) return false
    }

    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !event.title.toLowerCase().includes(q) &&
        !event.venue.toLowerCase().includes(q) &&
        !event.city.toLowerCase().includes(q) &&
        !event.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredEvents.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const tabs = ["All", "Upcoming", "Live", "Completed", "Draft", "Under Review", "Rejected"]

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
      {/* Card list (all breakpoints) */}
      <EventsCardsContainer events={paginatedEvents} />

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

export default EventsContainer

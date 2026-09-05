"use client"

import React from "react"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import EventsCardsContainer from "./EventsCardsContainer"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { useEvents } from "@/hooks/api/admin/events/useEvents"
import { buildEventsParams } from "@/hooks/api/admin/events/eventsParams"

const EventsContainer = () => {
  const { get, setParams } = useUrlListParams()

  const rawStatus = get("status", "")
  const searchQuery = get("q", "")
  const currentPage = Number(get("page", "1")) || 1

  // Format status for CommonFilter activeTab
  const activeTab = rawStatus
    ? rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).replace(/_/g, " ")
    : "All"

  const rawParams = {
    status: rawStatus,
    q: searchQuery,
    page: currentPage,
    limit: 20,
  }

  const params = buildEventsParams(rawParams)
  const { data: eventsResponse } = useEvents(params)

  const events = eventsResponse?.data || eventsResponse?.events || []
  const totalItems = eventsResponse?.total ?? events.length
  const pageSize = eventsResponse?.limit ?? 20
  const totalPages = Math.ceil(totalItems / pageSize) || 1

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setParams({ page }, { resetPage: false })
    }
  }

  const tabs = ["All", "Upcoming", "Live", "Completed", "Under Review", "Sold Out", "Rejected"]

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tab) => {
              const statusVal = tab === "All" ? "" : tab.toLowerCase().replace(/ /g, "_")
              setParams({ status: statusVal, page: 1 })
            }}
          />

          {/* Search Input */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => {
                setParams({ q: e.target.value, page: 1 })
              }}
              placeholder="Search ....."
              className="flex-1 md:w-72"
            />
          </div>
        </>
      }
    >
      {/* Card list (all breakpoints) */}
      <EventsCardsContainer events={events} />

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

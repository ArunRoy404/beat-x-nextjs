"use client"

import React, { useState } from "react"
import VideoCard from "./VideoCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { useAdminDashboardVideosStore } from "@/zustandStore/admin/adminStore/adminDashboardVideosStore"

const VideosContainer = () => {
  const videos = useAdminDashboardVideosStore((state) => state.videosList)
  
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Filter list
  const filteredVideos = videos.filter((video) => {
    // Status Filter
    if (selectedStatusFilter !== "All") {
      if (video.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) {
        return false
      }
    }
    
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !video.title.toLowerCase().includes(q) &&
        !video.artist.toLowerCase().includes(q) &&
        !video.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalItems = filteredVideos.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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
        {paginatedVideos.map((video) => (
          <div key={video.id} className="flex h-full">
            <VideoCard video={video} />
          </div>
        ))}
        {paginatedVideos.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[24px]">
            No videos found.
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

export default VideosContainer

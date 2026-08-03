"use client"

import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getArtistsColumns } from "@/components/DataTableColumns/admin/ArtistsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { useAdminDashboardArtistsStore } from "@/zustandStore/admin/adminStore/adminDashboardArtistsStore"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonAvatar from "@/components/shared/CommonAvatar"

const formatFollowers = (val) => {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  } else if (val >= 1000) {
    return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }
  return val.toString()
}

const formatRevenue = (val) => {
  let displayVal = "0"
  if (val >= 1000000) {
    displayVal = `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  } else if (val >= 1000) {
    displayVal = `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
  } else {
    displayVal = val.toString()
  }
  return `৳${displayVal}`
}

const ArtistsContainer = () => {
  const artistsList = useAdminDashboardArtistsStore((state) => state.artistsList)
  const selectedStatusFilter = useAdminDashboardArtistsStore((state) => state.selectedStatusFilter)
  const setSelectedStatusFilter = useAdminDashboardArtistsStore((state) => state.setSelectedStatusFilter)
  const searchQuery = useAdminDashboardArtistsStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardArtistsStore((state) => state.setSearchQuery)
  const currentPage = useAdminDashboardArtistsStore((state) => state.currentPage)
  const setCurrentPage = useAdminDashboardArtistsStore((state) => state.setCurrentPage)
  const deleteArtist = useAdminDashboardArtistsStore((state) => state.deleteArtist)

  const columns = getArtistsColumns({
    onViewDetails: (artist) => {
      console.log("View details", artist)
    },
    onEdit: (artist) => {
      console.log("Edit artist", artist)
    },
    onDelete: (artist) => {
      if (confirm(`Are you sure you want to delete ${artist.name}?`)) {
        deleteArtist(artist.id)
      }
    }
  })

  // Filter list
  const filteredArtists = artistsList.filter((artist) => {
    // Tab Filter
    if (selectedStatusFilter !== "All") {
      if (artist.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) {
        return false
      }
    }
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !artist.name.toLowerCase().includes(q) &&
        !artist.email.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination config
  const pageSize = 5
  const totalPages = Math.ceil(filteredArtists.length / pageSize) || 1
  const paginatedArtists = filteredArtists.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const tabs = ["All", "Verified", "Pending", "Suspended", "Info Required", "Rejected"]

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={tabs}
            activeTab={selectedStatusFilter}
            onChange={(tab) => setSelectedStatusFilter(tab)}
          />

          {/* Right Side: Search */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artists..."
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
          data={paginatedArtists}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-3">
          {paginatedArtists.map((artist) => {
            const statusColors = {
              Verified: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
              Rejected: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
              Pending: "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10",
              Suspended: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
              "Info Required": "text-[#3ADFFA] border-[#3ADFFA]/20 bg-[#3ADFFA]/10"
            }
            const colorClass = statusColors[artist.status] || statusColors.Pending

            return (
              <div key={artist.id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <CommonAvatar
                        src={artist.avatar || ""}
                        alt={artist.name}
                        className="w-10 h-10 rounded-full border border-white/5"
                      />
                      {artist.isVerified && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#FFAE00] rounded-full flex items-center justify-center border border-[#0E0E0E]">
                          <svg className="w-2.5 h-2.5 text-[#0E0E0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-whitetext font-semibold text-sm">{artist.name}</span>
                      <span className="text-light-gray/60 text-xs">{artist.email}</span>
                    </div>
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-normal select-none ${colorClass}`}>
                    {artist.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray uppercase">
                    {artist.genre}
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                    <span className={artist.songsCount > 0 ? "text-[#34C759] font-medium" : "text-light-gray/40"}>
                      {artist.songsCount}
                    </span> songs
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                    {formatFollowers(artist.followers)} followers
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-[#3ADFFA]/20 bg-[#3ADFFA]/10 text-[#3ADFFA] font-semibold">
                    {formatRevenue(artist.revenue)}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-3">
                  <Button
                    title="View Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                    onClick={() => {
                      console.log("View details", artist)
                    }}
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                  </Button>
                  <Button
                    title="Edit Artist"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                    onClick={() => {
                      console.log("Edit artist", artist)
                    }}
                  >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                  </Button>
                  <Button
                    title="Delete Artist"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${artist.name}?`)) {
                        deleteArtist(artist.id)
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={currentPage}
        totalItems={filteredArtists.length}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </CommonTableContainer>
  )
}

export default ArtistsContainer

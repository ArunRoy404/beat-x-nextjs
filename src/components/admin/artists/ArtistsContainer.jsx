"use client"

import React, { useEffect, useState } from "react"
import DataTable from "@/components/ui/DataTable"
import { getArtistsColumns } from "@/components/DataTableColumns/admin/artists/ArtistsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AddNewArtist from "@/components/admin/artists/AddNewArtist"
import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import CommonAvatar from "@/components/shared/CommonAvatar"
import DeleteArtistDialog from "@/components/dialogs/admin/artists/DeleteArtistDialog"
import ArtistDetailsDialog from "@/components/dialogs/admin/artists/ArtistDetailsDialog"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { useArtists } from "@/hooks/api/admin/artists/useArtists"
import { buildArtistsParams } from "@/hooks/api/admin/artists/artistsParams"

const STATUS_TABS = ["All", "Pending", "Approved", "Suspended", "Rejected"]
const SEARCH_DEBOUNCE_MS = 300
const ARTISTS_PAGE_SIZE = 20

const formatFollowers = (val) => {
  if (!val) return "0"
  if (val >= 1000000) return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  if (val >= 1000) return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}k`
  return val.toString()
}

const formatRevenue = (val) => {
  if (!val) return "৳0"
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
  const { get, setParams } = useUrlListParams()

  const selectedTab = get("tab", "all")
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

  const params = buildArtistsParams({
    tab: selectedTab,
    q: urlSearch,
    page: currentPage,
    limit: ARTISTS_PAGE_SIZE,
  })

  const { data, isLoading, isError, error, refetch } = useArtists(params)

  const rawArtists = data?.data ?? (Array.isArray(data) ? data : [])
  const artistsList = Array.isArray(rawArtists) ? rawArtists : []
  const total = data?.total ?? artistsList.length
  const limit = data?.limit ?? ARTISTS_PAGE_SIZE
  const totalPages = Math.ceil(total / limit) || 1

  const stats = data?.stats || data?.data?.stats || {}
  const statsCards = [
    {
      id: 1,
      title: "Total Artists",
      value: (stats.total ?? total).toString(),
      icon: "Mic",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)",
      layout: "vertical",
    },
    {
      id: 2,
      title: "Verified",
      value: (stats.verified ?? stats.approved ?? 0).toString(),
      icon: "CheckCircle",
      iconColor: "#34C759",
      iconBg: "rgba(52, 199, 89, 0.15)",
      layout: "vertical",
    },
    {
      id: 3,
      title: "Pending Review",
      value: (stats.pending ?? 0).toString(),
      icon: "Clock",
      iconColor: "#FFAE00",
      iconBg: "rgba(255, 174, 0, 0.15)",
      layout: "vertical",
    },
    {
      id: 4,
      title: "Suspended",
      value: (stats.suspended ?? 0).toString(),
      icon: "XCircle",
      iconColor: "#ED1010",
      iconBg: "rgba(237, 16, 16, 0.15)",
      layout: "vertical",
    },
  ]

  const columns = getArtistsColumns()

  const activeTabName =
    STATUS_TABS.find((tab) => tab.toLowerCase() === selectedTab.toLowerCase()) || "All"

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Register new artist banner */}
      <AddNewArtist />

      <CommonTableContainer
        headerChildren={
          <>
            {/* Tab pills */}
            <CommonFilter
              tabs={STATUS_TABS}
              activeTab={activeTabName}
              onChange={(tab) =>
                setParams({ tab: tab.toLowerCase() === "all" ? undefined : tab.toLowerCase() })
              }
            />

            {/* Right Side: Search */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <CommonSearch
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search artists..."
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
            <span className="text-red-error text-sm">{error?.message || "Failed to load artists."}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop view */}
            <div className="hidden md:block">
              <DataTable columns={columns} data={artistsList} />
            </div>

            {/* Mobile view */}
            <div className="block md:hidden">
              <div className="flex flex-col gap-3">
                {artistsList.map((artist) => {
                  const name =
                    artist?.personalInfo?.stageName ||
                    artist?.personalInfo?.fullName ||
                    artist?.user?.name ||
                    artist?.userId?.name ||
                    artist?.name ||
                    "-"
                  const email = artist?.user?.email || artist?.userId?.email || artist?.email || "-"
                  const avatar = artist?.mediaAssets?.profilePictureUrl || artist?.avatar || ""
                  const rawStatus = (artist?.status || "pending").toLowerCase()
                  const statusLabels = {
                    approved: "Verified",
                    verified: "Verified",
                    pending: "Pending",
                    rejected: "Rejected",
                    suspended: "Suspended",
                  }
                  const displayStatus = statusLabels[rawStatus] || rawStatus
                  const statusColors = {
                    Verified: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
                    Approved: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
                    Rejected: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
                    Pending: "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10",
                    Suspended: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
                    "Info Required": "text-[#3ADFFA] border-[#3ADFFA]/20 bg-[#3ADFFA]/10",
                  }
                  const colorClass = statusColors[displayStatus] || statusColors.Pending
                  const genre =
                    artist?.genre?.name ||
                    (Array.isArray(artist?.genres) && artist?.genres[0]?.name) ||
                    (typeof artist?.genre === "string" ? artist.genre : "-")
                  const isVerified =
                    rawStatus === "approved" || rawStatus === "verified" || Boolean(artist?.isVerified)

                  return (
                    <div
                      key={artist._id || artist.id}
                      className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <CommonAvatar
                              src={avatar}
                              alt={name}
                              className="w-10 h-10 rounded-full border border-white/5"
                            />
                            {isVerified && (
                              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#FFAE00] rounded-full flex items-center justify-center border border-[#0E0E0E]">
                                <svg className="w-2.5 h-2.5 text-[#0E0E0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-whitetext font-semibold text-sm">{name}</span>
                            <span className="text-light-gray/60 text-xs">{email}</span>
                          </div>
                        </div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-normal select-none capitalize ${colorClass}`}>
                          {displayStatus}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray uppercase">
                          {genre}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                          <span className={(artist?.songsCount || 0) > 0 ? "text-[#34C759] font-medium" : "text-light-gray/40"}>
                            {artist?.songsCount || 0}
                          </span>{" "}
                          songs
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                          {formatFollowers(artist?.followers || 0)} followers
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-[#3ADFFA]/20 bg-[#3ADFFA]/10 text-[#3ADFFA] font-semibold">
                          {formatRevenue(artist?.revenue || 0)}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-3">
                        <ArtistDetailsDialog artist={artist}>
                          <Button
                            title="View Details"
                            size="icon"
                            variant="outline"
                            className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 shrink-0" />
                          </Button>
                        </ArtistDetailsDialog>
                        <DeleteArtistDialog artist={artist}>
                          <Button
                            title="Delete Artist"
                            size="icon"
                            variant="outline"
                            className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                          </Button>
                        </DeleteArtistDialog>
                      </div>
                    </div>
                  )
                })}

                {artistsList.length === 0 && (
                  <div className="py-20 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[24px]">
                    No artists found.
                  </div>
                )}
              </div>
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
    </div>
  )
}

export default ArtistsContainer

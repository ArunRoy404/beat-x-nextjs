"use client"

import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getAlbumsColumns } from "@/components/DataTableColumns/admin/AlbumsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import CreateAlbumDialog from "@/components/dialogs/admin/CreateAlbumDialog"
import AlbumDetailsDialog from "@/components/dialogs/admin/AlbumDetailsDialog"
import DeleteAlbumDialog from "@/components/dialogs/admin/DeleteAlbumDialog"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import { Shield, Sparkles, Trash2, Eye, FolderPlus, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonAvatar from "@/components/shared/CommonAvatar"

const AlbumsContainer = () => {
  const albumsList = useAdminDashboardAlbumsStore((state) => state.albumsList)
  const selectedStatusFilter = useAdminDashboardAlbumsStore((state) => state.selectedStatusFilter)
  const setSelectedStatusFilter = useAdminDashboardAlbumsStore((state) => state.setSelectedStatusFilter)
  const searchQuery = useAdminDashboardAlbumsStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardAlbumsStore((state) => state.setSearchQuery)

  const columns = getAlbumsColumns()

  // Filter list
  const filteredAlbums = albumsList.filter((album) => {
    // Tab Filter
    if (selectedStatusFilter !== "All") {
      const filterLower = selectedStatusFilter.toLowerCase()
      if (filterLower === "my songs") {
        if (album.artist.toLowerCase() !== "tahsin") return false
      } else {
        if (album.status.toLowerCase() !== filterLower) return false
      }
    }
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !album.name.toLowerCase().includes(q) &&
        !album.artist.toLowerCase().includes(q) &&
        !album.genre.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Format streams helper
  const formatStreams = (val) => {
    const num = val || 0
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Create New Album Action Banner */}
      <div className="relative overflow-hidden rounded-[16px] border border-[#A175FF]/20 bg-gradient-to-r from-[#A175FF]/10 to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
        />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#A175FF]/20 border border-[#A175FF]/30 flex items-center justify-center text-[#A175FF] shrink-0">
            <FolderPlus className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-whitetext font-bold text-[18px] tracking-tight">Create New Album</h3>
            <p className="text-light-gray/60 text-sm mt-0.5">
              Organise your songs into an album — add cover art, tracklist and release info
            </p>
          </div>
        </div>

        <div className="relative z-10 shrink-0">
          <CreateAlbumDialog />
        </div>
      </div>

      {/* Main Table Container */}
      <CommonTableContainer
        headerChildren={
          <>
            {/* Tab pills */}
            <CommonFilter
              tabs={["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]}
              activeTab={selectedStatusFilter}
              onChange={(tab) => setSelectedStatusFilter(tab)}
            />

            {/* Right Side: Search */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <CommonSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search albums..."
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
            data={filteredAlbums}
          />
        </div>

        {/* Mobile view */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-3">
            {filteredAlbums.map((album) => (
              <div key={album.id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CommonAvatar src={album.avatar || ""} alt={album.name} className="w-10 h-10 rounded-[6px] border border-white/5" />
                    <div className="flex flex-col">
                      <span className="text-whitetext font-semibold text-sm">{album.name}</span>
                      <span className="text-light-gray/60 text-xs">{album.artist}</span>
                    </div>
                  </div>
                  <span className={`text-[12px] font-semibold select-none ${
                    album.status === "Published" 
                      ? "text-[#34C759]" 
                      : album.status === "Rejected" 
                      ? "text-[#FF453A]" 
                      : "text-[#FFCC00]"
                  }`}>
                    {album.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray">
                    {album.genre}
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray">
                    {album.tracksCount} tracks
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray">
                    {album.duration}
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                    {formatStreams(album.streams)} streams
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-white/40 text-[10px] uppercase font-semibold">
                    Released {album.released}
                  </span>
                  <div className="flex items-center gap-2">
                    <AlbumDetailsDialog album={album}>
                      <Button
                        title="View Details"
                        size="icon"
                        variant="outline"
                        className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                      </Button>
                    </AlbumDetailsDialog>
                    <DeleteAlbumDialog album={album}>
                      <Button
                        title="Delete Album"
                        size="icon"
                        variant="outline"
                        className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                      </Button>
                    </DeleteAlbumDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Bar */}
        <CommonPagination
          currentPage={1}
          totalItems={filteredAlbums.length}
          pageSize={5}
          totalPages={Math.ceil(filteredAlbums.length / 5) || 1}
        />
      </CommonTableContainer>
    </div>
  )
}

export default AlbumsContainer

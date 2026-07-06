"use client"

import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getGenresColumns } from "@/components/DataTableColumns/admin/GenresColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import AddGenreDialog from "@/components/dialogs/admin/AddGenreDialog"
import EditGenreDialog from "@/components/dialogs/admin/EditGenreDialog"
import DeleteGenreDialog from "@/components/dialogs/admin/DeleteGenreDialog"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import { Tag, Pencil, Trash2 } from "lucide-react"

const GenresContainer = () => {
  const genresList = useAdminDashboardGenreStore((state) => state.genresList)
  const selectedTypeFilter = useAdminDashboardGenreStore((state) => state.selectedTypeFilter)
  const setSelectedTypeFilter = useAdminDashboardGenreStore((state) => state.setSelectedTypeFilter)
  const searchQuery = useAdminDashboardGenreStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardGenreStore((state) => state.setSearchQuery)

  const columns = getGenresColumns()

  // Filter list
  const filteredGenres = genresList.filter((genre) => {
    // Type Filter
    if (selectedTypeFilter !== "All") {
      if (genre.type.toLowerCase() !== selectedTypeFilter.toLowerCase()) {
        return false
      }
    }
    // Search Query
    if (searchQuery.trim() !== "") {
      if (!genre.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
    }
    return true
  })

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={["All", "Music", "Podcast", "Audiobook"]}
            activeTab={selectedTypeFilter}
            onChange={(tab) => setSelectedTypeFilter(tab)}
          />

          {/* Right Side: Search + Add Genre */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ....."
              className="flex-1 md:w-72"
            />
            <AddGenreDialog />
          </div>
        </>
      }
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={filteredGenres}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-3">
          {filteredGenres.map((genre) => (
            <div key={genre.id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-whitetext font-semibold text-sm">{genre.name}</span>
                    <span className="text-light-gray/60 text-xs">{genre.type}</span>
                  </div>
                </div>
                <span className={`text-[12px] font-semibold select-none ${genre.status === "Active" ? "text-[#34C759]" : "text-[#FF453A]"}`}>
                  {genre.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase font-semibold">Count</span>
                  <span className="text-whitetext font-medium text-sm">{(genre.count || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EditGenreDialog genre={genre}>
                    <button className="text-[#3ADFFA] hover:text-[#3ADFFA]/80 transition-colors p-1.5 hover:bg-[#3ADFFA]/10 rounded-[8px] cursor-pointer">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </EditGenreDialog>
                  <DeleteGenreDialog genre={genre}>
                    <button className="text-[#FF453A] hover:text-[#FF453A]/80 transition-colors p-1.5 hover:bg-[#FF453A]/10 rounded-[8px] cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </DeleteGenreDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={1}
        totalItems={filteredGenres.length}
        pageSize={5}
        totalPages={Math.ceil(filteredGenres.length / 5) || 1}
      />
    </CommonTableContainer>
  )
}

export default GenresContainer

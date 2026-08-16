"use client"

import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import DataTable from "@/components/ui/DataTable"
import { getGenresColumns } from "@/components/DataTableColumns/admin/genre/GenresColumns"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import AddGenreDialog from "@/components/dialogs/admin/genre/AddGenreDialog"
import EditGenreDialog from "@/components/dialogs/admin/genre/EditGenreDialog"
import DeleteGenreDialog from "@/components/dialogs/admin/genre/DeleteGenreDialog"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"
import { useSearchGenres } from "@/hooks/api/admin/genre/useSearchGenres"
import { Tag, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const SEARCH_DEBOUNCE_MS = 300

const GenresContainer = () => {
  const searchQuery = useAdminDashboardGenreStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardGenreStore((state) => state.setSearchQuery)

  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchQuery.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const isSearching = debouncedSearch.length > 0

  const listQuery = useGenres()
  const searchResultQuery = useSearchGenres(debouncedSearch)

  const { data: genresList = [], isLoading, isError, error, refetch } = isSearching
    ? searchResultQuery
    : listQuery

  const columns = getGenresColumns()

  return (
    <CommonTableContainer
      headerChildren={
        <>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search genres..."
              className="flex-1 md:w-72"
            />
          </div>
          <AddGenreDialog />
        </>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-secondary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="text-red-error text-sm">{error?.message || "Failed to load genres."}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block">
            <DataTable
              columns={columns}
              data={genresList}
            />
          </div>

          {/* Mobile view */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-3">
              {genresList.map((genre) => (
                <div key={genre._id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <span className="text-whitetext font-semibold text-sm">{genre.name}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-white/40 text-[10px] uppercase font-semibold">
                      Created {genre.createdAt ? format(new Date(genre.createdAt), "MMM d, yyyy") : "-"}
                    </span>
                    <div className="flex items-center gap-2">
                      <EditGenreDialog genre={genre}>
                        <Button
                          title="Edit Genre"
                          size="icon"
                          variant="outline"
                          className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 shrink-0" />
                        </Button>
                      </EditGenreDialog>
                      <DeleteGenreDialog genre={genre}>
                        <Button
                          title="Delete Genre"
                          size="icon"
                          variant="outline"
                          className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                        </Button>
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
            totalItems={genresList.length}
            pageSize={5}
            totalPages={Math.ceil(genresList.length / 5) || 1}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default GenresContainer

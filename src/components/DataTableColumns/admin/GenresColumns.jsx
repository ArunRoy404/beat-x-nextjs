import React from "react"
import { Pencil, Trash2, Tag } from "lucide-react"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import EditGenreDialog from "@/components/dialogs/admin/EditGenreDialog"
import DeleteGenreDialog from "@/components/dialogs/admin/DeleteGenreDialog"
import { Button } from "@/components/ui/button"

export const getGenresColumns = () => [
  {
    accessorKey: "name",
    header: () => <CommonTableHeader>Genre Name</CommonTableHeader>,
    cell: ({ row }) => {
      const genre = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <span className="text-whitetext font-semibold text-sm">
            {genre.name}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "type",
    header: () => <CommonTableHeader>Type</CommonTableHeader>,
    cell: ({ getValue }) => {
      const type = getValue()
      let colorClass = "text-[#3ADFFA] bg-[#3ADFFA]/10 border-[#3ADFFA]/20"
      if (type === "Podcast") {
        colorClass = "text-[#CC97FF] bg-[#CC97FF]/10 border-[#CC97FF]/20"
      } else if (type === "Audiobook") {
        colorClass = "text-[#E5F97D] bg-[#E5F97D]/10 border-[#E5F97D]/20"
      }
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none ${colorClass}`}>
            {type?.toLowerCase()}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "count",
    header: () => <CommonTableHeader>Content Count</CommonTableHeader>,
    cell: ({ row }) => {
      const count = row.original.count || 0
      const progress = row.original.progress || 0
      return (
        <div className="flex items-center gap-4 min-w-[120px]">
          <span className="text-whitetext font-medium text-sm min-w-[50px]">
            {count.toLocaleString()}
          </span>
          <div className="w-20 bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-[#3ADFFA] rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => {
      const status = getValue()
      const isActive = status === "Active"
      return (
        <span className={`text-[12px] font-semibold select-none ${isActive ? "text-[#34C759]" : "text-[#FF453A]"}`}>
          {status}
        </span>
      )
    }
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const genre = row.original

      return (
        <div className="flex items-center justify-end gap-2.5 pr-4">
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
      )
    }
  }
]

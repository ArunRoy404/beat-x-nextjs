import React from "react"
import { Pencil, Trash2, Tag } from "lucide-react"
import { format } from "date-fns"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import EditGenreDialog from "@/components/dialogs/admin/genre/EditGenreDialog"
import DeleteGenreDialog from "@/components/dialogs/admin/genre/DeleteGenreDialog"
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
    accessorKey: "createdAt",
    header: () => <CommonTableHeader>Created</CommonTableHeader>,
    cell: ({ getValue }) => {
      const value = getValue()
      return (
        <CommonTableCell>
          {value ? format(new Date(value), "MMM d, yyyy") : "-"}
        </CommonTableCell>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: () => <CommonTableHeader>Updated</CommonTableHeader>,
    cell: ({ getValue }) => {
      const value = getValue()
      return (
        <CommonTableCell>
          {value ? format(new Date(value), "MMM d, yyyy") : "-"}
        </CommonTableCell>
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

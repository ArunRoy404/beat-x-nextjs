import React from "react"
import { Eye, Pencil, Trash2 } from "lucide-react"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Button } from "@/components/ui/button"
import AlbumDetailsDialog from "@/components/dialogs/admin/AlbumDetailsDialog"
import EditAlbumDialog from "@/components/dialogs/admin/EditAlbumDialog"
import DeleteAlbumDialog from "@/components/dialogs/admin/DeleteAlbumDialog"

export const getAlbumsColumns = () => [
  {
    accessorKey: "name",
    header: () => <CommonTableHeader>Album</CommonTableHeader>,
    cell: ({ row }) => {
      const album = row.original
      return (
        <div className="flex items-center gap-3">
          <CommonAvatar
            src={album.avatar || ""}
            alt={album.name}
            className="w-10 h-10 rounded-[6px] border border-white/5 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-whitetext font-semibold text-sm truncate">{album.name}</span>
            <span className="text-light-gray/60 text-xs truncate">{album.artist}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "tracksCount",
    header: () => <CommonTableHeader>Tracks</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>{getValue() || 0} tracks</CommonTableCell>
    )
  },
  {
    accessorKey: "duration",
    header: () => <CommonTableHeader>Duration</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>{getValue() || "0 min"}</CommonTableCell>
    )
  },
  {
    accessorKey: "streams",
    header: () => <CommonTableHeader>Streams</CommonTableHeader>,
    cell: ({ getValue }) => {
      const val = getValue() || 0
      let displayVal = "0"
      if (val >= 1000000) {
        displayVal = `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
      } else if (val >= 1000) {
        displayVal = `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
      } else {
        displayVal = val.toString()
      }
      return <CommonTableCell>{displayVal}</CommonTableCell>
    }
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => {
      const status = getValue()
      const statusColors = {
        Published: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
        Rejected: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
        "Under Review": "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10",
        Scheduled: "text-[#CC97FF] border-[#CC97FF]/20 bg-[#CC97FF]/10",
      }
      const colorClass = statusColors[status] || statusColors.Scheduled
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none ${colorClass}`}>
            {status}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "released",
    header: () => <CommonTableHeader>Released</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>{getValue() || "-"}</CommonTableCell>
    )
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const album = row.original

      return (
        <div className="flex items-center justify-end gap-2.5 pr-4">
          <AlbumDetailsDialog album={album}>
            <Button
              title="View Details"
              size="icon"
              variant="outline"
              className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer animate-none"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
            </Button>
          </AlbumDetailsDialog>
          <EditAlbumDialog album={album}>
            <Button
              title="Edit Album"
              size="icon"
              variant="outline"
              className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer animate-none"
            >
              <Pencil className="w-3.5 h-3.5 shrink-0" />
            </Button>
          </EditAlbumDialog>
          <DeleteAlbumDialog album={album}>
            <Button
              title="Delete Album"
              size="icon"
              variant="outline"
              className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer animate-none"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
            </Button>
          </DeleteAlbumDialog>
        </div>
      )
    }
  }
]

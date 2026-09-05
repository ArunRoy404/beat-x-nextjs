import React from "react"
import { format } from "date-fns"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import AlbumsTableActions from "@/components/admin/albums/AlbumsTableActions"
import { formatDurationMs } from "@/lib/format/formatDuration"

export const getAlbumsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Album</CommonTableHeader>,
    cell: ({ row }) => {
      const album = row.original
      return (
        <CommonSongCell
          title={album?.title}
          duration={formatDurationMs(album?.totalDurationMs)}
          cover={album?.coverUrl}
        />
      )
    }
  },
  {
    accessorKey: "artist",
    header: () => <CommonTableHeader>Artist</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "genre",
    header: () => <CommonTableHeader>Genre</CommonTableHeader>,
    cell: ({ getValue }) => {
      const val = getValue()
      return (
        <CommonTableTag>
          {val?.name || (typeof val === "string" ? val : "-")}
        </CommonTableTag>
      )
    }
  },
  {
    accessorKey: "totalSongs",
    header: () => <CommonTableHeader>Songs</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStat value={getValue() ?? 0} />
    )
  },
  {
    accessorKey: "publishedAt",
    header: () => <CommonTableHeader>Released</CommonTableHeader>,
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
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStatus status={getValue()} />
    )
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const album = row.original
      return (
        <AlbumsTableActions status={album?.status} album={album} />
      )
    }
  }
]

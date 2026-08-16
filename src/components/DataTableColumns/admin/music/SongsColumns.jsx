import React from "react"
import { format } from "date-fns"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import SongsTableActions from "@/components/admin/music/SongsContainer/SongsTableActions"
import { formatDurationMs } from "@/lib/format/formatDuration"

export const getSongsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Song</CommonTableHeader>,
    cell: ({ row }) => {
      const song = row.original
      return (
        <CommonSongCell
          title={song?.title}
          duration={formatDurationMs(song?.durationMs)}
          cover={song?.coverUrl}
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
    accessorKey: "album",
    header: () => <CommonTableHeader>Album</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue()?.name || getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "genre",
    header: () => <CommonTableHeader>Genre</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableTag>
        {getValue()?.name || "-"}
      </CommonTableTag>
    )
  },
  {
    accessorKey: "playCount",
    header: () => <CommonTableHeader>Streams</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStat value={getValue()} />
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
      const song = row.original
      return (
        <SongsTableActions status={song?.status} song={song} />
      )
    }
  }
]

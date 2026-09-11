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
import { normalizeSongStatus } from "@/lib/constants/songStatus"

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
    cell: ({ getValue }) => {
      const val = getValue()
      const text = typeof val === "object" && val !== null ? val?.name || val?.title || "-" : val || "-"
      return <CommonTableCell>{text}</CommonTableCell>
    }
  },
  {
    accessorKey: "album",
    header: () => <CommonTableHeader>Album</CommonTableHeader>,
    cell: ({ getValue }) => {
      const val = getValue()
      const text = typeof val === "object" && val !== null ? val?.title || val?.name || "-" : val || "-"
      return <CommonTableCell>{text}</CommonTableCell>
    }
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
      let dateText = "-"
      if (value) {
        const d = new Date(value)
        if (!isNaN(d.getTime())) {
          dateText = format(d, "MMM d, yyyy")
        }
      }
      return <CommonTableCell>{dateText}</CommonTableCell>
    }
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStatus status={normalizeSongStatus(getValue())} />
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

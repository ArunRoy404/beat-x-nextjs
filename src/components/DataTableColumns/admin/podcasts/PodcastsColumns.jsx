import React from "react"
import { format } from "date-fns"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import PodcastsTableActions from "@/components/admin/podcasts/PodcastsContainer/PodcastsTableActions"
import { formatDurationMs } from "@/lib/format/formatDuration"

export const getPodcastsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Podcast</CommonTableHeader>,
    cell: ({ row }) => {
      const podcast = row.original
      return (
        <CommonSongCell
          title={podcast?.title}
          duration={formatDurationMs(podcast?.totalDurationMs)}
          cover={podcast?.coverUrl}
        />
      )
    }
  },
  {
    accessorKey: "ownerId",
    header: () => <CommonTableHeader>Owner</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue()?.name || "-"}
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
    accessorKey: "totalEpisodes",
    header: () => <CommonTableHeader>Episodes</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStat value={getValue() ?? 0} />
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
      const podcast = row.original
      return (
        <PodcastsTableActions status={podcast?.status} podcast={podcast} />
      )
    }
  }
]

import React from "react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import PodcastsTableActions from "@/components/artist/podcasts/PodcastsContainer/PodcastsTableActions"

export const getPodcastsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Episodes</CommonTableHeader>,
    cell: ({ row }) => {
      const podcast = row.original
      return (
        <CommonSongCell
          title={podcast?.title}
          duration={podcast?.duration}
          cover={podcast?.cover}
        />
      )
    }
  },
  {
    accessorKey: "series",
    header: () => <CommonTableHeader>Series</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "season",
    header: () => <CommonTableHeader>Season</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        S{getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "episode",
    header: () => <CommonTableHeader>Ep #</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        EP {getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "listeners",
    header: () => <CommonTableHeader>Listeners</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStat value={getValue()} />
    )
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

import React from "react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import PodcastsTableActions from "@/components/admin/podcasts/PodcastsContainer/PodcastsTableActions"

export const getPodcastsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Podcasts</CommonTableHeader>,
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
    accessorKey: "artist",
    header: () => <CommonTableHeader>Artist</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
    )
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
    accessorKey: "genre",
    header: () => <CommonTableHeader>Category</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableTag>
        {getValue()}
      </CommonTableTag>
    )
  },
  {
    accessorKey: "streams",
    header: () => <CommonTableHeader>Streams</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableStat value={getValue()} />
    )
  },
  {
    accessorKey: "released",
    header: () => <CommonTableHeader>Released</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
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

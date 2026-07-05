import React from "react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import CommonTableActions from "@/components/shared/CommonTable/CommonTableActions"

export const getSongsColumns = () => [
  {
    accessorKey: "title",
    header: () => <CommonTableHeader>Songs</CommonTableHeader>,
    cell: ({ row }) => {
      const song = row.original
      return (
        <CommonSongCell
          title={song?.title}
          duration={song?.duration}
          cover={song?.cover}
        />
      )
    }
  },
  {
    accessorKey: "album",
    header: () => <CommonTableHeader>Album</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "genre",
    header: () => <CommonTableHeader>Genre</CommonTableHeader>,
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
      const song = row.original
      const status = song?.status

      return (
        <CommonTableActions status={status} />
      )
    }
  }
]


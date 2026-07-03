import React from "react"
import { Eye, Check, X, Trash2, TrendingUp } from "lucide-react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"

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
      <div className="flex">
        <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] uppercase font-normal select-none">
          {getValue()}
        </span>
      </div>
    )
  },
  {
    accessorKey: "streams",
    header: () => <CommonTableHeader>Streams</CommonTableHeader>,
    cell: ({ getValue }) => {
      const streams = getValue()
      const hasStreams = streams && streams !== "0" && streams !== "-"
      return (
        <div className="flex items-center gap-1">
          {hasStreams ? (
            <>
              <TrendingUp className="w-3.5 h-3.5 text-green-success shrink-0" />
              <span className="text-green-success text-[14px] font-normal">~ {streams}</span>
            </>
          ) : (
            <span className="text-[14px] font-normal text-dark-gray select-none">~ 0</span>
          )}
        </div>
      )
    }
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
    cell: ({ getValue }) => {
      const status = getValue()
      return (
        <div className="flex">
          {status === "Published" && (
            <span className="border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
              Published
            </span>
          )}
          {status === "Under Review" && (
            <span className="border border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-warning animate-pulse" />
              Under Review
            </span>
          )}
          {status === "Scheduled" && (
            <span className="border border-yellow-warning/30 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
              Scheduled
            </span>
          )}
          {status === "Draft" && (
            <span className="border border-white/10 bg-white/[0.05] text-light-gray text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
              Draft
            </span>
          )}
          {status === "Rejected" && (
            <span className="border border-red-error/20 bg-red-error/10 text-red-error text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
              Rejected
            </span>
          )}
          {status === "Take Down" && (
            <span className="border border-secondary/20 bg-secondary/10 text-secondary text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
              Take Down
            </span>
          )}
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const song = row.original
      const status = song?.status

      return (
        <div className="flex items-center justify-end gap-3 pr-2">
          {/* Details circle button */}
          <button
            className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center cursor-pointer select-none"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Conditional status-based actions */}
          {status === "Published" && (
            <button
              className="border border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning text-[12px] font-semibold py-1 px-3 rounded-full cursor-pointer select-none whitespace-nowrap"
            >
              Take Down
            </button>
          )}

          {status === "Take Down" && (
            <button
              className="border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-semibold py-1 px-3 rounded-full cursor-pointer select-none whitespace-nowrap"
            >
              Restore
            </button>
          )}

          {status === "Under Review" && (
            <>
              <button
                className="w-7 h-7 rounded-full bg-green-success/10 border border-green-success/20 text-green-success flex items-center justify-center cursor-pointer select-none"
                title="Approve"
              >
                <Check className="w-3.5 h-3.5 shrink-0" />
              </button>
              <button
                className="w-7 h-7 rounded-full bg-red-error/10 border border-red-error/20 text-red-error flex items-center justify-center cursor-pointer select-none"
                title="Reject"
              >
                <X className="w-3.5 h-3.5 shrink-0" />
              </button>
            </>
          )}

          {/* Delete icon */}
          <button
            className="text-red-error bg-transparent border-0 p-1 flex items-center justify-center select-none"
            title="Delete Song"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )
    }
  }
]

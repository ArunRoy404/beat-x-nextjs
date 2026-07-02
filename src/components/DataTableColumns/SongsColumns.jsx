import React from "react"
import { Eye, Edit, Trash2, TrendingUp } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"

export const getSongsColumns = ({ onViewDetails, onEdit, onDelete } = {}) => [
  {
    accessorKey: "title",
    header: "Songs",
    cell: ({ row }) => {
      const song = row.original
      return (
        <div className="flex items-center gap-3">
          <CommonAvatar
            src={song?.cover}
            className="w-10 h-10 rounded-[8px]"
            alt={song?.title}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-whitetext text-[14px] font-normal truncate">
              {song?.title}
            </span>
            <span className="text-dark-gray text-[12px] font-normal">
              {song?.duration}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "album",
    header: "Album",
    cell: ({ getValue }) => (
      <span className="text-light-gray text-[14px] font-normal truncate max-w-[120px] block">
        {getValue()}
      </span>
    )
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ getValue }) => (
      <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] uppercase font-normal">
        {getValue()}
      </span>
    )
  },
  {
    accessorKey: "streams",
    header: "Streams",
    cell: ({ getValue }) => {
      const streams = getValue()
      const hasStreams = parseFloat(streams) > 0
      return (
        <div className="flex items-center gap-1">
          {hasStreams ? (
            <>
              <TrendingUp className="w-3.5 h-3.5 text-green-success shrink-0" />
              <span className="text-green-success text-[14px] font-normal">{streams}</span>
            </>
          ) : (
            <span className="text-[14px] font-normal text-dark-gray">~ 0</span>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "released",
    header: "Released",
    cell: ({ getValue }) => (
      <span className="text-light-gray text-[14px] font-normal">
        {getValue()}
      </span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue()
      return (
        <>
          {status === "Published" && (
            <span className="border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-normal px-2.5 py-0.5 rounded-full">
              Published
            </span>
          )}
          {status === "Under Review" && (
            <span className="border border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full">
              Under Review
            </span>
          )}
          {status === "Scheduled" && (
            <span className="border border-yellow-warning/40 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full">
              Scheduled
            </span>
          )}
          {status === "Draft" && (
            <span className="border border-white/10 bg-white/[0.05] text-light-gray text-[12px] font-normal px-2.5 py-0.5 rounded-full">
              Draft
            </span>
          )}
          {status === "Rejected" && (
            <span className="border border-red-error/20 bg-red-error/10 text-red-error text-[12px] font-normal px-2.5 py-0.5 rounded-full">
              Rejected
            </span>
          )}
        </>
      )
    }
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Action</div>,
    cell: ({ row }) => {
      const song = row.original
      return (
        <div className="flex items-center justify-end gap-3.5 pr-2">
          {/* Details button */}
          <span
            onClick={() => onViewDetails?.(song)}
            className="border border-secondary bg-secondary/15 text-secondary text-[11px] font-semibold py-1 px-3 rounded-full flex items-center gap-1 select-none cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>Details</span>
          </span>

          {/* Edit icon */}
          <span
            onClick={() => onEdit?.(song)}
            className="text-secondary cursor-pointer"
          >
            <Edit className="w-4 h-4 shrink-0" />
          </span>

          {/* Delete icon */}
          <span
            onClick={() => onDelete?.(song)}
            className="text-red-error cursor-pointer"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
          </span>
        </div>
      )
    }
  }
]

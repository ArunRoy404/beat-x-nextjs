import { Eye, SquarePen, Trash2 } from "lucide-react"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Button } from "@/components/ui/button"
import DeleteArtistDialog from "@/components/dialogs/admin/artists/DeleteArtistDialog"
import ArtistDetailsDialog from "@/components/dialogs/admin/artists/ArtistDetailsDialog"

const formatFollowers = (val) => {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  } else if (val >= 1000) {
    return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }
  return val.toString()
}

const formatRevenue = (val) => {
  let displayVal = "0"
  if (val >= 1000000) {
    displayVal = `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  } else if (val >= 1000) {
    displayVal = `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
  } else {
    displayVal = val.toString()
  }
  return `৳${displayVal}`
}

export const getArtistsColumns = ({ onViewDetails, onEdit, onDelete } = {}) => [
  {
    accessorKey: "name",
    header: () => <CommonTableHeader>Artist</CommonTableHeader>,
    cell: ({ row }) => {
      const artist = row.original
      const name =
        artist?.personalInfo?.stageName ||
        artist?.personalInfo?.fullName ||
        artist?.user?.name ||
        artist?.userId?.name ||
        artist?.name ||
        "-"
      const email = artist?.user?.email || artist?.userId?.email || artist?.email || "-"
      const avatar = artist?.mediaAssets?.profilePictureUrl || artist?.avatar || ""
      const isVerified =
        artist?.status === "approved" || artist?.status === "verified" || Boolean(artist?.isVerified)

      return (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <CommonAvatar
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full border border-white/5"
            />
            {isVerified && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#FFAE00] rounded-full flex items-center justify-center border border-[#0E0E0E]">
                <svg className="w-2.5 h-2.5 text-[#0E0E0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-whitetext font-semibold text-sm truncate">{name}</span>
            <span className="text-light-gray/60 text-xs truncate">{email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "genre",
    header: () => <CommonTableHeader>Genre</CommonTableHeader>,
    cell: ({ row }) => {
      const artist = row.original
      const val =
        artist?.genre?.name ||
        (Array.isArray(artist?.genres) && artist?.genres[0]?.name) ||
        (typeof artist?.genre === "string" ? artist.genre : "-")
      return (
        <CommonTableTag className="border-white/20 text-light-gray text-[11px]">
          {val}
        </CommonTableTag>
      )
    }
  },
  {
    accessorKey: "songsCount",
    header: () => <CommonTableHeader>Songs</CommonTableHeader>,
    cell: ({ row }) => {
      const val = row.original?.songsCount || 0
      if (val > 0) {
        return (
          <span className="text-[#34C759] text-[14px] font-semibold">
            {val}
          </span>
        )
      }
      return (
        <span className="text-light-gray/40 text-[14px]">
          0
        </span>
      )
    }
  },
  {
    accessorKey: "followers",
    header: () => <CommonTableHeader>Followers</CommonTableHeader>,
    cell: ({ row }) => (
      <CommonTableCell>
        {formatFollowers(row.original?.followers || 0)}
      </CommonTableCell>
    )
  },
  {
    accessorKey: "revenue",
    header: () => <CommonTableHeader>Revenue</CommonTableHeader>,
    cell: ({ row }) => {
      const val = row.original?.revenue || 0
      return (
        <span className="text-[#3ADFFA] text-[14px] font-semibold">
          {formatRevenue(val)}
        </span>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ row }) => {
      const rawStatus = (row.original?.status || "pending").toLowerCase()
      const statusLabels = {
        approved: "Verified",
        verified: "Verified",
        pending: "Pending",
        rejected: "Rejected",
        suspended: "Suspended",
      }
      const displayStatus = statusLabels[rawStatus] || rawStatus
      const statusColors = {
        Verified: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
        Approved: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
        Rejected: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
        Pending: "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10",
        Suspended: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
        "Info Required": "text-[#3ADFFA] border-[#3ADFFA]/20 bg-[#3ADFFA]/10"
      }
      const colorClass = statusColors[displayStatus] || statusColors.Pending
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none capitalize ${colorClass}`}>
            {displayStatus}
          </span>
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const artist = row.original

      return (
        <div className="flex items-center justify-end gap-3 pr-2">
          <ArtistDetailsDialog artist={artist}>
            <Button
              title="View Details"
              size="icon"
              variant="outline"
              className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
            </Button>
          </ArtistDetailsDialog>
          {/* <Button
            title="Edit Artist"
            size="icon"
            variant="outline"
            className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
            onClick={() => onEdit && onEdit(artist)}
          >
            <SquarePen className="w-3.5 h-3.5 shrink-0" />
          </Button> */}
          <DeleteArtistDialog artist={artist}>
            <Button
              title="Delete Artist"
              size="icon"
              variant="outline"
              className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
            </Button>
          </DeleteArtistDialog>
        </div>
      )
    }
  }
]

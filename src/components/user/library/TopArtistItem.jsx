import { BadgeCheck } from "lucide-react"

const TopArtistItem = ({ artist }) => {
    const displayName = artist?.stageName || artist?.name || "-"
    const avatarUrl = artist?.artistAvatar || artist?.avatar || "/assets/default-avatar.png"
    const subtitle = artist?.stageName ? artist?.name : (artist?.subtitle || artist?.role || "Artist")
    const isVerified = artist?.verified ?? (artist?.isVerified !== false)

    return (
        <div className="flex w-full items-center gap-3.5">
            <div className="size-12 shrink-0 overflow-hidden rounded-[12px] bg-white/5">
                <img alt={displayName} src={avatarUrl} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-lg text-whitetext">{displayName}</span>
                <span className="truncate text-xs text-light-gray">{subtitle}</span>
            </div>
            {isVerified && <BadgeCheck className="size-6 shrink-0 text-primary" />}
        </div>
    )
}

export default TopArtistItem


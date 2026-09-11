import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const ArtistCard = ({ artist }) => {
    const displayName = artist?.stageName || artist?.name || "-"
    const subtitle = artist?.stageName ? artist?.name : (artist?.role || artist?.genre || "")
    const avatarUrl = artist?.artistAvatar || artist?.avatar || "/assets/default-avatar.png"
    const artistSlug = artist?.slug || artist?._id || artist?.id || ""

    return (
        <Link
            href={artistSlug ? `/explore/artist/${artistSlug}` : "#"}
            className="flex flex-col items-center gap-4 rounded-[16px] border border-dark-accent bg-dark-accent/30 p-4 text-center backdrop-blur-sm transition-colors hover:bg-dark-accent/60"
        >
            <div className="relative size-20 shrink-0 sm:size-24">
                <img
                    alt={displayName}
                    src={avatarUrl}
                    className="size-full rounded-full object-cover"
                />
                {artist?.isVerified !== false && (
                    <span className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full bg-background">
                        <BadgeCheck className="size-5 text-secondary" fill="var(--secondary)" stroke="var(--background)" />
                    </span>
                )}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-base font-semibold text-whitetext">{displayName}</span>
                {subtitle && <span className="truncate text-xs text-light-gray">{subtitle}</span>}
            </div>
            {/* Preserving UI design block per Rule 35 & user instruction:
                /users/artists response does not include follow status.
            <span
                className={cn(
                    "w-full rounded-[32px] border px-4 py-2 text-sm font-semibold",
                    artist?.isFollowing
                        ? "border-background bg-light-gray text-background"
                        : "border-secondary bg-secondary text-button-text"
                )}
            >
                {artist?.isFollowing ? "Followed" : "Follow"}
            </span>
            */}
        </Link>
    )
}

export default ArtistCard


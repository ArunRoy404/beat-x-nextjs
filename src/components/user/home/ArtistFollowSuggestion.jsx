"use client"

// import CommonPill from "@/components/shared/CommonPill"
// import { useToggleFollow } from "@/hooks/api/user/follow/useToggleFollow"

const ArtistFollowSuggestion = ({ artist }) => {
    // Note: hook useToggleFollow is preserved in src/hooks/api/user/follow/useToggleFollow.js
    const displayName = artist?.stageName || artist?.name
    const subtitle = artist?.stageName ? artist?.name : (artist?.subtitle || "")
    const avatarUrl = artist?.artistAvatar || artist?.avatar || artist?.art || ""

    return (
        <div className="flex w-full items-center gap-3.5">
            <div className="size-12 shrink-0 overflow-hidden rounded-[12px] bg-white/5">
                {avatarUrl && (
                    <img
                        alt={displayName || "Artist"}
                        src={avatarUrl}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-lg text-whitetext">{displayName}</span>
                {subtitle && <span className="truncate text-xs text-light-gray">{subtitle}</span>}
            </div>
            {/* Follow button commented out: /users/artists does not provide following status
            <CommonPill
                as="button"
                type="button"
                variant="outline"
                className="shrink-0 px-3.25 py-1.75 cursor-pointer disabled:opacity-50"
            >
                FOLLOW
            </CommonPill>
            */}
        </div>
    )
}

export default ArtistFollowSuggestion

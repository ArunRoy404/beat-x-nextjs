"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import GradientPlayButton from "@/components/shared/GradientPlayButton"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"

const tagColorClass = {
    primary: "text-primary",
    secondary: "text-secondary",
}

const ReleaseListItem = ({ release }) => {
    const song = release?.song || release
    const { playSong, currentSongId, isPlaying } = usePlaySong()
    const songId = song?._id || song?.id
    const isThisPlaying = currentSongId === songId && isPlaying
    const genreTag = song?.genre?.name || song?.tag

    return (
        <div className="flex flex-1 min-w-0 items-center gap-3.5 rounded-[16px] bg-(--release-item-bg) p-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-[12px] bg-dark-accent">
                {song?.coverUrl && (
                    <Image
                        alt={song?.title || "Song Release"}
                        src={song?.coverUrl}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-lg text-whitetext">{song?.title}</span>
                <span className="truncate text-xs text-light-gray">{song?.artist || song?.subtitle}</span>
                {genreTag && (
                    <span className={cn("truncate text-xs", tagColorClass[song?.tagColor] || "text-secondary")}>
                        {genreTag}
                    </span>
                )}
            </div>
            <GradientPlayButton
                size="sm"
                playing={isThisPlaying}
                onClick={() => playSong(song)}
                aria-label={isThisPlaying ? `Pause ${song?.title}` : `Play ${song?.title}`}
            />
        </div>
    )
}

export default ReleaseListItem


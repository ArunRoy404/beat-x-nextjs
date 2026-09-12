"use client"

import React from "react"
import { Play, Pause } from "lucide-react"
import CommonPill from "@/components/shared/CommonPill"
import CommonCoverImage from "@/components/shared/CommonCoverImage/CommonCoverImage"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"

const VideoPlayerHero = ({ video = {} }) => {
    const { playMedia, togglePlay, id: activeId, isPlaying } = useGlobalMediaPlayerStore()
    const upNextVideos = useUserWatchStore((state) => state.upNextVideos || [])
    const videoId = video?._id || video?.id
    const isThisActive = activeId === videoId
    const isThisPlaying = isThisActive && isPlaying

    const handlePlayClick = () => {
        if (isThisActive) {
            togglePlay()
        } else {
            const videoQueue = [
                video,
                ...upNextVideos.filter((v) => (v?._id || v?.id) !== videoId),
            ]
            playMedia(
                {
                    id: videoId,
                    mediaType: "video",
                    src: video?.videoUrl || video?.src || "/test-audio/alex-morgan-no-copyright-music-578487.mp3",
                    title: video?.titleBn || video?.title || "Video Track",
                    artist: video?.channel || "BeatX",
                    coverUrl: video?.heroImage || video?.thumbnail || "",
                },
                {
                    queue: videoQueue,
                    index: 0,
                }
            )
        }
    }

    return (
        <div className="flex w-full flex-col gap-4">
            <div
                onClick={handlePlayClick}
                className="group relative h-64 w-full overflow-hidden rounded-[16px] sm:h-96 lg:h-[499px] cursor-pointer bg-dark-accent"
            >
                <CommonCoverImage
                    src={video.heroImage ?? video.thumbnail}
                    alt={video.title || "Video"}
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                    fallback={<div className="size-full bg-dark-accent" />}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                {/* Center Play / Pause Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-secondary/90 text-button-text shadow-xl shadow-black/50 transition-all duration-300 group-hover:scale-110 active:scale-95">
                        {isThisPlaying ? (
                            <Pause className="size-7 sm:size-8 fill-current" />
                        ) : (
                            <Play className="size-7 sm:size-8 fill-current ml-1" />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="truncate text-2xl font-semibold text-whitetext sm:text-[40px]">
                    {video.titleBn ?? video.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base text-light-gray sm:text-lg">
                        {video.views} • {video.premieredAgo ?? video.postedAgo}
                    </span>
                    {video.trending && (
                        <CommonPill className="bg-trending-badge-bg/20 px-3 py-1 text-trending-badge-bg">
                            #TRENDING
                        </CommonPill>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPlayerHero


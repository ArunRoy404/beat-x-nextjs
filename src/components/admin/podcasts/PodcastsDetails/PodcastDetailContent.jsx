"use client"

import React from "react"
import { format } from "date-fns"
import { Play, Pause } from "lucide-react"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { getSongAudioUrl, resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import { toast } from "sonner"

const PodcastDetailContent = ({ podcast }) => {
    const {
        id: activeId,
        isPlaying: isGlobalPlaying,
        playMedia,
        togglePlay: toggleGlobalPlay,
    } = useGlobalMediaPlayerStore()

    const handlePlayEpisode = (episode) => {
        const audioSrc = getSongAudioUrl(episode) || (episode?.hlsMasterUrl ? resolveMediaUrl(episode.hlsMasterUrl) : "")
        if (!audioSrc) {
            toast.error("Episode audio stream is currently unavailable or still processing.")
            return
        }

        const isThisEpisodeActive = activeId === (episode?._id || audioSrc)
        if (isThisEpisodeActive) {
            toggleGlobalPlay()
        } else {
            playMedia({
                id: episode?._id || audioSrc,
                mediaType: "audio",
                src: audioSrc,
                title: episode?.title ? `Ep. ${episode.episodeNumber || 1}: ${episode.title}` : "Podcast Episode",
                artist: podcast?.title || "Podcast ADDA",
                coverUrl: episode?.coverUrl || podcast?.coverUrl,
                durationMs: episode?.durationMs || 0,
            })
        }
    }

    const episodes = podcast?.episodes || []

    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                <CommonInfoBox label="Owner" value={podcast?.ownerId?.name} />
                <CommonInfoBox label="Category / Genre" value={podcast?.category?.name || podcast?.genre?.name} />
                <CommonInfoBox label="Language" value={podcast?.language} />
                <CommonInfoBox label="Total Episodes" value={podcast?.totalEpisodes ?? episodes.length} />
                <CommonInfoBox label="Rating" value={podcast?.ratingCount ? `${podcast.ratingAverage} (${podcast.ratingCount})` : "-"} />
                <CommonInfoBox label="Weekly Plays" value={podcast?.playCountWeek ?? 0} />
                <CommonInfoBox label="Published" value={podcast?.publishedAt ? format(new Date(podcast.publishedAt), "MMM d, yyyy") : "-"} />

                {/* Description Box (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {podcast?.description || "-"}
                    </span>
                </div>

                {/* Episodes Section (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col gap-3 w-full">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[12px] text-dark-gray font-normal uppercase tracking-wider">
                            Episodes ({episodes.length})
                        </span>
                        <span className="text-[11px] text-light-gray/40 font-mono">
                            Total Duration: {formatDurationMs(podcast?.totalDurationMs)}
                        </span>
                    </div>

                    {episodes.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {episodes.map((episode) => {
                                const audioSrc = getSongAudioUrl(episode) || (episode?.hlsMasterUrl ? resolveMediaUrl(episode.hlsMasterUrl) : "")
                                const isThisEpisodeActive = activeId === (episode?._id || audioSrc)
                                const isPlaying = isThisEpisodeActive && isGlobalPlaying

                                return (
                                    <div
                                        key={episode._id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-[14px] hover:border-secondary/30 transition-all group"
                                    >
                                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                                            {/* Play / Pause button attached to floating media player */}
                                            <button
                                                type="button"
                                                onClick={() => handlePlayEpisode(episode)}
                                                disabled={!audioSrc}
                                                className="w-9 h-9 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 cursor-pointer shadow-md shadow-secondary/20 mt-0.5 sm:mt-0"
                                                title={isPlaying ? "Pause Episode" : "Play Episode"}
                                            >
                                                {isPlaying ? (
                                                    <Pause className="w-4 h-4 fill-current" />
                                                ) : (
                                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                                )}
                                            </button>

                                            <div className="flex flex-col min-w-0 flex-1 gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-[11px] font-mono font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-md shrink-0">
                                                        {episode.seasonNumber ? `S${episode.seasonNumber} ` : ""}Ep. {episode.episodeNumber || 1}
                                                    </span>
                                                    <span className="text-whitetext font-semibold text-[13.5px] truncate">
                                                        {episode.title}
                                                    </span>
                                                </div>

                                                {episode.description && (
                                                    <p className="text-light-gray/60 text-[12px] line-clamp-2 leading-relaxed">
                                                        {episode.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-3 text-[11px] text-light-gray/40 font-mono flex-wrap mt-0.5">
                                                    <span>{formatDurationMs(episode.durationMs)}</span>
                                                    <span>•</span>
                                                    <span>{episode.playCount ?? 0} plays</span>
                                                    {episode.publishedAt && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{format(new Date(episode.publishedAt), "MMM d, yyyy")}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-light-gray font-medium capitalize">
                                                {episode.status}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-light-gray/30 text-xs">
                            No episodes attached to this podcast yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PodcastDetailContent

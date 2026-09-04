"use client"

import React from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { getSongAudioUrl, resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import { toast } from "sonner"

const STATUS_COLORS = {
    active: "bg-green-success/15 text-green-success border-green-success/20",
    draft: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
    archived: "bg-white/10 text-light-gray border-white/10",
}

const AudioBookDetailHeader = ({ book, chapters = [] }) => {
    const statusClass = STATUS_COLORS[book?.status] || STATUS_COLORS.draft

    const {
        id: activeId,
        isPlaying: isGlobalPlaying,
        playMedia,
        togglePlay: toggleGlobalPlay,
    } = useGlobalMediaPlayerStore()

    const firstChapter = chapters?.[0]
    const audioSrc = firstChapter ? (getSongAudioUrl(firstChapter) || (firstChapter?.hlsMasterUrl ? resolveMediaUrl(firstChapter.hlsMasterUrl) : "")) : ""
    const isThisActive = activeId === (firstChapter?._id || audioSrc)
    const isPlaying = isThisActive && isGlobalPlaying

    const handlePlayFirst = () => {
        if (!firstChapter || !audioSrc) {
            toast.error("No playable chapter audio available for this audiobook yet.")
            return
        }

        if (isThisActive) {
            toggleGlobalPlay()
        } else {
            playMedia({
                id: firstChapter?._id || audioSrc,
                mediaType: "audio",
                src: audioSrc,
                title: firstChapter?.title ? `Ch. ${firstChapter.chapterNumber || 1}: ${firstChapter.title}` : book?.title || "Audiobook",
                artist: book?.title || "Audiobook",
                coverUrl: book?.coverUrl,
                durationMs: firstChapter?.durationMs || book?.totalDurationMs || 0,
            })
        }
    }

    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4 w-full">
                {/* Cover Thumbnail with Play Button Overlay */}
                <div className="w-[80px] h-[80px] rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0 overflow-hidden relative group">
                    {book?.coverUrl && (
                        <Image
                            src={book.coverUrl}
                            alt={book?.title || "Audiobook Cover"}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    )}
                    {firstChapter && audioSrc && (
                        <button
                            type="button"
                            onClick={handlePlayFirst}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title={isPlaying ? "Pause Audiobook" : "Play Audiobook"}
                        >
                            <div className="w-8 h-8 rounded-full bg-secondary text-black flex items-center justify-center shadow-lg">
                                {isPlaying ? (
                                    <Pause className="w-4 h-4 fill-current" />
                                ) : (
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                )}
                            </div>
                        </button>
                    )}
                </div>

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[80px] flex-1 min-w-0 pr-8">
                    <div className="flex flex-col gap-[12px]">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none truncate max-w-[200px] sm:max-w-xs">
                                {book?.title}
                            </h2>
                            {/* Status Pill */}
                            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${statusClass}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                                {book?.status || "-"}
                            </span>
                            {/* Genre Pill */}
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-[#CC97FF]/15 text-[#CC97FF] border-[#CC97FF]/20 select-none">
                                {book?.genre?.name || "-"}
                            </span>
                        </div>

                        {/* Subtitle / Author */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none truncate">
                            {book?.author || "-"} · Narrated by {book?.narrator || "-"}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="grid grid-cols-4 gap-2 mt-3 w-full border-t border-white/5 pt-2 text-left">
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{formatDurationMs(book?.totalDurationMs)}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.totalChapters ?? chapters.length}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Chapters</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{(book?.ratingAverage ?? 0).toFixed(1)}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Rating</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.language || "-"}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Language</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioBookDetailHeader

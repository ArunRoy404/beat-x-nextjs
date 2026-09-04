"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { ShieldCheck, SquarePen, Play, Pause } from "lucide-react"
import { format } from "date-fns"
import EditVideoDialog from "@/components/dialogs/admin/videos/EditVideoDialog"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { toast } from "sonner"

const STATUS_COLORS = {
    active: "bg-green-success/15 text-green-success border-green-success/20",
    published: "bg-green-success/15 text-green-success border-green-success/20",
    draft: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
    archived: "bg-white/10 text-light-gray border-white/10",
}

const VideoDetailHeader = ({ video }) => {
    const [isPlayingInline, setIsPlayingInline] = useState(false)
    const videoRef = useRef(null)
    const { volume, isMuted, setVolume } = useVolumeStore()

    const statusKey = (video?.status || "draft").toLowerCase()
    const statusClass = STATUS_COLORS[statusKey] || STATUS_COLORS.draft
    const isActive = statusKey === "active" || statusKey === "published"

    const {
        id: activeId,
        isPlaying: isGlobalPlaying,
        playMedia,
        togglePlay: toggleGlobalPlay,
    } = useGlobalMediaPlayerStore()

    const videoSrc = video?.hlsMasterUrl ? resolveMediaUrl(video.hlsMasterUrl) : (video?.sourceKey ? resolveMediaUrl(video.sourceKey) : "")
    const isThisVideoActive = activeId === (video?._id || videoSrc)
    const isPlaying = isThisVideoActive && isGlobalPlaying

    const applyVolume = useCallback(() => {
        if (videoRef.current) {
            const targetVol = isMuted ? 0 : volume
            videoRef.current.volume = Math.max(0, Math.min(1, targetVol))
        }
    }, [isMuted, volume])

    useEffect(() => {
        applyVolume()
    }, [applyVolume, isPlayingInline])

    const handleVolumeChange = (e) => {
        const el = e.currentTarget
        if (el) {
            setVolume(el.volume)
        }
    }

    const handlePlayVideo = () => {
        if (!videoSrc) {
            toast.error("Video stream source is currently unavailable or still processing.")
            return
        }

        if (isThisVideoActive) {
            toggleGlobalPlay()
        } else {
            playMedia({
                id: video?._id || videoSrc,
                mediaType: "video",
                src: videoSrc,
                title: video?.title || "Video Track",
                artist: video?.ownerId?.name || "Admin",
                coverUrl: video?.coverUrl || video?.cover || "",
                durationMs: video?.durationMs || 0,
            })
        }
    }

    const genreName = video?.genre?.name || (typeof video?.genre === "string" ? video.genre : "-")
    const ownerName = video?.ownerId?.name || video?.artist || "Admin"
    const formattedDate = video?.publishedAt ? format(new Date(video.publishedAt), "MMM d, yyyy") : "-"

    return (
        <div className="flex flex-col w-full shrink-0 relative bg-[#1A1A19]">
            {/* 240px Player/Thumbnail Area */}
            <div className="relative flex h-[240px] flex-col justify-center items-center self-stretch rounded-t-[16px] overflow-hidden bg-black">
                {isPlayingInline && videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        controls
                        autoPlay
                        onCanPlay={applyVolume}
                        onPlay={applyVolume}
                        onVolumeChange={handleVolumeChange}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div
                        className="relative flex w-full h-full flex-col justify-center items-center bg-cover bg-center bg-no-repeat shadow-[0_0_10px_0_rgba(204,151,255,0.20)] group"
                        style={{
                            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${video?.coverUrl || video?.cover || ""}')`,
                            backgroundColor: "lightgray"
                        }}
                    >
                        {/* Play Button */}
                        <button
                            type="button"
                            onClick={() => {
                                if (videoSrc) {
                                    setIsPlayingInline(true)
                                }
                                handlePlayVideo()
                            }}
                            className="flex w-[56px] h-[56px] justify-center items-center shrink-0 rounded-full bg-secondary hover:bg-secondary/90 text-background shadow-[0_0_10px_0_rgba(204,151,255,0.20)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            title={isPlaying ? "Pause Video" : "Play Video"}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 fill-current text-[#004B56]" />
                            ) : (
                                <Play className="w-5 h-5 fill-current text-[#004B56] ml-0.5" />
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Title & Actions Row (below player) */}
            <div
                className="p-4 border-b border-white/5 flex flex-col gap-3 shrink-0 relative w-full"
                style={{ background: "var(--modal-header-bg)" }}
            >
                <div className="flex flex-col gap-[12px] pr-24 text-left">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none truncate max-w-[200px] sm:max-w-xs">
                            {video?.title}
                        </h2>
                        {/* Verification Checkmark */}
                        <div className="w-4 h-4 rounded-full bg-yellow-warning flex items-center justify-center text-black shrink-0">
                            <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
                        </div>
                        {/* Status Pill */}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${statusClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-green-success" : "bg-yellow-warning"}`} />
                            {video?.status || "draft"}
                        </span>
                        {/* Genre Pill */}
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-secondary/15 text-secondary border-secondary/20 select-none">
                            {genreName}
                        </span>
                    </div>

                    {/* Subtitle / Artist */}
                    <p className="text-[14px] font-normal not-italic text-light-gray leading-none truncate">
                        {ownerName} &middot; {formattedDate}
                    </p>
                </div>

                {/* Short Stats */}
                <div className="flex items-center gap-6 mt-3 w-full border-t border-white/5 pt-2.5 text-left flex-wrap">
                    <div className="flex flex-col pr-6 border-r border-white/10 gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{formatDurationMs(video?.durationMs)}</span>
                        <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">Duration</span>
                    </div>
                    <div className="flex flex-col pr-6 border-r border-white/10 gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.playCount ?? 0}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Views</span>
                    </div>
                    <div className="flex flex-col pr-6 border-r border-white/10 gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.likeCount ?? 0}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Likes</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.transcodeStatus || "ready"}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Status</span>
                    </div>
                </div>

                {/* Absolute Edit Button */}
                <div className="absolute top-4 right-4 z-50">
                    <EditVideoDialog video={video}>
                        <button
                            className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                        >
                            <SquarePen className="w-3.5 h-3.5" />
                            Edit
                        </button>
                    </EditVideoDialog>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailHeader

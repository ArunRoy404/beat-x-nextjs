"use client"

import React from "react"
import { Eye, ThumbsUp, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import PlayButton from "./PlayButton"
import VideoDetailsDialog from "@/components/dialogs/admin/videos/VideoDetailsDialog"
import EditVideoDialog from "@/components/dialogs/admin/videos/EditVideoDialog"
import DeleteVideoDialog from "@/components/dialogs/admin/videos/DeleteVideoDialog"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { toast } from "sonner"
import { VIDEO_STATUS, VIDEO_STATUS_LABELS, VIDEO_STATUS_COLORS, normalizeVideoStatus } from "@/lib/constants/videoStatus"

const VideoCard = ({ video }) => {
  // Hooks must run unconditionally on every render, before any early
  // return — this call used to sit after the `!video` guard below, which
  // violates the rules of hooks (order must be identical across renders).
  const { playMedia } = useGlobalMediaPlayerStore()

  if (!video) return null

  const statusKey = normalizeVideoStatus(video?.status)
  const statusColor = VIDEO_STATUS_COLORS[statusKey] || VIDEO_STATUS_COLORS[VIDEO_STATUS.DRAFT]
  const isActive = statusKey === VIDEO_STATUS.ACTIVE

  const videoId = video?._id || video?.id
  const videoSrc = video?.hlsMasterUrl
    ? resolveMediaUrl(video.hlsMasterUrl)
    : (video?.sourceKey
      ? resolveMediaUrl(video.sourceKey)
      : (video?.videoUrl
        ? resolveMediaUrl(video.videoUrl)
        : (video?.streamUrl
          ? resolveMediaUrl(video.streamUrl)
          : "")))

  const handlePlay = (e) => {
    e.stopPropagation()
    if (!videoSrc) {
      toast.error("Video stream is currently unavailable or still processing.")
      return
    }
    const artistName =
      typeof video?.ownerId === "object" && video?.ownerId !== null
        ? video?.ownerId?.name || video?.ownerId?.username || "Admin"
        : (video?.artist || "Admin")

    playMedia({
      id: videoId || videoSrc,
      mediaType: "video",
      src: videoSrc,
      title: video?.title || "Video Track",
      artist: artistName,
      coverUrl: video?.coverUrl || video?.cover || "",
      durationMs: video?.durationMs || 0,
    })
  }

  const genreName = video?.genre?.name || (typeof video?.genre === "string" ? video.genre : "-")
  const ownerName = video?.ownerId?.name || "Admin"
  const formattedDate = video?.publishedAt ? format(new Date(video.publishedAt), "MMM d, yyyy") : "-"

  return (
    <div className="flex flex-col items-start flex-1 self-stretch rounded-[16px] border border-dark-gray bg-[#0E0E0E]/40 backdrop-blur-[10px] w-full overflow-hidden">
      {/* Thumbnail Container */}
      <div
        className="relative flex h-[240px] flex-col justify-center items-center self-stretch rounded-t-[16px] bg-cover bg-center bg-no-repeat shadow-[0_0_10px_0_rgba(204,151,255,0.20)] shrink-0 group"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${video?.coverUrl || video?.cover || ""}')`,
          backgroundColor: "lightgray"
        }}
      >
        {/* Play Button Overlay */}
        <PlayButton
          onClick={handlePlay}
          className="transition-transform group-hover:scale-110"
        />

        {/* Status Pill (Top-Right) */}
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold tracking-wide select-none ${statusColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-success" : "bg-yellow-warning"}`} />
          {VIDEO_STATUS_LABELS[statusKey] || video?.status || "-"}
        </span>

        {/* Duration Badge (Bottom-Right) */}
        {Boolean(video?.durationMs) && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[12px] font-medium tracking-wide select-none">
            {formatDurationMs(video.durationMs)}
          </span>
        )}
      </div>

      {/* Description Container */}
      <div className="flex p-4 flex-col justify-center items-start gap-[5px] self-stretch flex-1 bg-transparent">
        {/* Text descriptions */}
        <div className="flex flex-col items-start text-left gap-[5px] w-full min-w-0">
          {/* Title */}
          <h3 className="overflow-hidden text-white text-ellipsis text-[24px] font-semibold leading-normal truncate w-full font-sans tracking-tight">
            {video?.title || "-"}
          </h3>

          {/* Singer and duration */}
          <span className="text-light-gray text-[14px] font-normal leading-normal truncate w-full font-sans">
            {ownerName} &middot; {formattedDate}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-start gap-3 text-light-gray text-[13px] font-normal py-1.5 border-t border-b border-white/5 w-full mt-2">
          <div className="flex items-center gap-1 shrink-0">
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>{video?.playCount ?? 0} views</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
            <span>{video?.likeCount ?? 0} Likes</span>
          </div>
          <span className="ml-auto px-2 py-0.5 rounded-[4px] bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-semibold uppercase tracking-wide truncate max-w-[100px]">
            {genreName}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-3 w-full mt-3">
          {/* Details trigger button */}
          <VideoDetailsDialog video={video}>
            <button
              className="flex-1 flex p-2 px-4 justify-center items-center gap-2 rounded-xl border border-[rgba(204,151,255,0.20)] bg-[rgba(204,151,255,0.10)] text-[#CC97FF] hover:bg-[rgba(204,151,255,0.15)] text-[12px] font-medium text-center cursor-pointer transition-colors active:scale-[0.98]"
            >
              View Details
            </button>
          </VideoDetailsDialog>

          {/* Action triggers */}
          <div className="flex items-center gap-2">
            <EditVideoDialog video={video}>
              <button
                title="Edit Video"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary cursor-pointer transition-colors active:scale-95 shrink-0"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </EditVideoDialog>

            <DeleteVideoDialog video={video}>
              <button
                title="Delete Video"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 hover:bg-red-error/20 text-red-error cursor-pointer transition-colors active:scale-95 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </DeleteVideoDialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard

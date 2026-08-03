import React from "react"
import { Eye, ThumbsUp, ThumbsDown, Pencil, Trash2 } from "lucide-react"
import PlayButton from "./PlayButton"
import VideoDetailsDialog from "@/components/dialogs/admin/VideoDetailsDialog"
import EditVideoDialog from "@/components/dialogs/admin/EditVideoDialog"
import DeleteVideoDialog from "@/components/dialogs/admin/DeleteVideoDialog"
import { toast } from "sonner"

const VideoCard = ({ video }) => {
  if (!video) return null

  // Status badge styling
  const isPublished = video.status === "Published"
  const statusColor = isPublished
    ? "border-green-success/20 bg-green-success/10 text-green-success"
    : "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning"

  return (
    <div className="flex flex-col items-start flex-1 self-stretch rounded-[16px] border border-dark-gray bg-[#0E0E0E]/40 backdrop-blur-[10px] w-full overflow-hidden">
      {/* Thumbnail Container */}
      <div
        className="relative flex h-[240px] flex-col justify-center items-center self-stretch rounded-t-[16px] bg-cover bg-center bg-no-repeat shadow-[0_0_10px_0_rgba(204,151,255,0.20)] shrink-0 group"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${video.cover}')`,
          backgroundColor: "lightgray"
        }}
      >
        {/* Play Button Overlay */}
        <PlayButton
          onClick={(e) => {
            e.stopPropagation()
            toast.success(`Playing: ${video.title}`)
          }}
          className="transition-transform group-hover:scale-110"
        />

        {/* Status Pill (Top-Right) */}
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold tracking-wide select-none ${statusColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-green-success" : "bg-yellow-warning"}`} />
          {video.status}
        </span>

        {/* Duration Badge (Bottom-Right) */}
        {video.duration && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[12px] font-medium tracking-wide select-none">
            {video.duration}
          </span>
        )}
      </div>

      {/* Description Container */}
      <div className="flex p-4 flex-col justify-center items-start gap-[5px] self-stretch flex-1 bg-transparent">
        {/* Text descriptions */}
        <div className="flex flex-col items-start text-left gap-[5px] w-full min-w-0">
          {/* Title */}
          <h3 className="overflow-hidden text-white text-ellipsis text-[24px] font-semibold leading-normal truncate w-full font-sans tracking-tight">
            {video.title}
          </h3>

          {/* Singer and duration */}
          <span className="text-light-gray text-[16px] font-normal leading-normal truncate w-full font-sans">
            {video.artist} &middot; {video.released}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-start gap-3 text-light-gray text-[14px] font-normal py-1.5 border-t border-b border-white/5 w-full mt-2">
          <div className="flex items-center gap-1 shrink-0">
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>{video.streams} views</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
            <span>{video.likes} Likes</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <ThumbsDown className="w-3.5 h-3.5 shrink-0" />
            <span>{video.dislikes} Dislike</span>
          </div>
          <span className="ml-auto px-2 py-0.5 rounded-[4px] bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-semibold uppercase tracking-wide">
            {video.genre}
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

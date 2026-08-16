import React from "react"
import { Clock, Star, Trash2 } from "lucide-react"
import { formatDurationMs } from "@/lib/format/formatDuration"
import AudioBookDetailsDialog from "@/components/dialogs/admin/audiobooks/AudioBookDetailsDialog"
import DeleteAudioBookDialog from "@/components/dialogs/admin/audiobooks/DeleteAudioBookDialog"

const STATUS_COLORS = {
  active: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
  draft: "text-[#FFAE00] border-[#FFAE00]/20 bg-[#FFAE00]/10",
  archived: "text-light-gray border-white/10 bg-white/[0.08]",
}

const AudioBookCard = ({ book }) => {
  if (!book) return null

  const statusClass = STATUS_COLORS[book.status] || STATUS_COLORS.draft

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-white/[0.03] backdrop-blur-md flex flex-col w-full h-full">

      {/* Top Cover Block */}
      <div
        className="relative flex h-[186px] p-4 items-center justify-between align-stretch shrink-0 bg-cover bg-center bg-no-repeat rounded-t-[24px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%), url('${book.coverUrl || ""}')`,
          backgroundColor: "lightgray"
        }}
      >
        {/* Status Pill (Top-Left) */}
        <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold tracking-wide select-none capitalize ${statusClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {book.status || "-"}
        </span>

        {/* Genre Badge (Top-Right) */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 bg-white/[0.08] text-white text-[12px] font-medium tracking-wide select-none backdrop-blur-sm">
          {book.genre?.name || "-"}
        </span>

        {/* Bestseller badge */}
        {book.isBestseller && (
          <span className="absolute bottom-3 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF] text-[10px] font-semibold uppercase tracking-wider select-none">
            <Star className="w-2.5 h-2.5 shrink-0" /> Bestseller
          </span>
        )}
      </div>

      {/* Details Container Block */}
      <div className="flex p-4 flex-col justify-center items-start gap-3 align-stretch flex-1 bg-transparent">
        {/* Text descriptions */}
        <div className="flex flex-col items-start text-left gap-1 w-full min-w-0">
          <h3 className="text-white text-[16px] font-semibold leading-normal truncate w-full">
            {book.title}
          </h3>
          <span className="text-[#ADAAAA] text-[12px] font-semibold leading-normal truncate w-full">
            {book.author}
          </span>
          <span className="text-[#ADAAAA] text-[12px] font-normal leading-normal truncate w-full">
            Narrated by {book.narrator}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-start gap-4 text-[#ADAAAA] text-[12px] font-normal py-1 border-t border-b border-white/5 w-full">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-[#ADAAAA]" />
            <span>{formatDurationMs(book.totalDurationMs)}</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 shrink-0 text-[#ADAAAA]" />
            <span>{(book.ratingAverage || 0).toFixed(1)} ({book.ratingCount || 0})</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-3 w-full mt-1">
          <AudioBookDetailsDialog book={book}>
            <button
              className="flex-1 flex p-1.5 px-3 justify-center items-center gap-2 rounded-xl border border-[rgba(204,151,255,0.20)] bg-[rgba(204,151,255,0.10)] text-[#CC97FF] hover:bg-[rgba(204,151,255,0.15)] text-[12px] font-normal text-center cursor-pointer transition-colors active:scale-[0.98]"
            >
              View Details
            </button>
          </AudioBookDetailsDialog>

          <div className="flex items-center gap-2">
            <DeleteAudioBookDialog book={book}>
              <button
                title="Delete Audiobook"
                className="w-7 h-7 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 hover:bg-red-error/20 text-red-error cursor-pointer transition-colors active:scale-95 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </DeleteAudioBookDialog>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AudioBookCard

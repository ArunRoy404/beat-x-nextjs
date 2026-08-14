import React from "react"
import { Clock, BookOpen, Play, Pencil, Trash2 } from "lucide-react"
import AudioBookDetailsDialog from "@/components/dialogs/admin/audiobooks/AudioBookDetailsDialog"
import EditAudioBookDialog from "@/components/dialogs/admin/audiobooks/EditAudioBookDialog"
import DeleteAudioBookDialog from "@/components/dialogs/admin/audiobooks/DeleteAudioBookDialog"

const AudioBookCard = ({ book }) => {
  if (!book) return null

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-white/[0.03] backdrop-blur-md flex flex-col w-full h-full">
      
      {/* Top Cover Block (Figma styled cover section) */}
      <div 
        className="relative flex h-[186px] p-4 items-center justify-between align-stretch shrink-0 bg-cover bg-center bg-no-repeat rounded-t-[24px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%), url('${book.cover}')`,
          backgroundColor: 'lightgray'
        }}
      >
        {/* Status Pill (Top-Left) */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-semibold tracking-wide select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-green-success" />
          {book.status}
        </span>

        {/* Category Badge (Top-Right) */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 bg-white/[0.08] text-white text-[12px] font-medium tracking-wide select-none backdrop-blur-sm">
          {book.category}
        </span>

        {/* Sequel Badge (Bottom-Right, absolute positioning just above the divider) */}
        {book.badge && (
          <span className="absolute bottom-3 right-4 px-2 py-0.5 rounded-md border border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF] text-[10px] font-semibold uppercase tracking-wider select-none">
            {book.badge}
          </span>
        )}
      </div>

      {/* Details Container Block */}
      <div className="flex p-4 flex-col justify-center items-start gap-3 align-stretch flex-1 bg-transparent">
        {/* Text descriptions */}
        <div className="flex flex-col items-start text-left gap-1 w-full min-w-0">
          {/* Title */}
          <h3 className="text-white text-[16px] font-semibold leading-normal truncate w-full">
            {book.title}
          </h3>

          {/* Author */}
          <span className="text-[#ADAAAA] text-[12px] font-semibold leading-normal truncate w-full">
            {book.artist}
          </span>

          {/* Narrator */}
          <span className="text-[#ADAAAA] text-[12px] font-normal leading-normal truncate w-full">
            Narrated by {book.narrator}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-start gap-4 text-[#ADAAAA] text-[12px] font-normal py-1 border-t border-b border-white/5 w-full">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-[#ADAAAA]" />
            <span>{book.duration}</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-[#ADAAAA]" />
            <span>{book.chaptersCount} ch.</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 shrink-0 text-[#ADAAAA]" />
            <span>{book.streams}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-3 w-full mt-1">
          {/* Details trigger button */}
          <AudioBookDetailsDialog book={book}>
            <button
              className="flex-1 flex p-1.5 px-3 justify-center items-center gap-2 rounded-xl border border-[rgba(204,151,255,0.20)] bg-[rgba(204,151,255,0.10)] text-[#CC97FF] hover:bg-[rgba(204,151,255,0.15)] text-[12px] font-normal text-center cursor-pointer transition-colors active:scale-[0.98]"
            >
              View Details
            </button>
          </AudioBookDetailsDialog>

          {/* Action triggers */}
          <div className="flex items-center gap-2">
            <EditAudioBookDialog book={book}>
              <button
                title="Edit Audiobook"
                className="w-7 h-7 rounded-full flex items-center justify-center border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary cursor-pointer transition-colors active:scale-95 shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </EditAudioBookDialog>

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

import React from "react"
import { Upload, Plus } from "lucide-react"

const UploadNewSong = () => {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] border-dashed border-2 border-secondary/15 bg-secondary/[0.03] gap-4 w-full"
    >
      {/* Upload icon and details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[12px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
          <Upload className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-whitetext text-[20px] not-italic font-medium leading-none truncate">
            Upload New Song
          </h2>
          <p className="text-white/40 text-[12px] not-italic font-normal truncate mt-0.5">
            MP3 / WAV / FLAC · Max 100MB · Cover art min 1000×1000px
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        className="flex items-center gap-2 bg-secondary text-black font-semibold text-sm px-5 py-2.5 rounded-full cursor-pointer hover:opacity-90 active:scale-95 transition-all select-none shrink-0"
      >
        <Plus className="w-4.5 h-4.5" />
        <span>Upload Song</span>
      </button>
    </div>
  )
}

export default UploadNewSong

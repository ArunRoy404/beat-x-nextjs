import React from "react"
import { FolderPlus } from "lucide-react"
import CreateAlbumDialog from "@/components/dialogs/artist/CreateAlbumDialog"

const CreateNewAlbum = () => {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] border-dashed border-2 border-secondary/15 bg-secondary/[0.03] gap-4 w-full"
    >
      {/* Icon and details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[12px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
          <FolderPlus className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-whitetext text-[20px] not-italic font-medium leading-none truncate">
            Create New Album
          </h2>
          <p className="text-white/40 text-[12px] not-italic font-normal truncate mt-0.5">
            Organise your songs into an album — add cover art, tracklist and release info
          </p>
        </div>
      </div>

      {/* Create Dialog */}
      <CreateAlbumDialog />
    </div>
  )
}

export default CreateNewAlbum

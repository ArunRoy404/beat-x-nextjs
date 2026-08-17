import React from "react"
import { FolderPlus } from "lucide-react"
import CreateAlbumDialog from "@/components/dialogs/admin/albums/CreateAlbumDialog"

const CreateNewAlbum = () => {
    return (
        <div className="relative overflow-hidden rounded-[16px] border border-[#A175FF]/20 bg-gradient-to-r from-[#A175FF]/10 to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Background layer */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
                style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
            />

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#A175FF]/20 border border-[#A175FF]/30 flex items-center justify-center text-[#A175FF] shrink-0">
                    <FolderPlus className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-whitetext font-bold text-[18px] tracking-tight">Create New Album</h3>
                    <p className="text-light-gray/60 text-sm mt-0.5">
                        Organise your songs into an album — add cover art, tracklist and release info
                    </p>
                </div>
            </div>

            <div className="relative z-10 shrink-0">
                <CreateAlbumDialog />
            </div>
        </div>
    )
}

export default CreateNewAlbum

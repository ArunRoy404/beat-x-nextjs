"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useArtistAlbumsStore } from "@/zustandStore/artist/artistStore/artistAlbumsStore"
import { toast } from "sonner"
import AlbumTrackRow from "../AlbumTrackRow"
import AddTrackDialog from "@/components/dialogs/artist/AddTrackDialog"

const AlbumDetailContent = ({ album }) => {
    const addTrackToAlbum = useArtistAlbumsStore((state) => state.addTrackToAlbum)
    const deleteTrackFromAlbum = useArtistAlbumsStore((state) => state.deleteTrackFromAlbum)

    const handleAddTrack = ({ title, duration }) => {
        addTrackToAlbum(album.id, { title, duration })
        toast.success("Track added to album!")
    }

    const handleDeleteTrack = (trackId) => {
        deleteTrackFromAlbum(album.id, trackId)
        toast.success("Track removed from album")
    }

    return (
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            {/* Description Box */}
            <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col gap-1.5 w-full">
                <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal italic">
                    {album?.description || `${album?.artist || "TAHSIN"}'s album "${album?.name}".`}
                </span>
            </div>

            {/* Tracks section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-whitetext font-semibold text-sm">Tracks</h4>
                    <AddTrackDialog onSubmit={handleAddTrack}>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 text-xs rounded-lg gap-1 border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20 cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Track
                        </Button>
                    </AddTrackDialog>
                </div>

                {/* Tracks list */}
                <div className="flex flex-col gap-2">
                    {album?.tracksList && album.tracksList.length > 0 ? (
                        album.tracksList.map((track) => (
                            <AlbumTrackRow
                                key={track.id}
                                track={track}
                                onDelete={() => handleDeleteTrack(track.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-6 text-light-gray/30 text-xs">
                            {'No tracks in this album yet. Click "+ Add Track" to upload some.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlbumDetailContent

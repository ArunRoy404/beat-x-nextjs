"use client"

import React, { useState } from "react"
import { Music, Plus, Trash2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import { toast } from "sonner"

const AlbumDetailContent = ({ album }) => {
    const [showAddTrack, setShowAddTrack] = useState(false)
    const [newTrackTitle, setNewTrackTitle] = useState("")
    const [newTrackDuration, setNewTrackDuration] = useState("3:30")

    const addTrackToAlbum = useAdminDashboardAlbumsStore((state) => state.addTrackToAlbum)
    const deleteTrackFromAlbum = useAdminDashboardAlbumsStore((state) => state.deleteTrackFromAlbum)

    const handleAddTrackSubmit = (e) => {
        e.preventDefault()
        if (!newTrackTitle.trim()) {
            toast.error("Track title is required")
            return
        }
        addTrackToAlbum(album.id, {
            title: newTrackTitle,
            duration: newTrackDuration,
        })
        toast.success("Track added to album!")
        setNewTrackTitle("")
        setNewTrackDuration("3:30")
        setShowAddTrack(false)
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
                    {album?.description || `TAHSIN's debut studio album exploring themes of hope and longing through modern Bangla pop.`}
                </span>
            </div>

            {/* Tracks section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-whitetext font-semibold text-sm">Tracks</h4>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddTrack(!showAddTrack)}
                        className="h-8 text-xs rounded-lg gap-1 border-[#3ADFFA]/20 bg-[#3ADFFA]/10 text-[#3ADFFA] hover:bg-[#3ADFFA]/20 cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Track
                    </Button>
                </div>

                {/* Inline form to add new track */}
                {showAddTrack && (
                    <form onSubmit={handleAddTrackSubmit} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-end gap-3 shrink-0">
                        <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[11px] text-[#A175FF] font-medium">Track Title</label>
                            <input
                                type="text"
                                value={newTrackTitle}
                                onChange={(e) => setNewTrackTitle(e.target.value)}
                                placeholder="e.g. Tumi Onek Dami"
                                className="w-full h-9 px-3 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                            />
                        </div>
                        <div className="w-24 flex flex-col gap-1">
                            <label className="text-[11px] text-[#A175FF] font-medium">Duration</label>
                            <input
                                type="text"
                                value={newTrackDuration}
                                onChange={(e) => setNewTrackDuration(e.target.value)}
                                placeholder="4:20"
                                className="w-full h-9 px-3 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white focus:outline-none text-center"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowAddTrack(false)}
                                className="h-9 text-xs rounded-lg cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="gradient"
                                className="h-9 text-xs rounded-lg cursor-pointer font-bold"
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                )}

                {/* Tracks list */}
                <div className="flex flex-col gap-2">
                    {album?.tracksList && album.tracksList.length > 0 ? (
                        album.tracksList.map((track) => (
                            <div
                                key={track.id}
                                className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-[12px] hover:bg-white/[0.03] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A175FF] shrink-0">
                                        <Music className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-whitetext font-semibold text-[13px]">
                                            {track.title}
                                        </span>
                                        <span className="text-light-gray/40 text-[11px]">
                                            {track.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-light-gray/40 text-[11px] hidden sm:inline">
                                        {track.joined}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${track.status === "Published"
                                        ? "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10"
                                        : "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10"
                                        }`}>
                                        {track.status}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 text-secondary hover:bg-secondary/10 rounded-full cursor-pointer"
                                            title="Details"
                                        >
                                            <Play className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleDeleteTrack(track.id)}
                                            className="w-8 h-8 text-red-error hover:bg-red-error/10 rounded-full cursor-pointer"
                                            title="Delete Track"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
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

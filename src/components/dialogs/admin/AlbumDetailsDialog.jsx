"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Headphones, Music, Package, Ticket, Pencil, Trash2, Plus, Sparkles, AlertTriangle } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import { toast } from "sonner"

const AlbumDetailsDialog = ({ album: initialAlbum, children }) => {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("tracks") // "tracks" or "analytics"
    const [showAddTrack, setShowAddTrack] = useState(false)
    const [newTrackTitle, setNewTrackTitle] = useState("")
    const [newTrackDuration, setNewTrackDuration] = useState("3:30")

    // Bind to store to get reactive updates (especially when adding/deleting tracks)
    const album = useAdminDashboardAlbumsStore((state) =>
        state.albumsList.find((a) => a.id === initialAlbum?.id)
    )
    const deleteAlbum = useAdminDashboardAlbumsStore((state) => state.deleteAlbum)
    const addTrackToAlbum = useAdminDashboardAlbumsStore((state) => state.addTrackToAlbum)
    const deleteTrackFromAlbum = useAdminDashboardAlbumsStore((state) => state.deleteTrackFromAlbum)
    const updateAlbum = useAdminDashboardAlbumsStore((state) => state.updateAlbum)

    if (!album) return null

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

    const handleTogglePublish = () => {
        const isPublished = album.status === "Published"
        const nextStatus = isPublished ? "Under Review" : "Published"
        updateAlbum({ ...album, status: nextStatus })
        toast.success(isPublished ? "Album unpublished successfully" : "Album published successfully")
    }

    const handleDeleteAlbumClick = () => {
        deleteAlbum(album.id)
        toast.success("Album deleted successfully")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Album Details</DialogTitle>
                </DialogHeader>

                {/* Dialog Content body */}
                <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
                    
                    {/* Album Info Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <CommonAvatar
                                src={album.avatar || ""}
                                alt={album.name}
                                className="w-20 h-20 rounded-[8px] border border-white/10 shrink-0"
                            />
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#3ADFFA]/25 bg-[#3ADFFA]/10 text-[#3ADFFA]">
                                        {album.genre}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                        album.status === "Published"
                                            ? "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10"
                                            : "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10"
                                    }`}>
                                        {album.status}
                                    </span>
                                </div>
                                <h3 className="text-whitetext font-bold text-[24px] tracking-tight mt-1">
                                    {album.name}
                                </h3>
                                <span className="text-light-gray/60 text-sm">By {album.artist}</span>
                            </div>
                        </div>

                        {/* Top action buttons */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-white/10 bg-white/5 text-whitetext hover:bg-white/10 gap-1.5 px-3 font-semibold text-xs cursor-pointer"
                            >
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </Button>
                        </div>
                    </div>

                    {/* Stats metrics block */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-center flex-1 min-w-[100px]">
                            <span className="block text-whitetext font-bold text-[20px]">{album.tracksCount}</span>
                            <span className="text-light-gray/40 text-[11px] font-medium uppercase tracking-wider">Tracks</span>
                        </div>
                        <div className="h-8 w-px bg-white/10 shrink-0" />
                        <div className="text-center flex-1 min-w-[100px]">
                            <span className="block text-whitetext font-bold text-[20px]">{album.duration}</span>
                            <span className="text-light-gray/40 text-[11px] font-medium uppercase tracking-wider">Duration</span>
                        </div>
                        <div className="h-8 w-px bg-white/10 shrink-0" />
                        <div className="text-center flex-1 min-w-[100px]">
                            <span className="block text-whitetext font-bold text-[20px]">
                                {album.streams >= 1000000 
                                    ? `${(album.streams / 1000000).toFixed(1)}M` 
                                    : album.streams.toLocaleString()}
                            </span>
                            <span className="text-light-gray/40 text-[11px] font-medium uppercase tracking-wider">Streams</span>
                        </div>
                        <div className="h-8 w-px bg-white/10 shrink-0" />
                        <div className="text-center flex-1 min-w-[100px]">
                            <span className="block text-whitetext font-bold text-[20px]">{album.released}</span>
                            <span className="text-light-gray/40 text-[11px] font-medium uppercase tracking-wider">Released</span>
                        </div>
                    </div>

                    {/* Tab Navigation header */}
                    <div className="flex border-b border-white/5">
                        <button
                            type="button"
                            onClick={() => setActiveTab("tracks")}
                            className={`pb-2.5 px-4 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                                activeTab === "tracks"
                                    ? "border-secondary text-secondary"
                                    : "border-transparent text-light-gray/40 hover:text-light-gray"
                            }`}
                        >
                            Track Listing ({album.tracksCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("analytics")}
                            className={`pb-2.5 px-4 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                                activeTab === "analytics"
                                    ? "border-transparent text-light-gray/40 hover:text-light-gray"
                                    : "border-transparent text-light-gray/40"
                            }`}
                            disabled
                        >
                            Analytics
                        </button>
                    </div>

                    {/* Description textbox */}
                    {activeTab === "tracks" && (
                        <div className="flex flex-col gap-5">
                            <p className="text-light-gray/60 text-xs italic bg-white/[0.02] border border-white/5 rounded-xl p-4 leading-relaxed">
                                {album.description || "No description provided for this album."}
                            </p>

                            {/* Tracks heading */}
                            <div className="flex items-center justify-between">
                                <h4 className="text-whitetext font-bold text-[16px]">Tracks</h4>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowAddTrack(!showAddTrack)}
                                    className="h-8 text-xs rounded-lg gap-1 border-[#3ADFFA]/20 bg-[#3ADFFA]/10 text-[#3ADFFA] hover:bg-[#3ADFFA]/20 cursor-pointer"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add Track
                                </Button>
                            </div>

                            {/* Add track subform overlay */}
                            {showAddTrack && (
                                <form onSubmit={handleAddTrackSubmit} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-end gap-3 shrink-0">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-xs text-[#A175FF] font-medium">Track Title</label>
                                        <input
                                            type="text"
                                            value={newTrackTitle}
                                            onChange={(e) => setNewTrackTitle(e.target.value)}
                                            placeholder="e.g. Tumi Onek Dami"
                                            className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-24 flex flex-col gap-1">
                                        <label className="text-xs text-[#A175FF] font-medium">Duration</label>
                                        <input
                                            type="text"
                                            value={newTrackDuration}
                                            onChange={(e) => setNewTrackDuration(e.target.value)}
                                            placeholder="4:20"
                                            className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:outline-none text-center"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setShowAddTrack(false)}
                                            className="h-10 text-xs rounded-lg cursor-pointer"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            className="h-10 text-xs rounded-lg cursor-pointer font-bold"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {/* Tracks lists items */}
                            <div className="flex flex-col gap-2.5">
                                {album.tracksList && album.tracksList.length > 0 ? (
                                    album.tracksList.map((track) => (
                                        <div
                                            key={track.id}
                                            className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A175FF] shrink-0">
                                                    <Music className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-whitetext font-semibold text-[13.5px]">
                                                        {track.title}
                                                    </span>
                                                    <span className="text-light-gray/40 text-[11px]">
                                                        {track.duration}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="text-light-gray/40 text-[11px]">
                                                    {track.joined}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                                    track.status === "Published"
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
                                        No tracks in this album yet. Click "+ Add Track" to upload some.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Footer Dialog actions */}
                    <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5 shrink-0">
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                onClick={handleDeleteAlbumClick}
                                className="h-10 text-xs rounded-lg gap-1 border-red-error/25 bg-red-error/10 hover:bg-red-error/20 text-red-error cursor-pointer border"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Album
                            </Button>
                            <Button
                                type="button"
                                onClick={handleTogglePublish}
                                className={`h-10 text-xs rounded-lg gap-1 cursor-pointer border ${
                                    album.status === "Published"
                                        ? "border-[#FFCC00]/25 bg-[#FFCC00]/10 hover:bg-[#FFCC00]/20 text-[#FFCC00]"
                                        : "border-[#34C759]/25 bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759]"
                                }`}
                            >
                                <AlertTriangle className="w-3.5 h-3.5" /> {album.status === "Published" ? "Unpublish" : "Publish Album"}
                            </Button>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="h-10 text-xs rounded-lg bg-white/5 border border-white/10 text-whitetext hover:bg-white/10 px-4 cursor-pointer"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AlbumDetailsDialog

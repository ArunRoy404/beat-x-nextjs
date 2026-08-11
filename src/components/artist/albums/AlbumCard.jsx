"use client"

import React from "react"
import Image from "next/image"
import { Music, Clock, Play, SquarePen, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import AlbumStatusBadge from "@/components/shared/AlbumStatusBadge/AlbumStatusBadge"
import AlbumTrackRow from "./AlbumTrackRow"
import EditAlbumDialog from "@/components/dialogs/artist/EditAlbumDialog"
import DeleteAlbumDialog from "@/components/dialogs/artist/DeleteAlbumDialog"
import AlbumDetailsDialog from "@/components/dialogs/artist/AlbumDetailsDialog"
import { useArtistAlbumsStore } from "@/zustandStore/artist/artistStore/artistAlbumsStore"

const formatStreams = (val) => {
    if (!val) return "0"
    if (val >= 1000000) return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
    if (val >= 1000) return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
    return val.toString()
}

const AlbumCard = ({ album }) => {
    const deleteTrackFromAlbum = useArtistAlbumsStore((state) => state.deleteTrackFromAlbum)

    if (!album) return null

    const previewTracks = album.tracksList?.slice(0, 3) || []
    const remaining = (album.tracksCount || 0) - previewTracks.length

    const handleDeleteTrack = (trackId) => {
        deleteTrackFromAlbum(album.id, trackId)
        toast.success("Track removed from album")
    }

    return (
        <div className="flex flex-col gap-4 p-4 rounded-[16px] border border-whitetext/5 bg-whitetext/[0.02] backdrop-blur-md">
            {/* Header row: cover + genre/status pills, edit/delete actions */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-[12px] overflow-hidden border border-white/10 shrink-0">
                        <Image src={album.avatar} alt={album.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-2 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <CommonTableTag className="normal-case border-secondary/20 text-secondary bg-secondary/10">
                                {album.genre}
                            </CommonTableTag>
                            <AlbumStatusBadge status={album.status} />
                        </div>
                        <h3 className="text-whitetext text-[20px] font-semibold leading-none truncate">
                            {album.name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <EditAlbumDialog album={album}>
                        <Button
                            size="icon"
                            variant="outline"
                            title="Edit Album"
                            className="text-secondary border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                        >
                            <SquarePen className="w-3.5 h-3.5" />
                        </Button>
                    </EditAlbumDialog>
                    <DeleteAlbumDialog album={album}>
                        <Button
                            size="icon"
                            variant="outline"
                            title="Delete Album"
                            className="text-red-error border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </DeleteAlbumDialog>
                </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-light-gray text-[13px] border-b border-whitetext/5 pb-3">
                <span className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 shrink-0" /> {album.tracksCount} tracks
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> {album.duration}
                </span>
                <span className="flex items-center gap-1.5 text-secondary">
                    <Play className="w-3.5 h-3.5 shrink-0" /> {formatStreams(album.streams)}
                </span>
            </div>

            {/* Track preview list */}
            <div className="flex flex-col gap-2">
                {previewTracks.map((track) => (
                    <AlbumTrackRow
                        key={track.id}
                        track={track}
                        onDelete={() => handleDeleteTrack(track.id)}
                    />
                ))}
            </div>

            {/* View all */}
            {remaining > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-light-gray text-[12px]">+{remaining} more tracks</span>
                    <AlbumDetailsDialog album={album}>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs rounded-full border-white/10 bg-white/5 text-light-gray cursor-pointer"
                        >
                            View All
                        </Button>
                    </AlbumDetailsDialog>
                </div>
            )}
        </div>
    )
}

export default AlbumCard

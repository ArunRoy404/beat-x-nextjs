"use client"

import React from "react"
import { format } from "date-fns"
import { Music } from "lucide-react"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"
import { formatDurationMs } from "@/lib/format/formatDuration"

const AlbumDetailContent = ({ album }) => {
    return (
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                <CommonInfoBox label="Artist" value={album?.artist} />
                <CommonInfoBox label="Genre" value={album?.genre?.name} />
                <CommonInfoBox label="Explicit" value={album?.explicit ? "Yes" : "No"} />
                <CommonInfoBox label="Published" value={album?.publishedAt ? format(new Date(album.publishedAt), "MMM d, yyyy") : "-"} />
            </div>

            {/* Songs section (read-only — songs are attached via the Songs module's own Edit form) */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-whitetext font-semibold text-sm">Songs</h4>
                    <span className="text-light-gray/40 text-[11px]">{album?.songs?.length || 0} of {album?.totalSongs ?? 0}</span>
                </div>

                <div className="flex flex-col gap-2">
                    {album?.songs && album.songs.length > 0 ? (
                        album.songs.map((song) => (
                            <div
                                key={song._id}
                                className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-[12px]"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A175FF] shrink-0">
                                        <Music className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-whitetext font-semibold text-[13px] truncate">
                                            {song.title}
                                        </span>
                                        <span className="text-light-gray/40 text-[11px]">
                                            {formatDurationMs(song.durationMs)}
                                        </span>
                                    </div>
                                </div>

                                <span className="text-light-gray/40 text-[11px] capitalize shrink-0">
                                    {song.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-6 text-light-gray/30 text-xs">
                            No songs attached to this album yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlbumDetailContent

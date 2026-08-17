import React from "react"
import { format } from "date-fns"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import AlbumsTableActions from "./AlbumsTableActions"
import { formatDurationMs } from "@/lib/format/formatDuration"

const AlbumsCard = ({ album }) => {
    if (!album) return null

    return (
        <div className="flex flex-col gap-4 p-4 rounded-[16px] border border-whitetext/5 bg-whitetext/[0.02] backdrop-blur-md">
            {/* Top row: Album details + Status badge */}
            <div className="flex items-start justify-between gap-3">
                <CommonSongCell
                    title={album?.title}
                    duration={formatDurationMs(album?.totalDurationMs)}
                    cover={album?.coverUrl}
                />
                <CommonTableStatus status={album?.status} className="shrink-0" />
            </div>

            {/* Metadata list */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-whitetext/5 py-3 text-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Artist</span>
                    <span className="text-whitetext font-medium truncate">{album?.artist || "-"}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Genre</span>
                    <CommonTableTag>{album?.genre?.name || "-"}</CommonTableTag>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Songs</span>
                    <CommonTableStat value={album?.totalSongs ?? 0} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Released</span>
                    <span className="text-whitetext font-medium truncate">
                        {album?.publishedAt ? format(new Date(album.publishedAt), "MMM d, yyyy") : "-"}
                    </span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end">
                <AlbumsTableActions status={album?.status} album={album} className="w-full justify-between pr-0" />
            </div>
        </div>
    )
}

export default AlbumsCard

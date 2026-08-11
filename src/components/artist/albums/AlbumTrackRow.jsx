import React from "react"
import { Eye, Music, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AlbumStatusBadge from "@/components/shared/AlbumStatusBadge/AlbumStatusBadge"

const AlbumTrackRow = ({ track, onDelete }) => {
    if (!track) return null

    return (
        <div className="flex items-center justify-between gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-[12px] hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0">
                    <Music className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-whitetext font-semibold text-[13px] truncate">{track.title}</span>
                    <span className="text-light-gray/40 text-[11px]">{track.duration}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <span className="text-light-gray/40 text-[11px] hidden sm:inline">
                    {track.joined}
                </span>

                <AlbumStatusBadge status={track.status} />

                <Button
                    notImplemented
                    type="button"
                    size="icon"
                    variant="outline"
                    title="Details"
                    className="w-7 h-7 text-secondary border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <Eye className="w-3 h-3 shrink-0" />
                </Button>
                <Button
                    notImplemented
                    type="button"
                    size="icon"
                    variant="outline"
                    title="Edit Track"
                    className="w-7 h-7 text-secondary border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3 h-3" />
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={onDelete}
                    title="Delete Track"
                    className="w-7 h-7 text-red-error border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-3 h-3" />
                </Button>
            </div>
        </div>
    )
}

export default AlbumTrackRow

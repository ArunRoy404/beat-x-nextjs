import React from "react"
import CommonCoverImage from "@/components/shared/CommonCoverImage/CommonCoverImage"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { SONG_STATUS, SONG_STATUS_LABELS, normalizeSongStatus } from "@/lib/constants/songStatus"
import { getSongCoverUrl } from "@/lib/format/resolveMediaUrl"

const STATUS_COLORS = {
    [SONG_STATUS.ACTIVE]: "bg-green-success/15 text-green-success border-green-success/20",
    [SONG_STATUS.DRAFT]: "bg-white/[0.05] text-light-gray border-white/10",
    [SONG_STATUS.SCHEDULED]: "bg-primary/15 text-primary border-primary/20",
    [SONG_STATUS.ARCHIVED]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
    [SONG_STATUS.PENDING]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
    [SONG_STATUS.REJECTED]: "bg-red-error/15 text-red-error border-red-error/20",
}

const SongDetailHeader = ({ song }) => {
    const status = normalizeSongStatus(song?.status)
    const statusClass = STATUS_COLORS[status] || STATUS_COLORS[SONG_STATUS.DRAFT]

    // `album` comes back as a populated ref (Album.title) or a bare ObjectId,
    // which must never be rendered straight into JSX.
    const albumName =
        typeof song?.album === "object" && song?.album !== null
            ? song?.album?.title || song?.album?.name || ""
            : typeof song?.album === "string"
                ? song.album
                : ""

    return (
        <div
            className="p-3 sm:p-4 border-b border-white/5 flex items-start justify-between gap-3 sm:gap-4 shrink-0"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-3 sm:gap-4 w-full">
                {/* Cover Art */}
                <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-[12px] sm:rounded-[16px] bg-white/5 border border-white/10 overflow-hidden shrink-0">
                    <CommonCoverImage
                        src={getSongCoverUrl(song)}
                        alt={song?.title || "Song Cover"}
                    />
                </div>

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[60px] sm:min-h-[80px] pr-4 sm:pr-8 flex-1 min-w-0">
                    <div className="flex flex-col gap-1.5 sm:gap-[12px]">
                        {/* Title row */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h2 className="text-[15px] sm:text-[18px] font-medium text-whitetext not-italic leading-none truncate max-w-full">
                                {song?.title}
                            </h2>
                            <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full border capitalize ${statusClass}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                                {SONG_STATUS_LABELS[status] || song?.status || "-"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full border bg-primary/15 text-primary border-primary/20 select-none">
                                {song?.genre?.name || "-"}
                            </span>
                        </div>

                        {/* Subtitle / Artist */}
                        <p className="text-[12px] sm:text-[14px] font-normal not-italic text-light-gray leading-none truncate">
                            {song?.artist || "-"}{albumName ? ` · ${albumName}` : ""}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-3">
                        <div className="flex flex-col gap-1 sm:gap-[8px]">
                            <span className="text-[14px] sm:text-[16px] font-medium not-italic text-whitetext leading-tight">{song?.playCount ?? 0}</span>
                            <span className="text-[10px] sm:text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Plays</span>
                        </div>
                        <div className="w-[1px] h-5 sm:h-6 bg-white/10" />
                        <div className="flex flex-col gap-1 sm:gap-[8px]">
                            <span className="text-[14px] sm:text-[16px] font-medium not-italic text-whitetext leading-tight">{formatDurationMs(song?.durationMs)}</span>
                            <span className="text-[10px] sm:text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetailHeader

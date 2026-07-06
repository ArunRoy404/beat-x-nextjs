import React from "react"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

const AlbumDetailHeader = ({ album }) => {
    const status = album?.status || "Under Review"

    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4">
                {/* Cover Art */}
                <div className="relative w-[80px] h-[80px] rounded-[16px] overflow-hidden border border-white/10 shrink-0">
                    <Image
                        src={album?.avatar || "/bg-images/card_bg.png"}
                        alt={album?.name || "Album Cover"}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[80px] pr-8">
                    <div className="flex flex-col gap-[8px]">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none">
                                {album?.name}
                            </h2>
                            {/* Verification Checkmark */}
                            <div className="w-4 h-4 rounded-full bg-yellow-warning flex items-center justify-center text-black shrink-0">
                                <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
                            </div>
                            {/* Status Pills */}
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-primary/15 text-[#3ADFFA] border-[#3ADFFA]/20">
                                {album?.genre}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${
                                status === "Published"
                                    ? "bg-green-success/15 text-green-success border-green-success/20"
                                    : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20"
                            }`}>
                                {status}
                            </span>
                        </div>

                        {/* Subtitle / Artist */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none">
                            By {album?.artist || "Unknown Artist"}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="flex items-center gap-6 mt-3">
                        <div className="flex flex-col gap-[4px]">
                            <span className="text-[14px] font-semibold text-whitetext leading-tight">
                                {album?.tracksCount || 0}
                            </span>
                            <span className="text-[10px] font-semibold text-dark-gray uppercase tracking-wider">Tracks</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[4px]">
                            <span className="text-[14px] font-semibold text-whitetext leading-tight">
                                {album?.duration || "0 min"}
                            </span>
                            <span className="text-[10px] font-semibold text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[4px]">
                            <span className="text-[14px] font-semibold text-whitetext leading-tight">
                                {album?.streams >= 1000000 
                                    ? `${(album.streams / 1000000).toFixed(1).replace(/\.0$/, "")}M` 
                                    : album?.streams?.toLocaleString() || "0"}
                            </span>
                            <span className="text-[10px] font-semibold text-dark-gray uppercase tracking-wider">Streams</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[4px]">
                            <span className="text-[14px] font-semibold text-whitetext leading-tight">
                                {album?.released || "-"}
                            </span>
                            <span className="text-[10px] font-semibold text-dark-gray uppercase tracking-wider">Released</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumDetailHeader

import React from "react"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

const SongDetailHeader = ({ song }) => {
    const status = song?.status || "Under Review"

    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4">
                {/* Cover Art */}
                <Image
                    src="/bg-images/card_bg.png"
                    alt={song?.title || "Song Cover"}
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] rounded-[16px] object-cover border border-white/10 shrink-0"
                />

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[80px] pr-8">
                    <div className="flex flex-col gap-[12px]">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none">
                                {song?.title}
                            </h2>
                            {/* Verification Checkmark */}
                            <div className="w-4 h-4 rounded-full bg-yellow-warning flex items-center justify-center text-black shrink-0">
                                <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
                            </div>
                            {/* Status Pills */}
                            {status === "Published" && (
                                <>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                                        Published
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20">
                                        Take Down
                                    </span>
                                </>
                            )}
                            {status === "Take Down" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20">
                                    Take Down
                                </span>
                            )}
                            {status === "Under Review" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
                                    Under Review
                                </span>
                            )}
                        </div>

                        {/* Subtitle / Artist */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none">
                            {song?.artist || "Unknown Artist"} {song?.album ? `· ${song.album}` : ""}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="flex items-center gap-6 mt-3">
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">{song?.streams || "0"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Plays</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">{song?.duration || "-"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetailHeader
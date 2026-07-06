"use client"

import React from "react"
import { Music } from "lucide-react"
import Image from "next/image"
import InfoBox from "./InfoBox"
import SongDetailHeader from "./SongDetailHeader"

const SongDetailContent = ({ song }) => {
    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Modal Header */}
            <SongDetailHeader song={song} />

            {/* Scrollable Body Content */}
            <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
                <div className="grid grid-cols-2 gap-4">
                    {/* Song Box */}
                    <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
                        <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Song</span>
                        <div className="group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/15 gap-2 w-full">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <Music className="w-5 h-5" />
                            </div>
                            <div className="text-center min-w-0 w-full px-4 flex flex-col items-center gap-1">
                                <p className="text-whitetext text-sm font-medium truncate">
                                    {song?.title || "Audio file"}
                                </p>
                                <p className="text-light-whitetext text-[11px]">
                                    MP3, 250MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Box */}
                    <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
                        <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Thumbnail</span>
                        <div className="relative w-full h-32 rounded-[16px] overflow-hidden">
                            <Image
                                src="/bg-images/card_bg.png"
                                alt="Thumbnail"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-[16px]"
                            />
                        </div>
                    </div>

                    {/* Info rows */}
                    <InfoBox label="Artist" value={song?.artist || "Unknown Artist"} />
                    <InfoBox label="Album" value={song?.album || "Single"} />
                    <InfoBox label="Genre" value={song?.genre || "-"} />
                    <InfoBox label="Duration" value={song?.duration || "-"} />
                    <InfoBox label="Release Date" value={song?.released || "-"} />
                    <InfoBox label="Total Streams" value={song?.streams || "0"} />
                    <InfoBox label="Format" value="MP3 · 320kbps" />
                    <InfoBox label="Explicit" value={song?.isExplicit ? "Yes" : "No"} />

                    {/* Description Box (Full Width) */}
                    <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                        <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                            {song?.description || `"${song?.title}" is a ${song?.genre || "Pop"} track by ${song?.artist || "Unknown Artist"} from the album ${song?.album || "Asha"}. It has accumulated ${song?.streams || "0"} streams since release.`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetailContent
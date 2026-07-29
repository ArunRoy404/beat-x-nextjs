"use client"

import React from "react"
import Image from "next/image"
import InfoBox from "./InfoBox"

const AudioBookDetailContent = ({ book }) => {
    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                
                {/* Thumbnail / Cover Art Box (Full width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
                    <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Thumbnail</span>
                    <div className="relative w-full h-36 rounded-[16px] overflow-hidden border border-white/10">
                        <Image
                            src={book?.cover || "/audioBookImages/projectHill.png"}
                            alt="Cover Thumbnail"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover rounded-[16px]"
                        />
                    </div>
                </div>

                {/* Info Boxes */}
                <InfoBox label="Author" value={book?.artist || "Unknown Author"} />
                <InfoBox label="Narrator" value={book?.narrator || "Unknown Narrator"} />
                <InfoBox label="Genre" value={book?.category || "Fiction"} />
                <InfoBox label="Episode" value={book?.episode || "14"} />
                <InfoBox label="Category" value={book?.category || "Biography"} />
                <InfoBox label="Language" value={book?.language || "Bengali"} />
                <InfoBox label="Total Duration" value={book?.duration || "12h 40m"} />
                <InfoBox label="Total Chapters" value={book?.chaptersCount ? `${book.chaptersCount}` : "18"} />

                {/* Synopsis (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Synopsis</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {book?.synopsis || `No synopsis provided for "${book?.title}". This audiobook was authored by ${book?.artist} and narrated by ${book?.narrator}.`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AudioBookDetailContent

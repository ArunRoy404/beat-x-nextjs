import React from "react"
import Image from "next/image"
import { ShieldCheck, SquarePen } from "lucide-react"
import EditAudioBookDialog from "@/components/dialogs/admin/EditAudioBookDialog"

const AudioBookDetailHeader = ({ book }) => {
    const status = book?.status || "Published"

    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4 w-full">
                {/* 3D Book Stacks Icon Thumbnail */}
                <div className="w-[80px] h-[80px] rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0 overflow-hidden relative">
                    <Image
                        src={book?.cover || "/audioBookImages/projectHill.png"}
                        alt={book?.title || "Audiobook Cover"}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                </div>

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[80px] flex-1 min-w-0 pr-8">
                    <div className="flex flex-col gap-[12px]">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none truncate max-w-[200px] sm:max-w-xs">
                                {book?.title}
                            </h2>
                            {/* Verification Checkmark */}
                            <div className="w-4 h-4 rounded-full bg-yellow-warning flex items-center justify-center text-black shrink-0">
                                <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
                            </div>
                            {/* Status Pill */}
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                                {status}
                            </span>
                            {/* Category Pill */}
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-[#CC97FF]/15 text-[#CC97FF] border-[#CC97FF]/20 select-none">
                                {book?.category}
                            </span>
                        </div>

                        {/* Subtitle / Author */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none truncate">
                            {book?.artist || "Unknown Author"} · Narrated by {book?.narrator || "Unknown Narrator"}
                        </p>
                    </div>

                    {/* Short Stats (4 Columns: Duration, Chapters, Listens, Language) */}
                    <div className="grid grid-cols-4 gap-2 mt-3 w-full border-t border-white/5 pt-2 text-left">
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.duration || "-"}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.chaptersCount || "0"}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Chapters</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.streams || "0"}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Listens</span>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{book?.language || "Bengali"}</span>
                            <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Language</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Absolute Edit Button placed to the left of Close button (Close is at top-4 right-6) */}
            <div className="absolute top-4 right-16 z-50">
                <EditAudioBookDialog>
                    <button
                        className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                        <SquarePen className="w-3.5 h-3.5" />
                        Edit
                    </button>
                </EditAudioBookDialog>
            </div>
        </div>
    )
}

export default AudioBookDetailHeader

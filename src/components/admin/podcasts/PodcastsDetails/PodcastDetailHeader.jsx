import React from "react"
import Image from "next/image"
import { ShieldCheck, SquarePen } from "lucide-react"
import EditPodcastDialog from "@/components/dialogs/admin/podcasts/EditPodcastDialog"
import { Button } from "@/components/ui/button"

const PodcastDetailHeader = ({ podcast }) => {
    const status = podcast?.status || "Under Review"

    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4">
                {/* Cover Art */}
                <Image
                    src={podcast?.cover || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=150"}
                    alt={podcast?.title || "Podcast Cover"}
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
                                {podcast?.title}
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
                            {status === "Rejected" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-red-error/15 text-red-error border-red-error/20">
                                    Rejected
                                </span>
                            )}
                            {status === "Draft" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-white/10 text-light-gray border-white/20">
                                    Draft
                                </span>
                            )}
                            {status === "Scheduled" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-[#CC97FF]/15 text-[#CC97FF] border-[#CC97FF]/20">
                                    Scheduled
                                </span>
                            )}
                        </div>

                        {/* Subtitle / Artist */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none">
                            {podcast?.artist || "Unknown Host"} {podcast?.series ? `· ${podcast.series}` : ""}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="flex items-center gap-6 mt-3">
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">{podcast?.listeners || "0"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Plays</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">{podcast?.duration || "-"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Duration</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Absolute Edit Button placed to the left of Close button (Close is at top-4 right-6) */}
            <div className="absolute top-4 right-16 z-50">
                <EditPodcastDialog podcast={podcast}>
                    <button
                        className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                        <SquarePen className="w-3.5 h-3.5" />
                        Edit
                    </button>
                </EditPodcastDialog>
            </div>
        </div>
    )
}

export default PodcastDetailHeader

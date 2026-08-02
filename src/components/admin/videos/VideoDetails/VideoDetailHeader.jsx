import React from "react"
import { ShieldCheck, SquarePen, Play, X } from "lucide-react"
import EditVideoDialog from "@/components/dialogs/admin/EditVideoDialog"
import { DialogClose } from "@/components/ui/dialog"

const VideoDetailHeader = ({ video }) => {
    const status = video?.status || "Published"
    const isPublished = status === "Published"

    return (
        <div className="flex flex-col w-full shrink-0 relative bg-[#1A1A19]">
            {/* 240px Player/Thumbnail Area */}
            <div
                className="relative flex h-[240px] flex-col justify-center items-center self-stretch rounded-t-[16px] bg-cover bg-center bg-no-repeat shadow-[0_0_10px_0_rgba(204,151,255,0.20)]"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${video?.cover}')`,
                  backgroundColor: "lightgray"
                }}
            >
                {/* Reusable play button style */}
                <div className="flex w-[56px] h-[56px] justify-center items-center shrink-0 rounded-full bg-secondary hover:bg-secondary/90 text-background shadow-[0_0_10px_0_rgba(204,151,255,0.20)] transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    <Play className="w-5 h-5 fill-current text-[#004B56]" />
                </div>
            </div>

            {/* Title & Actions Row (below player) */}
            <div
                className="p-4 border-b border-white/5 flex flex-col gap-3 shrink-0 relative w-full"
                style={{ background: "var(--modal-header-bg)" }}
            >
                <div className="flex flex-col gap-[12px] pr-24 text-left">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none truncate max-w-[200px] sm:max-w-xs">
                            {video?.title}
                        </h2>
                        {/* Verification Checkmark */}
                        <div className="w-4 h-4 rounded-full bg-yellow-warning flex items-center justify-center text-black shrink-0">
                            <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
                        </div>
                        {/* Status Pill */}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${
                            isPublished ? "bg-green-success/15 text-green-success border-green-success/20" : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20"
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPublished ? "bg-green-success" : "bg-yellow-warning"}`} />
                            {status}
                        </span>
                        {/* Genre Pill */}
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-secondary/15 text-secondary border-secondary/20 select-none">
                            {video?.genre}
                        </span>
                    </div>

                    {/* Subtitle / Artist */}
                    <p className="text-[14px] font-normal not-italic text-light-gray leading-none truncate">
                        {video?.artist || "Unknown Artist"} &middot; {video?.released}
                    </p>
                </div>

                {/* Short Stats (4 Columns: Duration, Views, Likes, Dislikes) */}
                <div className="grid grid-cols-4 gap-2 mt-3 w-full border-t border-white/5 pt-2 text-left">
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.duration || "-"}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Duration</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.streams || "0"}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Views</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.likes || "0"}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Likes</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[14px] sm:text-[15px] font-semibold text-whitetext truncate">{video?.dislikes || "0"}</span>
                        <span className="text-[10px] font-medium text-dark-gray uppercase tracking-wider">Dislikes</span>
                    </div>
                </div>

                {/* Absolute Edit Button placed to the left of Close button (Close is top-right in DialogContent) */}
                <div className="absolute top-4 right-4 z-50">
                    <EditVideoDialog video={video}>
                        <button
                            className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                        >
                            <SquarePen className="w-3.5 h-3.5" />
                            Edit
                        </button>
                    </EditVideoDialog>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailHeader

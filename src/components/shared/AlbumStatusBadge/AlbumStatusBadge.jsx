import React from "react"
import { cn } from "@/lib/utils"

const STATUS_STYLES = {
    Published: "border-green-success/20 bg-green-success/10 text-green-success",
    "Under Review": "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning",
    Scheduled: "border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF]",
    Rejected: "border-red-error/20 bg-red-error/10 text-red-error",
}

const AlbumStatusBadge = ({ status, className }) => {
    if (!status || !STATUS_STYLES[status]) return null

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 border text-[10px] font-medium px-2.5 py-0.5 rounded-full select-none shrink-0",
                STATUS_STYLES[status],
                status === "Under Review" && "gap-1.5",
                className
            )}
        >
            {status === "Under Review" && (
                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
            )}
            {status}
        </span>
    )
}

export default AlbumStatusBadge

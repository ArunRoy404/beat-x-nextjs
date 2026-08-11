import React from "react"
import { cn } from "@/lib/utils"

const STATUS_STYLES = {
    Upcoming: "border-secondary/20 bg-secondary/10 text-secondary",
    Live: "border-green-success/20 bg-green-success/10 text-green-success",
    Completed: "border-white/10 bg-white/[0.05] text-light-gray",
    "Under Review": "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning",
    "Sold Out": "border-red-error/20 bg-red-error/10 text-red-error",
    Rejected: "border-red-error/20 bg-red-error/10 text-red-error",
    Draft: "border-white/10 bg-white/[0.05] text-light-gray",
}

const PULSE_STATUSES = ["Live", "Under Review"]

const EventStatusBadge = ({ status, className }) => {
    if (!status || !STATUS_STYLES[status]) return null

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 border text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none shrink-0",
                STATUS_STYLES[status],
                className
            )}
        >
            {PULSE_STATUSES.includes(status) && (
                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
            )}
            {status}
        </span>
    )
}

export default EventStatusBadge

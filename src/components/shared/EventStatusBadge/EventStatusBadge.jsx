import React from "react"
import { cn } from "@/lib/utils"

const STATUS_MAP = {
    upcoming: { label: "Upcoming", style: "border-secondary/20 bg-secondary/10 text-secondary" },
    live: { label: "Live", style: "border-green-success/20 bg-green-success/10 text-green-success", pulse: true },
    active: { label: "Live", style: "border-green-success/20 bg-green-success/10 text-green-success", pulse: true },
    completed: { label: "Completed", style: "border-white/10 bg-white/[0.05] text-light-gray" },
    under_review: { label: "Under Review", style: "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning", pulse: true },
    sold_out: { label: "Sold Out", style: "border-red-error/20 bg-red-error/10 text-red-error" },
    rejected: { label: "Rejected", style: "border-red-error/20 bg-red-error/10 text-red-error" },
    draft: { label: "Draft", style: "border-white/10 bg-white/[0.05] text-light-gray" },
}

const EventStatusBadge = ({ status, className }) => {
    if (!status) return null

    const key = String(status).toLowerCase().trim().replace(/ /g, "_")
    const match = STATUS_MAP[key]

    if (!match) return null

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 border text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none shrink-0",
                match.style,
                className
            )}
        >
            {match.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
            )}
            {match.label}
        </span>
    )
}

export default EventStatusBadge

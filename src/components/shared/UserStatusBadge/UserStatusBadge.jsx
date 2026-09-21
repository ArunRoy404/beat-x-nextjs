import React from "react"
import { cn } from "@/lib/utils"

const STATUS_MAP = {
    active: { label: "Active", style: "border-green-success/20 bg-green-success/10 text-green-success" },
    suspended: { label: "Suspended", style: "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning" },
    banned: { label: "Banned", style: "border-red-error/20 bg-red-error/10 text-red-error" },
}

const UserStatusBadge = ({ status, className }) => {
    if (!status) return null

    const key = String(status).toLowerCase().trim()
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
            {match.label}
        </span>
    )
}

export default UserStatusBadge

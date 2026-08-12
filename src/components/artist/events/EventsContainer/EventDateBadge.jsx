import React from "react"
import { cn } from "@/lib/utils"

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

const EventDateBadge = ({ date, className }) => {
    const parsed = date ? new Date(date) : null
    const isValid = parsed && !Number.isNaN(parsed.getTime())

    const month = isValid ? MONTHS[parsed.getMonth()] : "—"
    const day = isValid ? parsed.getDate() : "-"

    return (
        <div
            className={cn(
                "flex flex-col justify-center items-center px-4 py-2 rounded-[12px] border border-[var(--date-badge-border)] bg-[var(--date-badge-bg)] shrink-0",
                className
            )}
        >
            <span className="text-secondary text-[12px] font-semibold leading-none">{month}</span>
            <span className="text-whitetext text-[24px] font-semibold leading-none mt-1">{day}</span>
        </div>
    )
}

export default EventDateBadge

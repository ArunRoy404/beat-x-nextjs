import React from "react"
import { cn } from "@/lib/utils"

const EventTicketProgress = ({ ticketsSold = 0, totalTickets = 0, className }) => {
    const percent = totalTickets > 0 ? Math.min(100, Math.round((ticketsSold / totalTickets) * 100)) : 0

    const isFull = percent >= 100

    return (
        <div className={cn("flex items-center gap-3 w-full", className)}>
            <div className="flex-1 h-[10px] rounded-full bg-dark-accent overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", isFull ? "bg-red-error" : "bg-secondary")}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="text-light-gray text-[12px] font-normal shrink-0 whitespace-nowrap">
                {ticketsSold}/{totalTickets} tickets sold ({percent}%)
            </span>
        </div>
    )
}

export default EventTicketProgress

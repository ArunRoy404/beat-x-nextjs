import React from "react"
import { cn } from "@/lib/utils"

const TYPE_STYLES = {
    Streaming: "border-secondary/20 bg-secondary/10 text-secondary",
    Merchandise: "border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF]",
    Payout: "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning",
    Event: "border-green-success/20 bg-green-success/10 text-green-success",
    Podcast: "border-[#E5F9CF]/30 bg-[#E5F9CF]/10 text-[#E5F9CF]",
}

const TransactionTypeBadge = ({ type, className }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center border text-[11px] font-medium px-2.5 py-0.5 rounded-full select-none shrink-0",
                TYPE_STYLES[type] || "border-white/10 bg-white/5 text-light-gray",
                className
            )}
        >
            {type}
        </span>
    )
}

export default TransactionTypeBadge

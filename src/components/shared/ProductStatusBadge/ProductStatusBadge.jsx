import React from "react"
import { cn } from "@/lib/utils"

const ProductStatusBadge = ({ status, showDot = false, className }) => {
    const statusClasses =
        status === "Active"
            ? "bg-green-success/15 text-green-success border-green-success/20"
            : status === "Rejected"
                ? "bg-red-error/15 text-red-error border-red-error/20"
                : status === "Draft"
                    ? "bg-white/5 text-light-gray/60 border-white/10"
                    : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20" // Under review

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border select-none",
                statusClasses,
                className
            )}
        >
            {showDot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
            {status || "Pending"}
        </span>
    )
}

export default ProductStatusBadge

import React from "react"
import { cn } from "@/lib/utils"

const CommonTableStatus = ({ status, className }) => {
  return (
    <div className={cn("flex", className)}>
      {status === "Published" && (
        <span className="border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
          Published
        </span>
      )}
      {status === "Under Review" && (
        <span className="border border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full flex items-center gap-1.5 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-warning animate-pulse" />
          Under Review
        </span>
      )}
      {status === "Scheduled" && (
        <span className="border border-yellow-warning/30 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
          Scheduled
        </span>
      )}
      {status === "Draft" && (
        <span className="border border-white/10 bg-white/[0.05] text-light-gray text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
          Draft
        </span>
      )}
      {status === "Rejected" && (
        <span className="border border-red-error/20 bg-red-error/10 text-red-error text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
          Rejected
        </span>
      )}
      {status === "Take Down" && (
        <span className="border border-secondary/20 bg-secondary/10 text-secondary text-[12px] font-normal px-2.5 py-0.5 rounded-full select-none">
          Take Down
        </span>
      )}
    </div>
  )
}

export default CommonTableStatus
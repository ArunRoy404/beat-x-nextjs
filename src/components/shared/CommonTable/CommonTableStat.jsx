import React from "react"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonTableStat = ({ value, className }) => {
  const hasValue = value && value !== "0" && value !== "-"
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {hasValue ? (
        <>
          <TrendingUp className="w-3.5 h-3.5 text-green-success shrink-0" />
          <span className="text-green-success text-[14px] font-normal">~ {value}</span>
        </>
      ) : (
        <span className="text-[14px] font-normal text-dark-gray select-none">~ 0</span>
      )}
    </div>
  )
}

export default CommonTableStat
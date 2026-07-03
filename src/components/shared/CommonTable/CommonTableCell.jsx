import React from "react"
import { cn } from "@/lib/utils"

const CommonTableCell = ({ children, className }) => {
  return (
    <span className={cn("text-light-gray text-[14px] font-normal truncate block", className)}>
      {children}
    </span>
  )
}

export default CommonTableCell
import React from "react"
import { cn } from "@/lib/utils"

const CommonTableHeader = ({ children, className }) => {
  return (
    <span className={cn("text-light-gray text-[16px] font-normal select-none", className)}>
      {children}
    </span>
  )
}

export default CommonTableHeader
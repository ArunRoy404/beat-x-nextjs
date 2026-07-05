import React from "react"
import { cn } from "@/lib/utils"

const CommonTableTag = ({ children, className }) => {
  return (
    <div className="flex">
      <span className={cn("inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] uppercase font-normal select-none", className)}>
        {children}
      </span>
    </div>
  )
}

export default CommonTableTag
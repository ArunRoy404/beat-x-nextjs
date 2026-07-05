import React from "react"
import { cn } from "@/lib/utils"

const CommonFilterItem = ({ label, isActive, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 select-none whitespace-nowrap border",
        isActive
          ? "bg-nav-icon-bg border-secondary text-secondary"
          : "bg-white/[0.03] text-light-gray border-transparent hover:bg-white/[0.06]",
        className
      )}
    >
      {label}
    </button>
  )
}

export default CommonFilterItem
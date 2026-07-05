import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CommonFilterItem = ({ label, isActive, onClick, className }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      className={cn(
        "h-auto px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 select-none whitespace-nowrap border shadow-none hover:text-inherit active:translate-y-0",
        isActive
          ? "bg-nav-icon-bg border-secondary text-secondary hover:bg-nav-icon-bg"
          : "bg-white/[0.03] text-light-gray border-transparent hover:bg-white/[0.06]",
        className
      )}
    >
      {label}
    </Button>
  )
}

export default CommonFilterItem
import React from "react"
import { ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonTableEmptyState = ({
  icon: Icon = ShieldAlert,
  title = "No Data Found",
  subtitle = "No records found matching your criteria.",
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 gap-3 text-center bg-dark-accent/40 rounded-none border border-border/50", className)}>
      <div className="w-10 h-10 rounded-none bg-dark-gray/30 flex items-center justify-center text-light-gray">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-whitetext text-sm font-medium">{title}</span>
      {subtitle && <p className="text-light-gray text-xs">{subtitle}</p>}
    </div>
  )
}

export default CommonTableEmptyState

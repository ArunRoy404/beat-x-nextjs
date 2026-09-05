import React from "react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const CommonTableLoadingState = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center py-16", className)}>
      <Spinner className="size-6 text-secondary" />
    </div>
  )
}

export default CommonTableLoadingState

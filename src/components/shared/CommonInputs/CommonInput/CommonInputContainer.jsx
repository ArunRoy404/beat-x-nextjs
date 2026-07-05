import React from "react"
import { cn } from "@/lib/utils"

const CommonInputContainer = ({ children, className }) => {
    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-[16px] shrink-0", className)}>
            {children}
        </div>
    )
}

export default CommonInputContainer
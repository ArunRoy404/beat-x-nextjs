import React from "react"
import { cn } from "@/lib/utils"

const CommonFormContainer = ({ onSubmit, children, className }) => {
    return (
        <form
            onSubmit={onSubmit}
            className={cn(
                "flex-1 overflow-y-auto p-6 flex flex-col gap-[16px] text-left [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
                className
            )}
        >
            {children}
        </form>
    )
}

export default CommonFormContainer
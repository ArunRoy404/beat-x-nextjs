import React from "react"
import { cn } from "@/lib/utils"

const CommonCard = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[8px] border border-border p-4 bg-[#0E0E0E]",
                className
            )}
            {...props}
        >
            {/* Background image layer with 10% opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
            />
            {children}
        </div>
    )
}

export default CommonCard
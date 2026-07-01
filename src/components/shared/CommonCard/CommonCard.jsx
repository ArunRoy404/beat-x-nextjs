import React from "react"
import { cn } from "@/lib/utils"
import CardAction from "./CardAction"

const CommonCard = ({ children, className, title, subtitle, tag, link, ...props }) => {
    // If either title or subtitle is missing, do not render the header block.
    const hasHeader = title && subtitle;

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
            
            {/* Header */}
            {hasHeader && (
                <div className="flex items-center justify-between z-10 relative mb-4">
                    <div className="flex flex-col">
                        <h3 className="text-whitetext text-[24px] not-italic font-medium">
                            {title}
                        </h3>
                        <span className="text-light-gray text-[14px] not-italic font-normal">
                            {subtitle}
                        </span>
                    </div>
                    {/* Render action tag */}
                    {tag && (
                        <CardAction onClick={tag?.onClick}>
                            {typeof tag === "object" ? tag.text : tag}
                        </CardAction>
                    )}
                    {/* Render navigation link */}
                    {link && (
                        <CardAction href={typeof link === "object" ? link.href : undefined} onClick={link?.onClick}>
                            {typeof link === "object" ? link.text : link}
                        </CardAction>
                    )}
                </div>
            )}
            
            {children}
        </div>
    )
}

export default CommonCard
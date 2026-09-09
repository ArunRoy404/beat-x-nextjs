"use client"

import { useState } from "react"
import Image from "next/image"
import { Music } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonMediaCard = ({ art, title, subtitle, className, imgClassName, shadow = false, onClick, ...props }) => {
    const [imageError, setImageError] = useState(false)

    return (
        <div onClick={onClick} className={cn("flex min-w-0 flex-col gap-2", className)} {...props}>
            <div
                className={cn(
                    "relative w-full overflow-hidden rounded-[16px] bg-dark-accent/50",
                    shadow && "shadow-[0px_0px_10px_0px_rgba(204,151,255,0.2)]",
                    imgClassName
                )}
            >
                {art && !imageError ? (
                    <Image
                        alt={title || "Media cover"}
                        src={art}
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 256px"
                        onError={() => setImageError(true)}
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-dark-accent/40 text-light-gray p-4">
                        <Music className="size-8 text-secondary" />
                    </div>
                )}
            </div>
            {title && <span className="truncate text-lg font-semibold text-whitetext">{title}</span>}
            {subtitle && <span className="truncate text-sm text-light-gray">{subtitle}</span>}
        </div>
    )
}

export default CommonMediaCard


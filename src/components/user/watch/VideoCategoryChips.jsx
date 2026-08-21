"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"

const VideoCategoryChips = () => {
    const videoCategories = useUserWatchStore((state) => state.videoCategories)
    const [active, setActive] = useState(videoCategories[0])

    return (
        <div className="flex w-full items-center gap-2 overflow-x-auto">
            {videoCategories.map((category) => (
                <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    className={cn(
                        "shrink-0 cursor-pointer rounded-full px-4 py-2 text-base whitespace-nowrap",
                        active === category ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default VideoCategoryChips

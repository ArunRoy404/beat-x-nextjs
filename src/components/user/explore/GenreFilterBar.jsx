"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const GenreFilterBar = () => {
    const genreFilters = useUserExploreStore((state) => state.genreFilters)
    const [active, setActive] = useState(genreFilters[0])

    return (
        <div className="flex w-full items-center gap-2 overflow-x-auto">
            {genreFilters.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    onClick={() => setActive(filter)}
                    className={cn(
                        "shrink-0 cursor-pointer rounded-full px-4 py-2 text-base whitespace-nowrap",
                        active === filter ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray"
                    )}
                >
                    {filter}
                </button>
            ))}
            <button
                type="button"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center self-stretch rounded-full bg-dark-accent text-light-gray"
                aria-label="More filters"
            >
                <ChevronRight className="size-5" />
            </button>
        </div>
    )
}

export default GenreFilterBar

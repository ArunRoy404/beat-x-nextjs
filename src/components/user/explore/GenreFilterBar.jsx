"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
const GenreFilterBar = ({ genres = [], activeFilter = "All", onSelectFilter }) => {
    const filterList = ["All", ...(genres?.map((g) => g?.name || g?.title).filter(Boolean) || [])]

    return (
        <div className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar">
            {filterList.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    onClick={() => onSelectFilter?.(filter)}
                    className={cn(
                        "shrink-0 cursor-pointer rounded-full px-4 py-2 text-base whitespace-nowrap transition-colors",
                        activeFilter === filter ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray hover:text-whitetext"
                    )}
                >
                    {filter}
                </button>
            ))}
            <button
                type="button"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center self-stretch rounded-full bg-dark-accent text-light-gray hover:text-whitetext"
                aria-label="More filters"
            >
                <ChevronRight className="size-5" />
            </button>
        </div>
    )
}

export default GenreFilterBar


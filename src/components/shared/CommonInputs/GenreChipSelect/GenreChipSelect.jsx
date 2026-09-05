"use client"

import React from "react"
import { cn } from "@/lib/utils"

const GenreChipSelect = ({ label, options = [], value = [], onChange, containerClassName }) => {
    const toggleGenre = (genre) => {
        if (value.includes(genre)) {
            onChange(value.filter((item) => item !== genre))
        } else {
            onChange([...value, genre])
        }
    }

    return (
        <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
            {label && <span className="text-primary text-[14px] font-normal">{label}</span>}

            <div className="flex flex-wrap gap-2.5">
                {options.map((genre) => {
                    const selected = value.includes(genre)
                    return (
                        <button
                            key={genre}
                            type="button"
                            onClick={() => toggleGenre(genre)}
                            className={cn(
                                "cursor-pointer rounded-[12px] border px-2.5 py-1.5 text-[12px] transition-colors",
                                selected
                                    ? "border-secondary bg-secondary/10 text-secondary"
                                    : "border-light-gray/30 bg-white/5 text-light-gray hover:border-light-gray/50"
                            )}
                        >
                            {genre}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default GenreChipSelect

"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * The track/fill/thumb treatment shared by every media control in the app —
 * the floating stream bar and the admin song detail player both render this,
 * so the two stay visually identical by construction rather than by two
 * copies of the same Tailwind string drifting apart.
 *
 * A real <input type="range"> is layered invisibly on top of the painted
 * track so keyboard, pointer and a11y behaviour stay native. The vertical
 * form rotates that same input a quarter turn, which keeps drag direction
 * (up = louder) and every native affordance intact.
 */
const VARIANTS = {
    progress: { thickness: "h-2", fill: "bg-(image:--button-bg)" },
    volume: { thickness: "h-1", fill: "bg-light-gray" },
}

const PlayerSlider = ({
    value = 0,
    max = 0,
    step = 0.1,
    onChange,
    disabled = false,
    variant = "progress",
    vertical = false,
    length = "h-24",
    ariaLabel,
    className,
}) => {
    const { thickness, fill } = VARIANTS[variant] ?? VARIANTS.progress
    const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0
    // The rotated input's width has to equal the track's height, so the two
    // are derived from one token (h-24 -> w-24).
    const rotatedWidth = length.replace(/^h-/, "w-")

    if (vertical) {
        const width = thickness.replace(/^h-/, "w-")
        return (
            <div className={cn("relative", width, length, disabled && "opacity-40", className)}>
                <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                    <div
                        className={cn("absolute bottom-0 left-0 w-full rounded-full", fill)}
                        style={{ height: `${ratio * 100}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={0}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    aria-orientation="vertical"
                    className={cn(
                        "absolute left-1/2 top-1/2 h-6 -translate-x-1/2 -translate-y-1/2 -rotate-90 cursor-pointer opacity-0 disabled:cursor-not-allowed",
                        rotatedWidth
                    )}
                />
            </div>
        )
    }

    return (
        <div className={cn("relative w-full", thickness, disabled && "opacity-40", className)}>
            <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                <div className={cn("h-full rounded-full", fill)} style={{ width: `${ratio * 100}%` }} />
            </div>
            <input
                type="range"
                min={0}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                disabled={disabled}
                aria-label={ariaLabel}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            />
        </div>
    )
}

export default PlayerSlider

"use client"

/* eslint-disable @next/next/no-img-element -- the plain <img> is the point of
   this component; see the note on the component below. */

import React, { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Fills its (positioned) parent with a remote cover image.
 *
 * Deliberately a plain <img> rather than next/image: these are user-uploaded
 * S3 assets shown at small fixed sizes, and next/image routes them through
 * the /_next/image optimizer, which means the Next server has to fetch S3
 * server-side on every render. That extra hop is the one thing separating
 * the covers that render in the songs table (CommonAvatar -> plain <img>,
 * straight to S3) from the ones that don't. Same asset, same URL — only the
 * delivery path differs, so this matches the path that works.
 *
 * The parent must be positioned (`relative`) and have a size; this fills it.
 */
const CommonCoverImage = ({ src, alt = "", className, fallback = null }) => {
    const [failed, setFailed] = useState(false)

    // Reset the error latch when a new src arrives, otherwise a single broken
    // cover would keep the fallback pinned for every later track.
    const [lastSrc, setLastSrc] = useState(src)
    if (src !== lastSrc) {
        setLastSrc(src)
        setFailed(false)
    }

    if (!src || failed) return fallback

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className={cn("absolute inset-0 h-full w-full object-cover", className)}
        />
    )
}

export default CommonCoverImage

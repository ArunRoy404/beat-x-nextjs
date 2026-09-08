"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { Camera } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { AVATAR_ACCEPTED_TYPES } from "@/zodSchema/UserProfileZodSchema"

/**
 * Round avatar with a click-to-replace overlay. `value` is either the File
 * the user just picked or the existing avatar URL from the API.
 */
const ProfileAvatarPicker = ({ value, name, onChange, error }) => {
    const fileInputRef = useRef(null)

    const objectUrl = useMemo(
        () => (value instanceof File ? URL.createObjectURL(value) : null),
        [value]
    )

    // Object URLs have to be revoked or the blob leaks for the page's life.
    useEffect(() => {
        if (!objectUrl) return
        return () => URL.revokeObjectURL(objectUrl)
    }, [objectUrl])

    const previewUrl = objectUrl || (typeof value === "string" ? value : null)

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
            >
                <CommonAvatar src={previewUrl} alt={name} className="size-20" />

                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="size-5 text-whitetext" />
                </span>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={AVATAR_ACCEPTED_TYPES.join(",")}
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onChange?.(file)
                    }}
                />
            </button>

            <span className="text-[12px] text-light-gray">JPG, PNG or WEBP · max 5MB</span>
            {error && <span className="text-[12px] text-red-error">{error}</span>}
        </div>
    )
}

export default ProfileAvatarPicker

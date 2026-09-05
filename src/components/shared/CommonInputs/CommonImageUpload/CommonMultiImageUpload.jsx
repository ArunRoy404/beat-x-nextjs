import React, { useRef } from "react"
import Image from "next/image"
import { ImagePlus, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const DEFAULT_LABELS = ["Main image", "Image 2", "Image 3", "Image 4"]

const getPreviewUrl = (val) => {
    if (!val) return null
    if (val instanceof File) return URL.createObjectURL(val)
    if (typeof val === "string") return val
    if (typeof val === "object") return val.url || val.src || val.path || val.coverUrl || null
    return null
}

const CommonMultiImageUpload = ({
    value = [],
    onChange,
    labels = DEFAULT_LABELS,
    accept = "image/*",
    error,
    className,
}) => {
    const fileInputRefs = useRef([])

    const handleSelect = (index, e) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange?.(index, file)
        }
    }

    return (
        <div className={cn("flex flex-col gap-1.5 w-full shrink-0", className)}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {labels.map((label, index) => {
                    const slotValue = value?.[index]
                    const previewUrl = getPreviewUrl(slotValue)

                    return (
                        <div
                            key={label}
                            onClick={() => fileInputRefs.current[index]?.click()}
                            className={cn(
                                "group relative flex flex-col items-center justify-center gap-1.5 aspect-square rounded-[12px] border border-dashed border-primary/15 bg-primary/15 hover:bg-primary/20 cursor-pointer transition-all overflow-hidden",
                                error ? "border-red-500/50" : ""
                            )}
                        >
                            <input
                                type="file"
                                ref={(el) => { fileInputRefs.current[index] = el }}
                                onChange={(e) => handleSelect(index, e)}
                                accept={accept}
                                className="hidden"
                            />

                            {previewUrl ? (
                                <>
                                    <Image
                                        src={previewUrl}
                                        alt={label}
                                        fill
                                        unoptimized
                                        sizes="120px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                                            <Upload className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImagePlus className="w-5 h-5 text-primary" />
                                    <span className="text-light-whitetext text-[11px] font-sans text-center px-1">
                                        {label}
                                    </span>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            {error && (
                <span className="text-red-500 text-xs">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonMultiImageUpload

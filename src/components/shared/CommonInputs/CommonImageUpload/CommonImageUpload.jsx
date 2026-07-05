import React, { useRef } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonImageUpload = ({
    value,
    onChange,
    accept = "image/*",
    error,
    className,
}) => {
    const fileInputRef = useRef(null)

    const handleSelect = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange?.(file)
        }
    }

    const previewUrl = value
        ? (value instanceof File ? URL.createObjectURL(value) : value)
        : null


    return (
        <div className="flex flex-col gap-1.5 w-full shrink-0">
            <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "group flex flex-col items-center justify-center p-4 min-h-[140px] rounded-[16px] border border-dashed border-primary/15 bg-primary/15 hover:bg-primary/20 cursor-pointer transition-all gap-2",
                    error ? "border-red-500/50" : "",
                    className
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleSelect}
                    accept={accept}
                    className="hidden"
                />

                {previewUrl ? (
                    <div className="relative flex flex-col items-center gap-2">
                        {/* Image Preview Container */}
                        <div className="relative w-[120px] h-[72px] rounded-[12px] overflow-hidden border border-whitetext/10">
                            <Image
                                src={previewUrl}
                                alt="Cover Art Preview"
                                fill
                                className="object-cover"
                            />
                            {/* Upload Button Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-dark-accent">
                                    <Upload className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                        <span className="text-light-whitetext text-[13px] font-sans">
                            cover art
                        </span>
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                            <Upload className="w-4 h-4" />
                        </div>
                        <p className="text-light-whitetext text-[13px] font-sans">
                            Upload cover art · min 1000×1000px
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <span className="text-red-500 text-xs">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonImageUpload
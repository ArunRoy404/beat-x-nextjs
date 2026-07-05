import React, { useRef } from "react"
import { Image as ImageIcon } from "lucide-react"
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

    return (
        <div className="flex flex-col gap-1.5 w-full shrink-0">
            <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "group flex flex-col items-center justify-center p-4 h-24 rounded-[16px] border border-dashed border-primary/15 bg-primary/15 hover:bg-primary/20 cursor-pointer transition-all gap-2",
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
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                </div>
                {value ? (
                    <div className="text-center min-w-0 w-full px-4">
                        <p className="text-whitetext text-sm font-medium truncate">
                            {value.name}
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
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
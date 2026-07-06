import React, { useRef } from "react"
import { Music } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonAudioInput = ({
    value,
    onChange,
    accept = "audio/*",
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
                    "group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/15 hover:bg-secondary/20 cursor-pointer transition-all gap-2",
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
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <Music className="w-5 h-5" />
                </div>
                {value ? (
                    <div className="text-center min-w-0 w-full px-4 flex flex-col items-center gap-1">
                        <p className="text-whitetext text-sm font-medium truncate">
                            {typeof value === "string" ? "Audio file" : value.name}
                        </p>
                        <p className="text-light-whitetext text-xs">
                            {typeof value === "string" ? "MP3, 230MB" : `${(value.size / 1024 / 1024).toFixed(2)} MB`}
                        </p>
                        <span className="mt-1 px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary text-[11px] font-medium transition-colors">
                            Replace File
                        </span>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-whitetext text-[14px] font-medium font-sans">
                            Drop your audio file here
                        </p>
                        <p className="text-light-whitetext text-[11px] mt-0.5 font-sans">
                            MP3, WAV, FLAC · Max 200MB
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

export default CommonAudioInput
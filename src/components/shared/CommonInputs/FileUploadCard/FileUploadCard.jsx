"use client"

import React, { useId, useRef, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const FileUploadCard = ({ icon, title, subtitle, onFileSelect, accept = "image/png,image/jpeg", className }) => {
    const inputId = useId()
    const inputRef = useRef(null)
    const [fileName, setFileName] = useState("")

    const handleChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setFileName(file.name)
        onFileSelect?.(file)
    }

    return (
        <label
            htmlFor={inputId}
            className={cn(
                "flex w-full cursor-pointer flex-col items-center gap-2 rounded-[16px] border border-dashed p-4.25 text-center backdrop-blur-[5px] transition-colors",
                fileName ? "border-secondary bg-secondary/10" : "border-light-gray bg-white/10 hover:border-light-gray/70",
                className
            )}
        >
            <input ref={inputRef} id={inputId} type="file" accept={accept} onChange={handleChange} className="sr-only" />

            {fileName ? <Check className="size-6 text-secondary" /> : icon}

            <p className="w-full text-[16px] text-whitetext">{fileName || title}</p>
            <p className="w-full text-[12px] text-light-gray">{fileName ? "Tap to change file" : subtitle}</p>
        </label>
    )
}

export default FileUploadCard

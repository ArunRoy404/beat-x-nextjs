"use client"

import React, { useId } from "react"
import { FileText, Check } from "lucide-react"

const FileUploadRow = ({ label, fileName, onFileSelect, accept = "application/pdf,image/png,image/jpeg" }) => {
    const inputId = useId()

    const handleChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        onFileSelect?.(file)
    }

    return (
        <label
            htmlFor={inputId}
            className="flex w-full cursor-pointer items-center gap-3 rounded-[16px] border border-light-gray bg-white/10 p-3.25 transition-colors hover:border-light-gray/70"
        >
            <input id={inputId} type="file" accept={accept} onChange={handleChange} className="sr-only" />

            <FileText className="size-5 shrink-0 text-light-gray" />

            <span className="min-w-0 flex-1 truncate text-[14px] text-light-gray">{fileName || label}</span>

            <span className="flex shrink-0 items-center gap-1 rounded-[12px] bg-secondary/10 px-2 py-1 text-[12px] text-secondary">
                {fileName ? <Check className="size-3.5" /> : "Upload"}
            </span>
        </label>
    )
}

export default FileUploadRow

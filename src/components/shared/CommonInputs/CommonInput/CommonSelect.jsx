import React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const CommonSelect = ({
    value,
    onChange,
    placeholder = "Select option",
    label,
    options = [],
    error,
    containerClassName,
    className
}) => {
    return (
        <div className={cn("flex flex-col gap-1.5 shrink-0", containerClassName)}>
            {label && (
                <label className="text-primary text-[16px] not-italic font-normal font-sans">
                    {label}
                </label>
            )}

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    size="custom"
                    className={cn(
                        "w-full h-[52px] rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext flex items-center justify-between cursor-pointer outline-none",
                        className
                    )}
                >
                    <SelectValue placeholder={placeholder} className="placeholder:text-light-gray" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-whitetext/10 rounded-[12px] text-whitetext max-h-[200px] overflow-y-auto">
                    {options.map((opt) => {
                        const optVal = typeof opt === "string" ? opt : opt.value
                        const optLabel = typeof opt === "string" ? opt : opt.label
                        return (
                            <SelectItem key={optVal} value={optVal}>
                                {optLabel}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonSelect
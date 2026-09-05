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
    labelClassName,
    className
}) => {
    // Select.Value calls this with the raw value, not the matching item's
    // rendered label — resolve it ourselves so the trigger never shows a
    // raw id/value. It's called even before anything is selected.
    const getDisplayValue = (val) => {
        if (val === undefined || val === null || val === "") return placeholder
        const match = options.find((opt) => (typeof opt === "string" ? opt : opt.value) === val)
        if (!match) return val
        return typeof match === "string" ? match : match.label
    }

    return (
        <div className={cn("flex flex-col gap-1.5 shrink-0", containerClassName)}>
            {label && (
                <label className={cn("text-primary text-[16px] not-italic font-normal font-sans", labelClassName)}>
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
                    <SelectValue placeholder={placeholder} className="data-placeholder:text-light-gray">
                        {(val) => getDisplayValue(val)}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    sideOffset={8}
                    className="w-(--anchor-width) min-w-32 max-h-60 overflow-y-auto rounded-[16px] border border-whitetext/10 bg-dark-accent p-1.5 text-whitetext shadow-xl"
                >
                    {options.map((opt) => {
                        const optVal = typeof opt === "string" ? opt : opt.value
                        const optLabel = typeof opt === "string" ? opt : opt.label
                        return (
                            <SelectItem
                                key={optVal}
                                value={optVal}
                                className="min-h-9 rounded-[10px] px-3 py-2 text-[14px] text-light-gray data-highlighted:bg-white/10 data-highlighted:text-whitetext data-selected:text-secondary"
                            >
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
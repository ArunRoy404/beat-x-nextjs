import React from "react"
import { cn } from "@/lib/utils"

const CommonSelectCards = ({
    value,
    onChange,
    options = [],
    label,
    error,
    containerClassName,
    gridClass = "grid-cols-1 sm:grid-cols-3",
}) => {
    return (
        <div className={cn("flex flex-col gap-2 shrink-0", containerClassName)}>
            {label && (
                <label className="text-primary text-[16px] not-italic font-normal font-sans">
                    {label}
                </label>
            )}

            <div className={cn("grid gap-3", gridClass)}>
                {options.map((opt) => {
                    const isSelected = value === opt.value
                    const Icon = opt.icon

                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onChange?.(opt.value)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 py-4 px-3 rounded-[16px] border text-[12px] font-medium not-italic cursor-pointer transition-all text-center",
                                isSelected
                                    ? "bg-secondary/15 border-secondary/15 text-secondary"
                                    : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                            )}
                        >
                            {Icon && (
                                <Icon
                                    className={cn(
                                        "w-5 h-5 mb-0.5",
                                        isSelected ? "text-secondary" : "text-light-gray"
                                    )}
                                />
                            )}
                            <span>{opt.label}</span>
                        </button>
                    )
                })}
            </div>

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonSelectCards
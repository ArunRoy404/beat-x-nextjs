import React from "react"
import { cn } from "@/lib/utils"

const PERIODS = ["7D", "30D", "3M", "6M", "1Y"]

const PeriodSelector = ({ value, onChange, className }) => {
    return (
        <div className={cn("flex items-center gap-2 flex-wrap", className)}>
            <span className="text-light-gray text-[14px] font-normal shrink-0">Period:</span>
            <div className="flex items-center gap-1.5">
                {PERIODS.map((period) => (
                    <button
                        key={period}
                        type="button"
                        onClick={() => onChange?.(period)}
                        className={cn(
                            "px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer border",
                            value === period
                                ? "bg-secondary/15 text-secondary border-secondary/20"
                                : "text-light-gray border-transparent hover:bg-white/5"
                        )}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PeriodSelector

import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const CommonCalender = ({
    value,
    onChange,
    placeholder = "Choose Date",
    label,
    error,
    containerClassName,
    className
}) => {
    const [showCalendar, setShowCalendar] = useState(false)

    const handleSelect = (date) => {
        onChange?.(date)
        setShowCalendar(false)
    }

    return (
        <div className={cn("flex flex-col gap-1.5 relative shrink-0", containerClassName)}>
            {label && (
                <label className="text-primary text-[16px] not-italic font-normal font-sans">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className={cn(
                    "w-full h-[52px] flex items-center justify-between rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-left text-whitetext outline-none cursor-pointer",
                    className
                )}
            >
                <span className={value ? "text-whitetext" : "text-light-gray"}>
                    {value ? format(value, "PPP") : placeholder}
                </span>
                <CalendarIcon className="w-5 h-5 text-light-gray" />
            </button>

            {showCalendar && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowCalendar(false)}
                    />
                    <div className="absolute bottom-full right-0 mb-2 sm:top-full sm:bottom-auto sm:mt-2 z-50 rounded-[16px] border border-whitetext/10 bg-background p-3 shadow-xl">
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={handleSelect}
                            className="rounded-[12px] bg-background text-whitetext"
                        />
                    </div>
                </>
            )}

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonCalender
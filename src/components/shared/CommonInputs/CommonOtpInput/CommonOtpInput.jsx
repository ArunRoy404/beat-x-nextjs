"use client"

import React from "react"
import { OTPField } from "@base-ui/react/otp-field"
import { cn } from "@/lib/utils"

const CommonOtpInput = ({ length = 6, value, onChange, error, className, ...props }) => {
    return (
        <div className={cn("flex flex-col gap-1.5 w-full items-center", className)}>
            <OTPField.Root
                length={length}
                value={value}
                onValueChange={onChange}
                className="flex items-center justify-center gap-2 sm:gap-3 w-full"
                {...props}
            >
                {Array.from({ length }).map((_, index) => (
                    <OTPField.Input
                        key={index}
                        className={cn(
                            "w-11 h-12 sm:w-12 sm:h-14 rounded-[12px] border border-light-gray/20 bg-light-gray/10 text-whitetext text-[18px] font-semibold text-center outline-none transition-all",
                            "data-focused:border-secondary/60 data-focused:ring-2 data-focused:ring-secondary/20",
                            "data-filled:border-secondary/40",
                            error ? "border-red-500/50" : ""
                        )}
                    />
                ))}
            </OTPField.Root>

            {error && (
                <span className="text-red-500 text-xs">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonOtpInput

import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const CommonInput = React.forwardRef(({
    label,
    type = "text",
    placeholder,
    error,
    className,
    containerClassName,
    ...props
}, ref) => {
    const inputClasses = "w-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic focus-visible:border-primary/50 focus-visible:ring-primary/20 outline-none"

    return (
        <div className={cn("flex flex-col gap-1.5 shrink-0", containerClassName)}>
            {label && (
                <label className="text-primary text-[16px] not-italic font-normal font-sans">
                    {label}
                </label>
            )}

            {type === "textarea" ? (
                <Textarea
                    ref={ref}
                    placeholder={placeholder}
                    className={cn(
                        "min-h-[100px] rounded-[20px] p-5 resize-none",
                        inputClasses,
                        className
                    )}
                    {...props}
                />
            ) : (
                <Input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={cn(
                        "h-[52px] rounded-full",
                        inputClasses,
                        className
                    )}
                    {...props}
                />
            )}

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error}
                </span>
            )}
        </div>
    )
})

CommonInput.displayName = "CommonInput"

export default CommonInput
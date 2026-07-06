import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

const CommonInput = React.forwardRef(({
    label,
    type = "text",
    placeholder,
    error,
    className,
    containerClassName,
    leftIcon,
    rightIcon,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === "password"
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type

    const inputClasses = "w-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic focus-visible:border-primary/50 focus-visible:ring-primary/20 outline-none"

    const passwordToggler = isPasswordType && (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-light-whitetext/40 hover:text-whitetext transition-colors cursor-pointer flex items-center justify-center"
        >
            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
        </button>
    )

    const resolvedRightIcon = rightIcon || passwordToggler

    return (
        <div className={cn("flex flex-col gap-1.5 shrink-0", containerClassName)}>
            {label && (
                <label className="text-primary text-[16px] not-italic font-normal font-sans">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-light-whitetext/40">
                        {leftIcon}
                    </div>
                )}
                {type === "textarea" ? (
                    <Textarea
                        ref={ref}
                        placeholder={placeholder}
                        className={cn(
                            "min-h-[100px] rounded-[20px] p-5 resize-none",
                            inputClasses,
                            leftIcon ? "pl-[48px]!" : "",
                            resolvedRightIcon ? "pr-[48px]!" : "",
                            className
                        )}
                        {...props}
                    />
                ) : (
                    <Input
                        ref={ref}
                        type={inputType}
                        placeholder={placeholder}
                        className={cn(
                            "h-[52px] rounded-full",
                            inputClasses,
                            leftIcon ? "pl-[48px]!" : "",
                            resolvedRightIcon ? "pr-[48px]!" : "",
                            className
                        )}
                        {...props}
                    />
                )}
                {resolvedRightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
                        {resolvedRightIcon}
                    </div>
                )}
            </div>

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
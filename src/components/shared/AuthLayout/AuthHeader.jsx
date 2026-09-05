import React from "react"
import { cn } from "@/lib/utils"

const AuthHeader = ({ title, description, titleClassName, descriptionClassName }) => {
    return (
        <div className="flex flex-col gap-2 items-center text-center">
            <h1 className={cn("text-light-gray text-[24px] font-semibold not-italic", titleClassName)}>
                {title}
            </h1>
            {description && (
                <p className={cn("text-light-gray text-[13px] font-normal max-w-85", descriptionClassName)}>
                    {description}
                </p>
            )}
        </div>
    )
}

export default AuthHeader

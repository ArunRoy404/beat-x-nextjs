import React from "react"

const AuthHeader = ({ title, description }) => {
    return (
        <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-light-gray text-[24px] font-semibold not-italic">
                {title}
            </h1>
            {description && (
                <p className="text-light-gray text-[13px] font-normal max-w-[340px]">
                    {description}
                </p>
            )}
        </div>
    )
}

export default AuthHeader

import React from "react"
import { Button } from "@/components/ui/button"

const SettingActionRow = ({ title, description, buttonLabel = "Update" }) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-whitetext text-[18px] not-italic font-semibold">
                    {title}
                </span>
                <span className="text-light-gray text-[14px] not-italic font-normal">
                    {description}
                </span>
            </div>

            <Button
                notImplemented
                variant="outline"
                className="rounded-full px-4 py-2 border border-secondary/20 bg-secondary/10 text-secondary text-[13px] font-semibold hover:bg-secondary/20 shrink-0"
            >
                {buttonLabel}
            </Button>
        </div>
    )
}

export default SettingActionRow

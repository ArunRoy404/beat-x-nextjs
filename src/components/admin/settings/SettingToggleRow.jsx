import React from "react"
import { Switch } from "@/components/ui/switch"

const SettingToggleRow = ({ title, description, checked, onCheckedChange }) => {
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

            <Switch
                size="lg"
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="shrink-0"
            />
        </div>
    )
}

export default SettingToggleRow

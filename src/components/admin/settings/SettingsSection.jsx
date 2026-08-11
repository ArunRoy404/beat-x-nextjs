import React from "react"
import * as LucideIcons from "lucide-react"
import { HelpCircle } from "lucide-react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const SettingsSection = ({ icon, iconColor, iconBg, title, children }) => {
    const Icon = LucideIcons[icon] || HelpCircle

    return (
        <CommonCard className="flex flex-col gap-5">
            {/* Section header: icon + title */}
            <div className="flex items-center gap-3 z-10 relative">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: iconBg || "rgba(255, 255, 255, 0.1)", color: iconColor || "#FFFFFF" }}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="flex-1 self-stretch text-whitetext text-[24px] not-italic font-semibold">
                    {title}
                </h3>
            </div>

            {/* Settings rows */}
            <div className="flex flex-col gap-5 z-10 relative">
                {children}
            </div>
        </CommonCard>
    )
}

export default SettingsSection

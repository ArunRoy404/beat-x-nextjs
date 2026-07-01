import React from "react"
import * as LucideIcons from "lucide-react"

const AdminGreeting = ({ greetingData }) => {
    const metricStyles = {
        success: {
            text: "text-green-success",
            border: "border-green-success/30",
            bg: "bg-green-success/10"
        },
        warning: {
            text: "text-yellow-warning",
            border: "border-yellow-warning/30",
            bg: "bg-yellow-warning/10"
        },
        primary: {
            text: "text-primary",
            border: "border-primary/30",
            bg: "bg-primary/10"
        }
    }

    if (!greetingData) return null;

    return (
        <div className="relative overflow-hidden rounded-[8px] border border-border p-4 bg-[#0E0E0E] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Background image layer with 10% opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
            />

            {/* Content - Left Section */}
            <div className="relative z-10 flex flex-col gap-1">
                {greetingData?.statusLabel && (
                    <div className="flex items-center gap-1.5 text-yellow-warning text-[16px] not-italic font-medium">
                        <LucideIcons.Zap className="w-4 h-4 fill-current" />
                        <span>{greetingData.statusLabel}</span>
                    </div>
                )}
                {greetingData?.greeting && (
                    <h2 className="text-whitetext text-[24px] not-italic font-medium mt-1">
                        {greetingData.greeting}
                    </h2>
                )}
                <div className="flex flex-wrap items-center gap-1.5 text-[14px] not-italic font-normal mt-2">
                    {greetingData?.activeUsersText && (
                        <>
                            <span className="text-secondary">{greetingData.activeUsersText}</span>
                            <span className="text-light-gray">{greetingData?.activeUsersLabel || "active"}</span>
                        </>
                    )}
                    {greetingData?.activeUsersText && greetingData?.pendingReportsText && (
                        <span className="text-dark-gray">•</span>
                    )}
                    {greetingData?.pendingReportsText && (
                        <>
                            <span className="text-yellow-warning">{greetingData.pendingReportsText}</span>
                            <span className="text-light-gray">{greetingData?.pendingReportsLabel || "pending"}</span>
                        </>
                    )}
                    {greetingData?.pendingReportsText && greetingData?.operationalText && (
                        <span className="text-dark-gray">•</span>
                    )}
                    {greetingData?.operationalText && (
                        <span className="text-green-success">{greetingData.operationalText}</span>
                    )}
                </div>
            </div>

            {/* Content - Right Section (Status Metrics Pills) */}
            {Array.isArray(greetingData?.metrics) && greetingData.metrics.length > 0 && (
                <div className="relative z-10 flex items-center gap-3 flex-wrap">
                    {greetingData.metrics.map((metric, index) => {
                        const style = metricStyles[metric?.type] || metricStyles.primary
                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center p-3 rounded-[8px] border min-w-[100px] text-center ${style.border} ${style.bg}`}
                            >
                                <span className={`text-[16px] font-semibold ${style.text}`}>
                                    {metric?.value}
                                </span>
                                <span className={`text-[10px] uppercase font-medium mt-0.5 ${style.text}`}>
                                    {metric?.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default AdminGreeting
import React from "react"
import CommonAvatar from "@/components/shared/CommonAvatar"

const RecentUploadCard = ({ item, index }) => {
    if (!item) return null;

    const statusStyles = {
        Published: "text-green-success bg-green-success/10",
        Draft: "text-light-gray bg-white/10",
        Scheduled: "text-yellow-warning bg-yellow-warning/10"
    }

    const statusClass = statusStyles[item?.status] || statusStyles.Draft

    return (
        <div className="flex items-center justify-between px-4 py-3 rounded-[16px] bg-[#20201F99] gap-4">
            {/* Left Column: Number, Thumbnail, Details */}
            <div className="flex items-center gap-4 min-w-0">
                <span className="text-dark-gray text-[14px] not-italic font-normal w-5 shrink-0">
                    {item?.id || (index !== undefined ? `0${index + 1}` : "")}
                </span>

                {/* Cover Thumbnail using CommonAvatar */}
                <CommonAvatar
                    src={item?.cover || ""}
                    alt={item?.title || "Track Cover"}
                    className="w-10 h-10 rounded-[8px] [&_*]:rounded-[8px] after:rounded-[8px] border border-white/5 shrink-0"
                />

                {/* Title & Plays/Artist */}
                <div className="flex flex-col min-w-0">
                    <span className="text-whitetext text-[14px] not-italic font-normal truncate">
                        {item?.title || "Untitled Track"}
                    </span>
                    <span className="text-dark-gray text-[14px] not-italic font-normal truncate">
                        {item?.plays || "0 plays"}
                    </span>
                </div>
            </div>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass} shrink-0`}>
                {item?.status || "Draft"}
            </span>
        </div>
    )
}

export default RecentUploadCard
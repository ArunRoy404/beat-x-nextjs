import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const RecentActivity = ({ data }) => {
  // Styled Live badge
  const liveBadge = (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-success/15 border border-green-success/30 text-green-success text-[12px] font-semibold select-none z-10 relative">
      <span className="w-2 h-2 rounded-full bg-green-success animate-pulse" />
      Live
    </div>
  )

  return (
    <CommonCard
      title="Recent Activity"
      subtitle="Real-time system updates"
      tag={liveBadge}
      className="flex flex-col gap-4 h-[380px] w-full"
    >
      {/* Scrollable logs list */}
      <div className="flex-1 flex flex-col z-10 relative overflow-y-auto pr-1 custom-scrollbar">
        {(data || []).map((item, index) => (
          <div
            key={item?.id || index}
            className="flex gap-3 py-3 first:pt-0 last:pb-0 border-b border-white/[0.05] last:border-0"
          >
            {/* Colored Indicator Dot */}
            <span
              className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: item?.color || "#3ADFFA" }}
            />
            
            {/* Log Details */}
            <div className="flex flex-col min-w-0">
              <span className="text-whitetext text-[14px] not-italic font-normal leading-relaxed">
                {item?.text || "System activity logged"}
              </span>
              <span className="text-dark-gray text-[12px] not-italic font-normal mt-0.5">
                {item?.time || "Just now"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CommonCard>
  )
}

export default RecentActivity

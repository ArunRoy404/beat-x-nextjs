import React from "react"
import * as LucideIcons from "lucide-react"
import * as CustomIcons from "@/components/icons"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const DashboardStatCard = ({ card }) => {
  if (!card) return null;

  const IconComponent = typeof card?.icon === "function"
    ? card.icon
    : card?.icon
    ? (CustomIcons[card.icon] || LucideIcons[card.icon] || LucideIcons.HelpCircle)
    : null;

  if (card?.layout === "vertical") {
    return (
      <CommonCard className="flex flex-col gap-4 justify-between min-h-[140px]">
        {/* Upper row: Icon & Badge */}
        <div className="relative z-10 flex items-center justify-between">
          {IconComponent && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: card?.iconBg || "rgba(255, 255, 255, 0.1)" }}
            >
              <IconComponent className="w-5 h-5" style={{ color: card?.iconColor || "#fff" }} />
            </div>
          )}
          {card?.badge && (
            <span className="text-[10px] font-medium text-green-success bg-green-success/15 border border-green-success/20 px-1.5 py-0.5 rounded-[4px] shrink-0">
              {card.badge}
            </span>
          )}
        </div>

        {/* Lower block: Value & Title */}
        <div className="relative z-10 flex flex-col mt-auto">
          <span className="text-whitetext text-[28px] not-italic font-semibold leading-tight">
            {card?.value}
          </span>
          <span className="text-light-gray text-[14px] not-italic font-normal mt-0.5">
            {card?.title}
          </span>
        </div>
      </CommonCard>
    )
  }

  return (
    <CommonCard className="flex flex-col justify-between">
      {/* Upper row: Number & Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-whitetext text-[24px] not-italic font-medium">
          {card?.value}
        </span>
        <div className="flex items-center gap-2">
          {card?.badge && (
            <span className="text-[10px] font-medium text-green-success bg-green-success/15 border border-green-success/20 px-1.5 py-0.5 rounded-[4px] shrink-0">
              {card.badge}
            </span>
          )}
          {IconComponent && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: card?.iconBg || "rgba(255, 255, 255, 0.1)" }}
            >
              <IconComponent className="w-5 h-5" style={{ color: card?.iconColor || "#fff" }} />
            </div>
          )}
        </div>
      </div>

      {/* Title label */}
      <div className="relative z-10 mt-1">
        <span className="text-light-gray text-[14px] not-italic font-normal">
          {card?.title}
        </span>
      </div>

      {/* Bottom row: Comparison & Change Percentage */}
      {card?.change && (
        <div className="relative z-10 flex items-center justify-between mt-4">
          <span className="text-dark-gray text-[14px] not-italic font-normal">
            VS Last Month
          </span>
          <div
            className={`text-[14px] not-italic font-normal rounded px-2 py-1 flex items-center gap-0.5 ${card?.isPositive
              ? "text-green-success bg-green-success/10"
              : "text-red-error bg-red-error/10"
              }`}
          >
            {card?.isPositive ? (
              <LucideIcons.TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <LucideIcons.TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{card.change}</span>
          </div>
        </div>
      )}
    </CommonCard>
  )
}

export default DashboardStatCard
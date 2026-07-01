import React from "react"
import * as LucideIcons from "lucide-react"

const DashboardStatCard = ({ card }) => {
  if (!card) return null;

  const IconComponent = card?.icon ? (LucideIcons[card.icon] || LucideIcons.HelpCircle) : null

  return (
    <div className="relative overflow-hidden rounded-[8px] border border-border p-4 bg-[#0E0E0E] flex flex-col justify-between">
      {/* Background image layer with 10% opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
      />

      {/* Upper row: Number & Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-whitetext text-[24px] not-italic font-medium">
          {card?.value}
        </span>
        {IconComponent && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: card?.iconBg || "rgba(255, 255, 255, 0.1)" }}
          >
            <IconComponent className="w-5 h-5" style={{ color: card?.iconColor || "#fff" }} />
          </div>
        )}
      </div>

      {/* Title label */}
      <div className="relative z-10 mt-1">
        <span className="text-light-gray text-[14px] not-italic font-normal">
          {card?.title}
        </span>
      </div>

      {/* Bottom row: Comparison & Change Percentage */}
      <div className="relative z-10 flex items-center justify-between mt-4">
        <span className="text-dark-gray text-[14px] not-italic font-normal">
          VS Last Month
        </span>
        {card?.change && (
          <div
            className={`text-[14px] not-italic font-normal rounded px-2 py-1 flex items-center gap-0.5 ${
              card?.isPositive
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
        )}
      </div>
    </div>
  )
}

export default DashboardStatCard
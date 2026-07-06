"use client"

import React from "react"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"

const GenreContentTypesOverview = () => {
  const contentTypes = useAdminDashboardGenreStore((state) => state.genreContentTypes)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {contentTypes.map((type) => {
        const percent = type.totalCount > 0 ? (type.activeCount / type.totalCount) * 100 : 0

        return (
          <div
            key={type.id}
            className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]"
          >
            {/* Background image layer */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
              style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Header inside Card */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[16px] font-semibold tracking-wider"
                  style={{ color: type.color }}
                >
                  {type.title}
                </span>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-[4px] font-semibold"
                  style={{
                    color: type.color,
                    backgroundColor: `${type.color}1F`, // 12% opacity
                    border: `1px solid ${type.color}2B` // 17% opacity
                  }}
                >
                  {type.countText}
                </span>
              </div>

              {/* Progress and Tags */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px] font-medium">
                  <span className="text-light-gray">Active</span>
                  <span className="text-whitetext">{type.activeCount}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: type.color
                    }}
                  />
                </div>
                <p className="text-white/40 text-[12px] font-normal mt-2">
                  {type.subtitle}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GenreContentTypesOverview

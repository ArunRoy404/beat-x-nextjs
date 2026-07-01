import React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const GenreDistribution = ({ data }) => {
  return (
    <CommonCard 
      title="Genre Distribution"
      subtitle="Stream share by genre"
      className="flex flex-col gap-4 h-[380px] w-full"
    >
      {/* Content - Donut at top, Legend below */}
      <div className="flex-1 flex flex-col items-center justify-between z-10 relative overflow-hidden min-h-0">
        {/* Donut Chart Container */}
        <div className="w-[150px] h-[150px] shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%" debounce={1000}>
            <PieChart>
              <Pie
                data={data || []}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {(data || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0E0E0E] border border-border p-2 rounded-[8px] text-xs">
                        <p className="font-semibold text-whitetext" style={{ color: payload[0].payload.color }}>
                          {payload[0].name}: {payload[0].value}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List Below */}
        <div className="w-full flex flex-col gap-1.5 overflow-y-auto max-h-[140px] pr-1 mt-2">
          {(data || []).map((genre, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/[0.02] last:border-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: genre.color }} />
                <span className="text-light-gray uppercase font-medium">{genre.name}</span>
              </div>
              <span className="font-semibold text-[14px]" style={{ color: genre.color }}>
                {genre.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </CommonCard>
  )
}

export default GenreDistribution

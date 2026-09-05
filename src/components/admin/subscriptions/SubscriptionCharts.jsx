"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CommonCard from "@/components/shared/CommonCard/CommonCard";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";

const SubscriptionCharts = () => {
  const mrrGrowthData = useAdminSubscriptionsStore((state) => state.mrrGrowth);
  const planDistributionData = useAdminSubscriptionsStore((state) => state.planDistribution);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {/* MRR Growth Bar Chart */}
      <CommonCard
        title="MRR Growth"
        className="flex flex-col gap-4 h-[380px] w-full"
      >
        <div className="flex-1 w-full z-10 relative min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={1000}>
            <BarChart
              data={mrrGrowthData || []}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                ticks={[0, 90, 180, 270, 360]}
                dx={-5}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                        <p className="text-light-gray font-medium">
                          {payload[0].payload.name}
                        </p>
                        <p className="font-semibold text-[#E5F9CF]">
                          MRR: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                name="MRR"
                fill="#E5F9CF"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CommonCard>

      {/* Plan Distribution Donut Chart */}
      <CommonCard
        title="Plan Distribution"
        className="flex flex-col gap-4 h-[380px] w-full"
      >
        <div className="flex flex-1 items-center justify-between gap-4 z-10 relative overflow-hidden min-h-0 px-2">
          {/* Left Side: Donut Chart */}
          <div className="w-[180px] md:w-[220px] h-[180px] md:h-[220px] shrink-0 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" debounce={1000}>
              <PieChart>
                <Pie
                  data={planDistributionData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {(planDistributionData || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0E0E0E] border border-border p-2 rounded-[8px] text-xs">
                          <p
                            className="font-semibold text-whitetext"
                            style={{ color: payload[0].payload.color }}
                          >
                            {payload[0].name}: {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Right Side: Legend with percentages */}
          <div className="flex-1 flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-2">
            {(planDistributionData || []).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs md:text-sm py-1.5 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-light-gray font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CommonCard>
    </div>
  );
};

export default SubscriptionCharts;

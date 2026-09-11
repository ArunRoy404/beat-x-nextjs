"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const ProductDetailAnalytics = ({ product, analytics }) => {
  const statsCards = [
    {
      id: "units_sold",
      title: "Units Sold",
      value: String(analytics?.unitsSold ?? product?.soldCount ?? product?.sold ?? 0),
      trend: { direction: "up", percentage: "0%" },
      subText: "total sold",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: `৳${(analytics?.revenue ?? 0).toLocaleString()}`,
      trend: { direction: "up", percentage: "0%" },
      subText: "gross revenue",
    },
    {
      id: "avg_daily",
      title: "Avg. Daily Sales",
      value: String(analytics?.avgDaily ?? 0),
      trend: { direction: "up", percentage: "0%" },
      subText: "units/day",
    },
    {
      id: "in_stock",
      title: "In Stock",
      value: String(analytics?.inStock ?? product?.stock ?? 0),
      trend: { direction: "down", percentage: "0%" },
      subText: "remaining inventory",
    },
  ]

  const salesTrend = analytics?.salesTrend?.length
    ? analytics.salesTrend.map((item) => ({
        name: item?.week ? `W${item.week}` : (item?.name || "-"),
        sales: item?.units ?? item?.sales ?? 0,
      }))
    : [
        { name: "W1", sales: 0 },
        { name: "W2", sales: 0 },
        { name: "W3", sales: 0 },
        { name: "W4", sales: 0 },
      ]

  const byPlatform = Array.isArray(analytics?.byPlatform)
    ? analytics.byPlatform.map((item, idx) => {
        const name = typeof item === "string" ? item : (item?.name || item?._id || "Platform")
        const value = typeof item === "object" ? (item?.value ?? item?.count ?? 0) : 0
        const colors = ["#3ADFFA", "#CC97FF", "#FFAE00", "#34C759"]
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
          color: colors[idx % colors.length],
        }
      })
    : []

  const byCountry = Array.isArray(analytics?.byCountry)
    ? analytics.byCountry.map((item) => {
        const name = typeof item === "string" ? item : (item?.name || item?._id || "Other")
        const value = typeof item === "object" ? (item?.value ?? item?.count ?? 0) : 0
        return {
          name,
          flag: "🌐",
          value,
        }
      })
    : []

  return (
    <div className="p-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin space-y-5">
      {/* Stats Cards */}
      <DashboardStats statsCards={statsCards} className="grid-cols-2! sm:grid-cols-2! lg:grid-cols-2!" />

      {/* Sales Trend Chart Card */}
      <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
        />

        <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10">
          Sales Trend
        </h3>

        <div style={{ height: "200px", minHeight: "200px" }} className="w-full z-10 relative">
          <ResponsiveContainer width="100%" height="100%" minHeight={200} debounce={1000}>
            <AreaChart data={salesTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProductSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3ADFFA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3ADFFA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0E0E0E] border border-white/10 p-2 rounded-[8px] shadow-lg flex flex-col gap-1 text-[11px] text-whitetext">
                        <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                        <p className="text-[#3ADFFA] font-semibold">
                          Sales: {payload[0].value} units
                        </p>
                      </div>
                    )
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3ADFFA"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProductSales)"
                dot={{ r: 4, stroke: "#3ADFFA", strokeWidth: 1.5, fill: "#FFF" }}
                activeDot={{ r: 6, stroke: "#3ADFFA", strokeWidth: 2, fill: "#0E0E0E" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Platform and Countries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* By Platform */}
        <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
          />
          <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
            By Platform
          </h3>
          <div className="flex flex-col gap-4 relative z-10 w-full">
            {byPlatform.length > 0 ? (
              byPlatform.map((plat) => (
                <div key={plat.name} className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between text-[13px] font-sans font-medium">
                    <span className="text-light-gray">{plat.name}</span>
                    <span className="text-whitetext">{plat.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${plat.value}%`,
                        backgroundColor: plat.color || "#3ADFFA",
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <span className="text-light-gray/40 text-xs py-4 text-center">No platform breakdown data available.</span>
            )}
          </div>
        </div>

        {/* Top Countries */}
        <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
          />
          <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
            Top Countries
          </h3>
          <div className="flex flex-col gap-4 relative z-10 w-full">
            {byCountry.length > 0 ? (
              byCountry.map((country) => (
                <div key={country.name} className="flex items-center justify-between text-[13px] font-sans font-medium w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] leading-none shrink-0 select-none">{country.flag || "🌐"}</span>
                    <span className="text-light-gray">{country.name}</span>
                  </div>
                  <span className="text-whitetext">{country.value}%</span>
                </div>
              ))
            ) : (
              <span className="text-light-gray/40 text-xs py-4 text-center">No country breakdown data available.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailAnalytics


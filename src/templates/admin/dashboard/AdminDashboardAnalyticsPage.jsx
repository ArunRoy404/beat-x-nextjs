"use client"

import React from "react"
import { useDashboardStore } from "@/zustandStore/dashboardStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import TimeFilters from "@/components/admin/dashboard/Analytics/TimeFilters"
import GrowthOverview from "@/components/admin/dashboard/Analytics/GrowthOverview"
import PeakListeningHours from "@/components/admin/dashboard/Analytics/PeakListeningHours"
import GenreDistribution from "@/components/admin/dashboard/Analytics/GenreDistribution"

const AdminDashboardAnalyticsPage = () => {
    const statsCards = useDashboardStore((state) => state.analyticsStatsCards)
    const growthOverviewData = useDashboardStore((state) => state.growthOverviewData)
    const peakListeningHoursData = useDashboardStore((state) => state.peakListeningHoursData)
    const genreDistributionData = useDashboardStore((state) => state.genreDistributionData)

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            {/* Period selection filters at the top */}
            <div className="flex justify-start">
                <TimeFilters activeFilter="7D" />
            </div>

            {/* Analytics Stats Row */}
            <DashboardStats statsCards={statsCards} />
            
            {/* Full-width Growth Area Chart */}
            <GrowthOverview data={growthOverviewData} />

            {/* Two-column sub-charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PeakListeningHours data={peakListeningHoursData} />
                <GenreDistribution data={genreDistributionData} />
            </div>
        </div>
    )
}

export default AdminDashboardAnalyticsPage
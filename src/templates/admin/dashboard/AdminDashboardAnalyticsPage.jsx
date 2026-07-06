"use client"

import React from "react"
import { useAdminDashboardAnalyticsStore } from "@/zustandStore/admin/adminStore/adminDashboardAnalyticsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import TimeFilters from "@/components/admin/analytics/TimeFilters"
import GrowthOverview from "@/components/admin/analytics/GrowthOverview"
import PeakListeningHours from "@/components/admin/analytics/PeakListeningHours"
import GenreDistribution from "@/components/admin/analytics/GenreDistribution"

const AdminDashboardAnalyticsPage = () => {
    const statsCards = useAdminDashboardAnalyticsStore((state) => state.analyticsStatsCards)
    const growthOverviewData = useAdminDashboardAnalyticsStore((state) => state.growthOverviewData)
    const peakListeningHoursData = useAdminDashboardAnalyticsStore((state) => state.peakListeningHoursData)
    const genreDistributionData = useAdminDashboardAnalyticsStore((state) => state.genreDistributionData)

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
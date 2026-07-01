"use client"

import React from "react"
import { useDashboardStore } from "@/zustandStore/dashboardStore"
import AdminGreeting from "@/components/admin/dashboard/AdminGreeting/AdminGreeting"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import PlatformGrowth from "@/components/admin/dashboard/PlatformGrowth/PlatformGrowth"
import GenreMix from "@/components/admin/dashboard/GenreMix/GenreMix"
import RevenueStreams from "@/components/admin/dashboard/RevenueStreams/RevenueStreams"
import RecentUploads from "@/components/admin/dashboard/RecentUploads/RecentUploads"
import RecentActivity from "@/components/admin/dashboard/RecentActivity/RecentActivity"
import UpcomingEvents from "@/components/admin/dashboard/UpcomingEvents/UpcomingEvents"

const AdminDashboardOverviewPage = () => {
    const greetingData = useDashboardStore((state) => state.greetingData)
    const statsCards = useDashboardStore((state) => state.statsCards)
    const platformGrowthData = useDashboardStore((state) => state.platformGrowthData)
    const genreMixData = useDashboardStore((state) => state.genreMixData)
    const revenueStreamsData = useDashboardStore((state) => state.revenueStreamsData)
    const recentUploadsData = useDashboardStore((state) => state.recentUploadsData)
    const recentActivity = useDashboardStore((state) => state.recentActivityData)
    const upcomingEvents = useDashboardStore((state) => state.upcomingEventsData)

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            <AdminGreeting greetingData={greetingData} />
            <DashboardStats statsCards={statsCards} />
            
            {/* Charts and Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PlatformGrowth data={platformGrowthData} />
                <GenreMix data={genreMixData} />
                <RevenueStreams data={revenueStreamsData} />
                <RecentUploads uploads={recentUploadsData} />
                <RecentActivity data={recentActivity} />
                <UpcomingEvents data={upcomingEvents} />
            </div>
        </div>
    )
}

export default AdminDashboardOverviewPage
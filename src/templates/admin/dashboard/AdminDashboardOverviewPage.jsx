"use client"

import React from "react"
import { useAdminDashboardOverviewStore } from "@/zustandStore/admin/adminStore/adminDashboardOverviewStore"
import AdminGreeting from "@/components/admin/dashboard/AdminGreeting/AdminGreeting"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import PlatformGrowth from "@/components/admin/dashboard/PlatformGrowth/PlatformGrowth"
import GenreMix from "@/components/admin/dashboard/GenreMix/GenreMix"
import RevenueStreams from "@/components/admin/dashboard/RevenueStreams/RevenueStreams"
import RecentUploads from "@/components/admin/dashboard/RecentUploads/RecentUploads"
import RecentActivity from "@/components/admin/dashboard/RecentActivity/RecentActivity"
import UpcomingEvents from "@/components/admin/dashboard/UpcomingEvents/UpcomingEvents"

const AdminDashboardOverviewPage = () => {
    const greetingData = useAdminDashboardOverviewStore((state) => state.greetingData)
    const statsCards = useAdminDashboardOverviewStore((state) => state.statsCards)
    const platformGrowthData = useAdminDashboardOverviewStore((state) => state.platformGrowthData)
    const genreMixData = useAdminDashboardOverviewStore((state) => state.genreMixData)
    const revenueStreamsData = useAdminDashboardOverviewStore((state) => state.revenueStreamsData)
    const recentUploadsData = useAdminDashboardOverviewStore((state) => state.recentUploadsData)
    const recentActivity = useAdminDashboardOverviewStore((state) => state.recentActivityData)
    const upcomingEvents = useAdminDashboardOverviewStore((state) => state.upcomingEventsData)

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
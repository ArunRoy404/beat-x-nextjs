"use client"

import React from "react"
import { useDashboardStore } from "@/zustandStore/dashboardStore"
import AdminGreeting from "@/components/admin/dashboard/AdminGreeting/AdminGreeting"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"

const AdminDashboardOverviewPage = () => {
    const greetingData = useDashboardStore((state) => state.greetingData)
    const statsCards = useDashboardStore((state) => state.statsCards)

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            <AdminGreeting greetingData={greetingData} />
            <DashboardStats statsCards={statsCards} />
        </div>
    )
}

export default AdminDashboardOverviewPage
"use client"

import React from "react"
import { useAdminDashboardUsersStore } from "@/zustandStore/admin/adminStore/adminDashboardUsersStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UsersContainer from "@/components/admin/users/UsersContainer"

const AdminDashboardUsersPage = () => {
  const statsCards = useAdminDashboardUsersStore((state) => state.usersStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Users table / collection container */}
      <UsersContainer />
    </div>
  )
}

export default AdminDashboardUsersPage

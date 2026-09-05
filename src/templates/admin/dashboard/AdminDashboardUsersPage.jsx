"use client"

import React, { useMemo } from "react"
import { useUsers } from "@/hooks/api/admin/users/useUsers"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { buildUsersParams } from "@/hooks/api/admin/users/usersParams"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UsersContainer from "@/components/admin/users/UsersContainer"
import AddNewUser from "@/components/admin/users/AddNewUser"

const AdminDashboardUsersPage = () => {
  const { get } = useUrlListParams()
  const rawStatus = get("status", "all")
  const rawSearch = get("q", "")
  const page = Number(get("page", "1")) || 1
  const limit = Number(get("limit", "20")) || 20

  const params = useMemo(() => {
    return buildUsersParams({ status: rawStatus, q: rawSearch, page, limit })
  }, [rawStatus, rawSearch, page, limit])

  const { data } = useUsers(params)
  const users = Array.isArray(data) ? data : data?.data || []

  const verifiedCount = users.filter((user) => user?.isVerified).length
  const now = new Date()
  const newThisMonthCount = users.filter((user) => {
    if (!user?.createdAt) return false
    const createdAt = new Date(user.createdAt)
    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
  }).length

  const statsCards = [
    {
      id: 1,
      title: "Total Users",
      value: users.length.toLocaleString(),
      icon: "Users",
      iconColor: "#CC97FF",
      iconBg: "rgba(204, 151, 255, 0.15)"
    },
    {
      id: 2,
      title: "Verified Users",
      value: verifiedCount.toLocaleString(),
      icon: "UserCheck",
      iconColor: "#34C759",
      iconBg: "rgba(52, 199, 89, 0.15)"
    },
    {
      id: 3,
      title: "Unverified Users",
      value: (users.length - verifiedCount).toLocaleString(),
      icon: "UserX",
      iconColor: "#FFAE00",
      iconBg: "rgba(255, 174, 0, 0.15)"
    },
    {
      id: 4,
      title: "New This Month",
      value: newThisMonthCount.toLocaleString(),
      icon: "UserPlus",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Register new user banner */}
      <AddNewUser />

      {/* Users table / collection container */}
      <UsersContainer />
    </div>
  )
}

export default AdminDashboardUsersPage


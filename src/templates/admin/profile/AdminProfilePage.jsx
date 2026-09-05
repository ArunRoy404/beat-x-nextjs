"use client"

import React, { useMemo } from "react"
import { useProfile } from "@/hooks/api/auth/useProfile"
import { useLoginHistory } from "@/hooks/api/auth/useLoginHistory"
import AdminGreeting from "@/components/admin/dashboard/AdminGreeting/AdminGreeting"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import ProfileOverviewCard from "@/components/admin/profile/ProfileOverviewCard"
import ProfileSettingsCard from "@/components/admin/profile/ProfileSettingsCard"
import ProfileFavoritesCard from "@/components/admin/profile/ProfileFavoritesCard"
import LoginHistoryContainer from "@/components/admin/profile/LoginHistoryContainer"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

const AdminProfilePage = () => {
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError, refetch: refetchProfile } = useProfile()
  const { data: loginHistory, isLoading: isHistoryLoading } = useLoginHistory()

  const greetingData = useMemo(() => {
    return {
      greeting: `Welcome Back, ${profile?.name || "Admin"}!`,
      statusLabel: "Admin Profile",
      activeUsersText: profile?.email || "",
      activeUsersLabel: "signed in",
      pendingReportsText: profile?.isVerified ? "Verified Account" : "Unverified",
      pendingReportsLabel: "",
      operationalText: "All Systems Operational",
      metrics: [
        { label: "Coins", value: `${(profile?.coinBalance ?? 0).toLocaleString()}`, type: "success" },
        { label: "Role", value: `${(profile?.role || "admin").toUpperCase()}`, type: "primary" },
        { label: "Provider", value: `${(profile?.provider || "local").toUpperCase()}`, type: "warning" },
      ],
    }
  }, [profile])

  const statsCards = useMemo(() => {
    return [
      {
        id: "coin-balance",
        title: "Coin Balance",
        value: `${(profile?.coinBalance ?? 0).toLocaleString()}`,
        icon: "Coins",
        iconBg: "rgba(255, 200, 100, 0.1)",
        iconColor: "#FFC864",
      },
      {
        id: "verification-status",
        title: "Account Status",
        value: profile?.isVerified ? "Verified" : "Unverified",
        icon: "ShieldCheck",
        iconBg: "rgba(52, 199, 89, 0.1)",
        iconColor: "#34C759",
      },
      {
        id: "system-role",
        title: "System Role",
        value: (profile?.role || "Admin").toUpperCase(),
        icon: "UserCheck",
        iconBg: "rgba(58, 223, 250, 0.1)",
        iconColor: "#3ADFFA",
      },
      {
        id: "auth-provider",
        title: "Auth Provider",
        value: (profile?.provider || "Local").toUpperCase(),
        icon: "User",
        iconBg: "rgba(204, 151, 255, 0.1)",
        iconColor: "#CC97FF",
      },
    ]
  }, [profile])

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="size-6 text-secondary" />
      </div>
    )
  }

  if (isProfileError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <span className="text-red-error text-sm font-medium">Failed to load admin profile data.</span>
        <Button variant="outline" size="sm" onClick={() => refetchProfile()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Top Banner Greeting */}
      <AdminGreeting greetingData={greetingData} />

      {/* Stats Row */}
      <DashboardStats statsCards={statsCards} />

      {/* Account Details Card */}
      <ProfileOverviewCard profile={profile} />

      {/* System Preferences Card */}
      <ProfileSettingsCard settings={profile?.settings} />

      {/* Saved Collections & Favorites Card */}
      <ProfileFavoritesCard profile={profile} />

      {/* Login Audit History DataTable */}
      <LoginHistoryContainer history={loginHistory} isLoading={isHistoryLoading} />
    </div>
  )
}

export default AdminProfilePage

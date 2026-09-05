"use client";

import React, { useMemo } from "react";
import { useAdminDashboard } from "@/hooks/api/admin/dashboard/useAdminDashboard";
import AdminGreeting from "@/components/admin/dashboard/AdminGreeting/AdminGreeting";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import PlatformGrowth from "@/components/admin/dashboard/PlatformGrowth/PlatformGrowth";
import GenreMix from "@/components/admin/dashboard/GenreMix/GenreMix";
import RevenueStreams from "@/components/admin/dashboard/RevenueStreams/RevenueStreams";
import RecentUploads from "@/components/admin/dashboard/RecentUploads/RecentUploads";
import RecentActivity from "@/components/shared/Dashboard/RecentActivity/RecentActivity";
import UpcomingEvents from "@/components/shared/Dashboard/UpcomingEvents/UpcomingEvents";

const GENRE_COLORS = [
  "#3ADFFA",
  "#CC97FF",
  "#E5F9CF",
  "#FF9999",
  "#FFC864",
  "#99CCFF",
  "#FF99CC",
  "#CCFF99",
  "#D1D5DB",
  "#9CA3AF",
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatRelativeTime(isoString) {
  if (!isoString) return "Recently";
  const diffMs = Date.now() - new Date(isoString).getTime();
  if (isNaN(diffMs)) return "Recently";
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

const AdminDashboardOverviewPage = () => {
  const { data } = useAdminDashboard();

  const greetingData = useMemo(() => {
    return {
      greeting: "Welcome Back, Admin!",
      statusLabel: "System Active",
      activeUsersText: `${data?.statCards?.activeUsers ?? 0} Users`,
      activeUsersLabel: "active now",
      pendingReportsText: `${data?.statCards?.pendingVerification ?? 0} Pending`,
      pendingReportsLabel: "verifications",
      operationalText: "All Services Operational",
      metrics: [
        { label: "Active Artists", value: `${data?.statCards?.activeArtists ?? 0}`, type: "primary" },
        { label: "Pending Payouts", value: `${data?.statCards?.pendingPayoutsCount ?? 0}`, type: "warning" },
        { label: "Revenue MTD", value: `৳${data?.statCards?.revenueMTD ?? 0}`, type: "success" },
      ],
    };
  }, [data]);

  const statsCards = useMemo(() => {
    return [
      {
        id: "total-users",
        title: "Total Users",
        value: `${data?.statCards?.totalUsers ?? 0}`,
        icon: "Users",
        iconBg: "rgba(58, 223, 250, 0.1)",
        iconColor: "#3ADFFA",
      },
      {
        id: "total-songs",
        title: "Total Songs",
        value: `${data?.statCards?.totalSongs ?? 0}`,
        icon: "Music",
        iconBg: "rgba(204, 151, 255, 0.1)",
        iconColor: "#CC97FF",
      },
      {
        id: "active-artists",
        title: "Active Artists",
        value: `${data?.statCards?.activeArtists ?? 0}`,
        icon: "UserCheck",
        iconBg: "rgba(229, 249, 207, 0.1)",
        iconColor: "#E5F9CF",
      },
      {
        id: "audiobooks-podcasts",
        title: "Audiobooks & Podcasts",
        value: `${(data?.statCards?.totalAudiobooks ?? 0) + (data?.statCards?.totalPodcasts ?? 0)}`,
        icon: "Headphones",
        iconBg: "rgba(255, 200, 100, 0.1)",
        iconColor: "#FFC864",
      },
    ];
  }, [data]);

  const platformGrowthData = useMemo(() => {
    const followersMap = new Map((data?.platformGrowth?.followers || []).map((f) => [f?.month, f?.total]));

    return (data?.platformGrowth?.streams || []).map((item) => {
      const parts = (item?.month || "").split("-");
      const monthIdx = parseInt(parts[1], 10) - 1;
      const monthName = MONTH_NAMES[monthIdx] || item?.month;
      return {
        name: monthName,
        stream: item?.total ?? 0,
        followers: followersMap.get(item?.month) ?? 0,
      };
    });
  }, [data]);

  const genreMixData = useMemo(() => {
    return (data?.genreMix || []).map((genre, idx) => ({
      name: genre?.name || "Unknown",
      value: genre?.percent ?? 0,
      color: GENRE_COLORS[idx % GENRE_COLORS.length],
    }));
  }, [data]);

  const revenueStreamsData = useMemo(() => {
    return (data?.revenueStreams || []).map((rev) => {
      const parts = (rev?.month || "").split("-");
      const monthIdx = parseInt(parts[1], 10) - 1;
      const monthName = MONTH_NAMES[monthIdx] || rev?.month;
      return {
        name: monthName,
        subscription: 0,
        store: rev?.store ?? 0,
        events: rev?.events ?? 0,
      };
    });
  }, [data]);

  const recentUploadsData = useMemo(() => {
    return (data?.recentUploads || []).map((upload, idx) => ({
      _id: upload?._id,
      number: String(idx + 1).padStart(2, "0"),
      title: upload?.title || "Untitled",
      cover: upload?.coverUrl || "",
      plays: `${upload?.playCount ?? 0} plays`,
      status: upload?.status === "active" ? "Published" : upload?.status || "Draft",
    }));
  }, [data]);

  const recentActivityData = useMemo(() => {
    return (data?.recentActivity || []).map((act, idx) => ({
      id: act?._id || idx + 1,
      text: act?.message || "System event",
      time: formatRelativeTime(act?.createdAt),
      color: act?.type?.startsWith("user") ? "#3ADFFA" : act?.type?.startsWith("support") ? "#CC97FF" : "#E5F9CF",
    }));
  }, [data]);

  const upcomingEventsData = useMemo(() => {
    return (data?.upcomingEvents || []).map((event, idx) => {
      const d = event?.eventDate ? new Date(event.eventDate) : null;
      const month = d && !isNaN(d) ? d.toLocaleString("en-US", { month: "short" }).toUpperCase() : "DEC";
      const day = d && !isNaN(d) ? String(d.getDate()).padStart(2, "0") : "01";
      const location = event?.venue ? `${event.venue}${event?.city ? `, ${event.city}` : ""}` : event?.city || "Online";

      return {
        id: event?._id || idx + 1,
        month,
        day,
        title: event?.title || "Event",
        location,
        ticketsSold: `${event?.ticketsSold ?? 0}/${event?.totalTickets ?? 0} tickets sold`,
        status: event?.status === "active" ? "Upcoming" : event?.status || "Scheduled",
      };
    });
  }, [data]);

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
        <RecentActivity data={recentActivityData} />
        <UpcomingEvents data={upcomingEventsData} viewAllHref="/admin/dashboard/tours" />
      </div>
    </div>
  );
};

export default AdminDashboardOverviewPage;
"use client";

import React, { useMemo } from "react";
import { useUrlListParams } from "@/hooks/useUrlListParams";
import { useAdminAnalytics } from "@/hooks/api/admin/analytics/useAdminAnalytics";
import { buildAnalyticsParams } from "@/hooks/api/admin/analytics/analyticsParams";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import TimeFilters from "@/components/admin/analytics/TimeFilters";
import GrowthOverview from "@/components/admin/analytics/GrowthOverview";
import PeakListeningHours from "@/components/admin/analytics/PeakListeningHours";
import GenreDistribution from "@/components/admin/analytics/GenreDistribution";

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

function formatListenTime(ms) {
  if (!ms || ms <= 0) return "0s";
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  if (minutes < 60) return remainingSecs > 0 ? `${minutes}m ${remainingSecs}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function formatChangePercent(percent) {
  if (percent === null || percent === undefined) return null;
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent}%`;
}

const AdminDashboardAnalyticsPage = () => {
  const { get, setParams } = useUrlListParams();
  const rawRange = get("range", "7d");
  const params = useMemo(() => buildAnalyticsParams({ range: rawRange }), [rawRange]);

  const { data } = useAdminAnalytics(params);

  const handleFilterChange = (filter) => {
    setParams({ range: filter.toLowerCase() });
  };

  const statsCards = useMemo(() => {
    return [
      {
        id: "total-streams",
        title: "Total Streams",
        value: `${data?.totalStreams?.value?.toLocaleString() ?? 0}`,
        change: formatChangePercent(data?.totalStreams?.changePercent),
        isPositive: (data?.totalStreams?.changePercent ?? 0) >= 0,
        icon: "Activity",
        iconBg: "rgba(58, 223, 250, 0.1)",
        iconColor: "#3ADFFA",
      },
      {
        id: "total-listeners",
        title: "Listeners",
        value: `${data?.listeners?.value?.toLocaleString() ?? 0}`,
        change: formatChangePercent(data?.listeners?.changePercent),
        isPositive: (data?.listeners?.changePercent ?? 0) >= 0,
        icon: "Users",
        iconBg: "rgba(204, 151, 255, 0.1)",
        iconColor: "#CC97FF",
      },
      {
        id: "follower-growth",
        title: "Follower Growth",
        value: `${data?.followerGrowth?.value?.toLocaleString() ?? 0}`,
        change: formatChangePercent(data?.followerGrowth?.changePercent),
        isPositive: (data?.followerGrowth?.changePercent ?? 0) >= 0,
        icon: "UserPlus",
        iconBg: "rgba(229, 249, 207, 0.1)",
        iconColor: "#E5F9CF",
      },
      {
        id: "avg-listen-time",
        title: "Avg Listen Time",
        value: formatListenTime(data?.avgListenTimeMs?.value),
        change: formatChangePercent(data?.avgListenTimeMs?.changePercent),
        isPositive: (data?.avgListenTimeMs?.changePercent ?? 0) >= 0,
        icon: "Clock",
        iconBg: "rgba(255, 200, 100, 0.1)",
        iconColor: "#FFC864",
      },
    ];
  }, [data]);

  const growthOverviewData = useMemo(() => {
    return (data?.growthOverview || []).map((item) => {
      const dateObj = item?.bucket ? new Date(item.bucket) : null;
      const formattedDate =
        dateObj && !isNaN(dateObj)
          ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : item?.bucket || "Date";
      return {
        name: formattedDate,
        stream: item?.streams ?? 0,
        followers: item?.followers ?? 0,
      };
    });
  }, [data]);

  const peakListeningHoursData = useMemo(() => {
    return (data?.peakListeningHours || []).map((item) => {
      const hr = item?.hour ?? 0;
      const period = hr >= 12 ? "pm" : "am";
      const displayHr = hr % 12 === 0 ? 12 : hr % 12;
      return {
        name: `${displayHr}${period}`,
        value: item?.count ?? 0,
      };
    });
  }, [data]);

  const genreDistributionData = useMemo(() => {
    return (data?.genreDistribution || []).map((genre, idx) => ({
      name: genre?.name || "Unknown",
      value: genre?.percent ?? 0,
      color: GENRE_COLORS[idx % GENRE_COLORS.length],
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Period selection filters at the top */}
      <div className="flex justify-start">
        <TimeFilters activeFilter={rawRange.toUpperCase()} onChange={handleFilterChange} />
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
  );
};

export default AdminDashboardAnalyticsPage;
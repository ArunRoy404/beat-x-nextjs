"use client";

import React, { useMemo } from "react";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import UploadNewSong from "@/components/admin/music/UploadNewSong";
import SongsContainer from "@/components/admin/music/SongsContainer/SongsContainer";
import { useSongs } from "@/hooks/api/admin/songs/useSongs";
import { useSongsListParams } from "@/hooks/api/admin/songs/useSongsListParams";

const AdminDashboardMusicPage = () => {
  // Same derivation as SongsContainer, so both read one cache entry.
  const { params } = useSongsListParams();

  const { data: allData } = useSongs(params);

  const statsCards = useMemo(() => {
    return [
      {
        id: 1,
        title: "Total Songs",
        value: (allData?.stats?.total ?? allData?.total ?? 0).toLocaleString(),
        icon: "Music",
        iconColor: "var(--secondary)",
        iconBg: "color-mix(in srgb, var(--secondary) 15%, transparent)",
      },
      {
        id: 2,
        title: "Total Streams",
        value: (allData?.stats?.totalStreams ?? 0).toLocaleString(),
        icon: "Activity",
        iconColor: "var(--primary)",
        iconBg: "color-mix(in srgb, var(--primary) 15%, transparent)",
      },
      {
        id: 3,
        title: "Published",
        value: (allData?.stats?.published ?? 0).toLocaleString(),
        icon: "CheckCircle",
        iconColor: "var(--green-success)",
        iconBg: "color-mix(in srgb, var(--green-success) 15%, transparent)",
      },
      {
        id: 4,
        title: "Drafts",
        value: (allData?.stats?.draft ?? 0).toLocaleString(),
        icon: "FileText",
        iconColor: "var(--yellow-warning)",
        iconBg: "color-mix(in srgb, var(--yellow-warning) 15%, transparent)",
      },
    ];
  }, [allData]);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload song selector container */}
      <UploadNewSong />

      {/* Songs table / collection container */}
      <SongsContainer />
    </div>
  );
};

export default AdminDashboardMusicPage;

"use client";

import React, { useMemo } from "react";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import UploadNewSong from "@/components/admin/music/UploadNewSong";
import SongsContainer from "@/components/admin/music/SongsContainer/SongsContainer";
import { useSongs } from "@/hooks/api/admin/songs/useSongs";
import { buildSongsParams } from "@/hooks/api/admin/songs/songsParams";
import { useUrlListParams } from "@/hooks/useUrlListParams";

const AdminDashboardMusicPage = () => {
  const { get } = useUrlListParams();
  const selectedStatus = get("status", "all");
  const selectedGenre = get("genre", "all");
  const urlSearch = get("q", "");
  const currentPage = Number(get("page", "1")) || 1;

  const params = buildSongsParams({
    status: selectedStatus,
    genre: selectedGenre,
    q: urlSearch,
    page: currentPage,
  });

  const { data: allData } = useSongs(params);

  const statsCards = useMemo(() => {
    return [
      {
        id: 1,
        title: "Total Songs",
        value: (allData?.stats?.total ?? allData?.total ?? 0).toLocaleString(),
        icon: "Music",
        iconColor: "#3ADFFA",
        iconBg: "rgba(58, 223, 250, 0.15)",
      },
      {
        id: 2,
        title: "Total Streams",
        value: (allData?.stats?.totalStreams ?? 0).toLocaleString(),
        icon: "Activity",
        iconColor: "#CC97FF",
        iconBg: "rgba(204, 151, 255, 0.15)",
      },
      {
        id: 3,
        title: "Published",
        value: (allData?.stats?.published ?? 0).toLocaleString(),
        icon: "CheckCircle",
        iconColor: "#E5F9CF",
        iconBg: "rgba(229, 249, 207, 0.15)",
      },
      {
        id: 4,
        title: "Drafts",
        value: (allData?.stats?.draft ?? 0).toLocaleString(),
        icon: "FileText",
        iconColor: "#FFC864",
        iconBg: "rgba(255, 200, 100, 0.15)",
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

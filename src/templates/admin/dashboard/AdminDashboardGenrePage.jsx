"use client";

import React, { useMemo } from "react";
import { useGenres } from "@/hooks/api/admin/genre/useGenres";
import { buildGenresParams } from "@/hooks/api/admin/genre/genreParams";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import GenresContainer from "@/components/admin/genre/GenresContainer";

const AdminDashboardGenrePage = () => {
  const { data: genresData } = useGenres(buildGenresParams());

  const genresList = useMemo(() => {
    return (
      genresData?.genre ??
      genresData?.genres ??
      genresData?.data ??
      (Array.isArray(genresData) ? genresData : [])
    );
  }, [genresData]);

  const totalCount = genresData?.total ?? genresList.length;

  const now = new Date();
  const newThisMonthCount = useMemo(() => {
    return genresList.filter((genre) => {
      if (!genre?.createdAt) return false;
      const createdAt = new Date(genre.createdAt);
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
    }).length;
  }, [genresList, now]);

  const statsCards = [
    {
      id: 1,
      title: "Total Genres",
      value: (totalCount ?? 0).toLocaleString(),
      icon: "FolderOpen",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)",
    },
    {
      id: 2,
      title: "New This Month",
      value: (newThisMonthCount ?? 0).toLocaleString(),
      icon: "FolderPlus",
      iconColor: "#CC97FF",
      iconBg: "rgba(204, 151, 255, 0.15)",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Genres table / collection container */}
      <GenresContainer />
    </div>
  );
};

export default AdminDashboardGenrePage;

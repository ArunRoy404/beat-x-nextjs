"use client";

import React from "react";
import { motion } from "framer-motion";
import { useUrlListParams } from "@/hooks/useUrlListParams";
import { useLikedSongs } from "@/hooks/api/user/songs/useLikedSongs";
import LikedSongsHero from "@/components/user/library/LikedSongsHero";
import { LikedSongsTable } from "@/components/user/liked";
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function UserLikedSongsPage() {
  const { get, setParams } = useUrlListParams();

  const page = Math.max(1, Number(get("page", 1)) || 1);
  const limit = Math.max(1, Math.min(100, Number(get("limit", 20)) || 20));

  const { data: likedData, isLoading } = useLikedSongs({ page, limit });

  const rawSongs =
    (Array.isArray(likedData?.songs) ? likedData.songs : null) ??
    (Array.isArray(likedData?.data?.data) ? likedData.data.data : null) ??
    (Array.isArray(likedData?.data) ? likedData.data : null) ??
    (Array.isArray(likedData) ? likedData : []);

  const songs = Array.isArray(rawSongs) ? rawSongs : [];
  const total = Number(likedData?.total ?? likedData?.data?.total) || songs.length;

  const handlePageChange = (newPage) => {
    setParams({ page: newPage }, { resetPage: false });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8 py-6"
    >
      {/* Hero Banner with Play All & Shuffle */}
      <motion.div variants={itemVariants} className="w-full">
        <LikedSongsHero data={likedData} />
      </motion.div>

      {/* Liked Songs Interactive Table */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-whitetext">
            Saved Tracks
          </h2>
          {total > 0 && (
            <span className="text-xs font-medium text-light-gray">
              Showing {songs.length} of {total} {total === 1 ? "track" : "tracks"}
            </span>
          )}
        </div>

        <LikedSongsTable
          songs={songs}
          isLoading={isLoading}
          page={page}
          limit={limit}
        />

        {/* Pagination when total exceeds limit */}
        {total > limit && (
          <div className="flex justify-center pt-2">
            <CommonPagination
              currentPage={page}
              totalItems={total}
              pageSize={limit}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

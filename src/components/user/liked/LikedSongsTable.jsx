"use client";

import React from "react";
import LikedSongsTableHeader from "./LikedSongsTableHeader";
import LikedSongsEmptyState from "./LikedSongsEmptyState";
import LikedSongsSkeleton from "./LikedSongsSkeleton";
import LikedSongRow from "./LikedSongRow";
import { cn } from "@/lib/utils";

/**
 * Composite table component for displaying the user's liked songs.
 * Orchestrates table header, rows, empty state, and loading skeleton.
 */
const LikedSongsTable = ({
  songs = [],
  isLoading = false,
  page = 1,
  limit = 20,
  className,
}) => {
  if (isLoading) {
    return <LikedSongsSkeleton count={8} className={className} />;
  }

  if (songs.length === 0) {
    return <LikedSongsEmptyState className={className} />;
  }

  const offset = (page - 1) * limit;

  return (
    <div
      className={cn(
        "flex flex-col rounded-[16px] border border-white/5 bg-dark-accent/20 p-2 md:p-4 backdrop-blur-sm",
        className
      )}
    >
      {/* Atomic Table Header */}
      <LikedSongsTableHeader />

      {/* Rows List */}
      <div className="flex flex-col gap-1 pt-2">
        {songs.map((song, idx) => (
          <LikedSongRow
            key={song?._id || song?.id || idx}
            song={song}
            index={offset + idx}
            songs={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedSongsTable;

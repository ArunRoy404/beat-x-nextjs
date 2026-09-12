"use client";

import React from "react";
import PlaylistCard from "./PlaylistCard";
import { Skeleton } from "@/components/ui/skeleton";
import PlaylistEmptyState from "./PlaylistEmptyState";

const PlaylistGrid = ({
  playlists = [],
  isLoading = false,
  searchQuery = "",
  onClearSearch,
  onCreateClick,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2.5 rounded-[14px] border border-white/5 bg-dark-accent/30 p-3"
          >
            <Skeleton className="aspect-square w-full rounded-[12px] bg-white/5" />
            <Skeleton className="h-4 w-3/4 rounded-md bg-white/5 mt-1" />
            <Skeleton className="h-3 w-1/2 rounded-md bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  if (playlists.length === 0) {
    if (searchQuery.trim()) {
      return (
        <PlaylistEmptyState
          isSearch
          searchQuery={searchQuery}
          onAction={onClearSearch}
        />
      );
    }
    return <PlaylistEmptyState onAction={onCreateClick} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {playlists.map((playlist) => {
        const playlistId = playlist?._id || playlist?.id;
        return (
          <PlaylistCard
            key={playlistId}
            playlist={playlist}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default PlaylistGrid;

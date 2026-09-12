"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const PlaylistSearchFilter = ({
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-light-gray" />
        <Input
          type="text"
          placeholder="Search within your playlists..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 pl-10 rounded-full border-white/10 bg-dark-accent/60 text-[13px] text-whitetext placeholder:text-light-gray/60 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary backdrop-blur-md"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-light-gray">
          Showing <strong className="text-whitetext">{filteredCount}</strong> of{" "}
          {totalCount}
        </span>
      </div>
    </div>
  );
};

export default PlaylistSearchFilter;

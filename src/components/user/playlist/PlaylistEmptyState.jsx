"use client";

import React from "react";
import { ListMusic, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlaylistEmptyState = ({ isSearch = false, searchQuery = "", onAction }) => {
  if (isSearch) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 bg-dark-accent/20 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-light-gray">
          <Search className="size-5 text-light-gray" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-whitetext">
          No playlists matched your search
        </h3>
        <p className="mt-1 text-xs text-light-gray max-w-sm">
          We couldn't find any playlists matching "{searchQuery}". Try a different search term.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={onAction}
          className="mt-4 h-9 px-4 rounded-full border-white/20 text-whitetext hover:bg-white/10 cursor-pointer text-xs"
        >
          Clear Search
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 bg-dark-accent/20 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary shadow-md">
        <ListMusic className="size-7 stroke-[1.8]" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-whitetext">
        Your playlist collection is empty
      </h3>
      <p className="mt-1.5 max-w-md text-xs sm:text-sm text-light-gray leading-relaxed">
        Playlists are the best way to group your favorite songs, moods, and musical moments.
        Start your first soundscape collection right now.
      </p>
      <Button
        type="button"
        variant="gradient"
        onClick={onAction}
        className="mt-6 h-10 px-6 rounded-full font-semibold flex items-center gap-2 cursor-pointer text-xs"
      >
        <Plus className="size-4 stroke-[2.5]" />
        <span>Create Your First Playlist</span>
      </Button>
    </div>
  );
};

export default PlaylistEmptyState;

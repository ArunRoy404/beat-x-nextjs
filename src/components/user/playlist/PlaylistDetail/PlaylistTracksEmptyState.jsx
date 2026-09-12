"use client";

import React from "react";
import { ListMusic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlaylistTracksEmptyState = ({ onAddSongsClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-secondary">
        <ListMusic className="size-6" />
      </div>
      <h4 className="mt-3 text-base font-semibold text-whitetext">
        No tracks in this playlist yet
      </h4>
      <p className="mt-1 max-w-sm text-xs text-light-gray leading-relaxed">
        Explore platform songs and add them to build your custom playlist.
      </p>
      <Button
        type="button"
        variant="gradient"
        onClick={onAddSongsClick}
        className="mt-4 h-9 px-4 rounded-full font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
      >
        <Plus className="size-3.5" />
        <span>Browse Songs to Add</span>
      </Button>
    </div>
  );
};

export default PlaylistTracksEmptyState;

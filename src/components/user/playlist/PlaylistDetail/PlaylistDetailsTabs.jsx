"use client";

import React, { useState } from "react";
import { Plus, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";
import PlaylistTracksList from "./PlaylistTracksList";
import PlaylistAddSongsPicker from "./PlaylistAddSongsPicker";

const PlaylistDetailsTabs = ({ playlist, tracks = [] }) => {
  const [activeTab, setActiveTab] = useState("tracks"); // "tracks" | "add_songs"
  const playlistId = playlist?._id || playlist?.id;

  const trackIds = new Set(tracks.map((t) => t?._id || t?.id).filter(Boolean));

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Subtab Navigation */}
      <div className="px-6 pt-4 pb-2 border-b border-white/5 flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("tracks")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5",
            activeTab === "tracks"
              ? "bg-white/10 text-whitetext border border-white/15"
              : "text-light-gray hover:text-whitetext hover:bg-white/5"
          )}
        >
          <ListMusic className="size-3.5" />
          <span>Tracks ({tracks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("add_songs")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5",
            activeTab === "add_songs"
              ? "bg-secondary/15 text-secondary border border-secondary/30"
              : "text-light-gray hover:text-whitetext hover:bg-white/5"
          )}
        >
          <Plus className="size-3.5" />
          <span>Add Songs</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-6 min-h-[300px]">
        {activeTab === "tracks" ? (
          <PlaylistTracksList
            tracks={tracks}
            playlistId={playlistId}
            onAddSongsClick={() => setActiveTab("add_songs")}
          />
        ) : (
          <PlaylistAddSongsPicker
            playlistId={playlistId}
            trackIds={trackIds}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetailsTabs;

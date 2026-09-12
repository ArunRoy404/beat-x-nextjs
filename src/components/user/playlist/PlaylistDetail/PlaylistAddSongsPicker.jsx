"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useBrowseSongs } from "@/hooks/api/user/songs/useBrowseSongs";
import PlaylistAddSongRow from "./PlaylistAddSongRow";

const PlaylistAddSongsPicker = ({ playlistId, trackIds = new Set() }) => {
  const [query, setQuery] = useState("");
  const { data: browseSongsData, isLoading } = useBrowseSongs({ page: 1, limit: 50 });

  const rawList =
    (Array.isArray(browseSongsData?.data?.data) ? browseSongsData.data.data : null) ??
    (Array.isArray(browseSongsData?.data) ? browseSongsData.data : null) ??
    (Array.isArray(browseSongsData?.songs) ? browseSongsData.songs : null) ??
    (Array.isArray(browseSongsData) ? browseSongsData : []);

  const songs = Array.isArray(rawList) ? rawList : [];

  const filteredSongs = songs.filter((song) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const title = (song?.title || song?.name || "").toLowerCase();
    const artist = (song?.artist || song?.subtitle || "").toLowerCase();
    return title.includes(q) || artist.includes(q);
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-light-gray" />
        <Input
          type="text"
          placeholder="Search catalog by song title or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 pl-10 rounded-full border-white/10 bg-white/[0.03] text-[13px] text-whitetext placeholder:text-light-gray/60 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary"
        />
      </div>

      {/* Catalog List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-secondary" />
        </div>
      ) : filteredSongs.length > 0 ? (
        <div className="flex flex-col gap-0.5">
          {filteredSongs.map((song) => {
            const songId = song?._id || song?.id;
            const isAlreadyAdded = trackIds.has(songId);
            return (
              <PlaylistAddSongRow
                key={songId}
                song={song}
                isAlreadyAdded={isAlreadyAdded}
                playlistId={playlistId}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-light-gray">
          <p className="text-sm">No songs found matching "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistAddSongsPicker;

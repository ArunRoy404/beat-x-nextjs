"use client";

import React, { useState } from "react";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import SongDetailModal from "@/components/user/home/SongDetailModal";
import AddToPlaylistDialog from "@/components/dialogs/user/playlist/AddToPlaylistDialog";
import LikedSongTrackNumber from "./LikedSongTrackNumber";
import LikedSongInfoCell from "./LikedSongInfoCell";
import LikedSongActions from "./LikedSongActions";
import { cn } from "@/lib/utils";

function formatDuration(msOrSec) {
  if (!msOrSec || !Number.isFinite(Number(msOrSec))) return "--:--";
  const num = Number(msOrSec);
  const totalSeconds = num > 1000 ? Math.floor(num / 1000) : Math.floor(num);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

/**
 * Composite row component for a single liked song in the table.
 * Assembled using atomic subcomponents for track number, info cell, and actions.
 */
const LikedSongRow = ({ song, index, songs = [] }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);

  const songId = song?._id || song?.id;
  const { playSong, currentSongId, isPlaying } = usePlaySong();

  const isCurrentPlaying = songId && songId === currentSongId && isPlaying;
  const title = song?.title || "Untitled Track";
  const artist = song?.artist || song?.subtitle || "Unknown Artist";
  const coverUrl = song?.coverUrl || song?.art;
  const albumName =
    song?.album?.title ||
    song?.album?.name ||
    (typeof song?.album === "string" ? song?.album : null) ||
    "-";
  const dateFormatted = formatDate(song?.likedAt || song?.createdAt || song?.publishedAt);
  const durationText = formatDuration(song?.durationMs || song?.duration);

  const handleRowClick = () => {
    playSong(song, {
      queue: songs.length > 0 ? songs : [song],
      index,
    });
  };

  return (
    <>
      <div
        onClick={handleRowClick}
        className={cn(
          "group grid grid-cols-[32px_1fr_48px] md:grid-cols-[40px_minmax(200px,2.5fr)_minmax(140px,1.5fr)_minmax(100px,1fr)_80px_60px] items-center gap-3 px-4 py-2.5 rounded-[10px] transition-colors cursor-pointer select-none",
          isCurrentPlaying
            ? "bg-secondary/10 border border-secondary/20"
            : "hover:bg-white/[0.04] border border-transparent"
        )}
      >
        {/* Column 1: Atomic Track Number / Play hover / Equalizer Wave */}
        <LikedSongTrackNumber
          index={index}
          isPlaying={isCurrentPlaying}
          onPlayToggle={handleRowClick}
        />

        {/* Column 2: Atomic Artwork & Title / Artist */}
        <LikedSongInfoCell
          title={title}
          artist={artist}
          coverUrl={coverUrl}
          isActive={isCurrentPlaying}
        />

        {/* Column 3: Album (hidden on mobile) */}
        <div className="hidden md:block truncate pr-2">
          <span className="text-[13px] text-light-gray/80 truncate block">
            {albumName}
          </span>
        </div>

        {/* Column 4: Date Added (hidden on mobile) */}
        <div className="hidden md:block truncate pr-2">
          <span className="text-[12px] text-light-gray/70">
            {dateFormatted}
          </span>
        </div>

        {/* Column 5: Duration (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-end pr-2">
          <span className="text-[12px] font-medium text-light-gray/80 tabular-nums">
            {durationText}
          </span>
        </div>

        {/* Column 6: Atomic Actions (Heart toggle + Dropdown menu) */}
        <LikedSongActions
          songId={songId}
          onPlayNow={handleRowClick}
          onAddToPlaylist={() => setIsAddToPlaylistOpen(true)}
          onSongInfo={() => setIsDetailOpen(true)}
        />
      </div>

      {/* Add to Playlist Dialog */}
      <AddToPlaylistDialog
        open={isAddToPlaylistOpen}
        onOpenChange={setIsAddToPlaylistOpen}
        song={song}
      />

      {/* Song Details Modal */}
      <SongDetailModal
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        song={song}
      />
    </>
  );
};

export default LikedSongRow;

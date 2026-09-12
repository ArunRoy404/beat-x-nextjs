"use client";

import React from "react";
import PlaylistCardCover from "./PlaylistCardCover";
import PlaylistCardMeta from "./PlaylistCardMeta";
import PlaylistCardActions from "./PlaylistCardActions";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";

const PlaylistCard = ({
  playlist,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const { playSong, currentSongId, isPlaying } = usePlaySong();

  const title = playlist?.title || playlist?.name || "Untitled Playlist";
  const songs = playlist?.songs || [];
  const songCount = songs?.length || 0;
  const coverUrl = playlist?.coverUrl || playlist?.art || (songs?.[0]?.coverUrl ?? null);

  const firstSong = songs?.[0];
  const isFirstPlaying =
    firstSong && (firstSong?._id === currentSongId || firstSong?.id === currentSongId) && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (firstSong) {
      playSong(firstSong, { queue: songs, index: 0 });
    } else {
      onViewDetails?.(playlist);
    }
  };

  return (
    <div
      onClick={() => onViewDetails?.(playlist)}
      className="group relative flex flex-col gap-2.5 rounded-[14px] border border-white/5 bg-dark-accent/40 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25 hover:bg-dark-accent/70 hover:shadow-lg hover:shadow-secondary/5 cursor-pointer"
    >
      <PlaylistCardCover
        coverUrl={coverUrl}
        title={title}
        songCount={songCount}
        isPlaying={isFirstPlaying}
        onPlayClick={handlePlayClick}
      />

      <div className="flex items-center justify-between gap-2 px-0.5">
        <PlaylistCardMeta title={title} songCount={songCount} />

        <PlaylistCardActions
          onViewDetails={() => onViewDetails?.(playlist)}
          onEdit={() => onEdit?.(playlist)}
          onDelete={() => onDelete?.(playlist)}
        />
      </div>
    </div>
  );
};

export default PlaylistCard;

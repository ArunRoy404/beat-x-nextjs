"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Music, Play, Pause, MoreVertical, Edit2, Trash2, ListMusic } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import { cn } from "@/lib/utils";

export default function PlaylistCard({
  playlist,
  onViewDetails,
  onEdit,
  onDelete,
}) {
  const [imageError, setImageError] = useState(false);
  const { playSong, currentSongId, isPlaying } = usePlaySong();

  const title = playlist?.title || playlist?.name || "Untitled Playlist";
  const songs = playlist?.songs || [];
  const songCount = songs?.length || 0;
  const coverUrl = playlist?.coverUrl || playlist?.art || (songs?.[0]?.coverUrl ?? null);

  const firstSong = songs?.[0];
  const isCurrentlyPlaying =
    firstSong && (firstSong?._id === currentSongId || firstSong?.id === currentSongId) && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (firstSong) {
      playSong(firstSong);
    } else {
      onViewDetails(playlist);
    }
  };

  return (
    <div
      onClick={() => onViewDetails(playlist)}
      className="group relative flex flex-col gap-3 rounded-[20px] border border-white/5 bg-dark-accent/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:bg-dark-accent/70 hover:shadow-xl hover:shadow-secondary/5 cursor-pointer"
    >
      {/* Cover Artwork Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-gradient-to-br from-white/5 to-white/10 shadow-inner">
        {coverUrl && !imageError ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary/10 via-dark-accent to-primary/10 p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-secondary shadow-lg shadow-secondary/10 group-hover:scale-110 transition-transform duration-300">
              <Music className="size-7 stroke-[1.8]" />
            </div>
            <span className="text-[11px] font-medium text-light-gray/70 tracking-wider uppercase">
              BEATX SOUND
            </span>
          </div>
        )}

        {/* Floating Quick Play Overlay Button */}
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label={isCurrentlyPlaying ? "Pause Playlist" : "Play Playlist"}
          className={cn(
            "absolute bottom-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
            isCurrentlyPlaying
              ? "opacity-100 scale-100"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          )}
        >
          {isCurrentlyPlaying ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Track Count Pill Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-whitetext border border-white/10 flex items-center gap-1.5">
          <ListMusic className="size-3 text-secondary" />
          <span>
            {songCount} {songCount === 1 ? "track" : "tracks"}
          </span>
        </div>
      </div>

      {/* Metadata & Menu */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-base font-semibold text-whitetext group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <p className="truncate text-xs text-light-gray/80 mt-0.5">
            {songCount > 0 ? `${songCount} curated tracks` : "Empty playlist"}
          </p>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-full text-light-gray hover:bg-white/10 hover:text-whitetext transition-colors cursor-pointer outline-none">
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-white/10 bg-dark-accent/95 p-1 backdrop-blur-xl shadow-2xl"
            >
              <DropdownMenuItem
                onClick={() => onViewDetails(playlist)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-whitetext hover:bg-white/10 cursor-pointer"
              >
                <ListMusic className="size-4 text-secondary" />
                <span>View & Add Songs</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(playlist)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-whitetext hover:bg-white/10 cursor-pointer"
              >
                <Edit2 className="size-4 text-primary" />
                <span>Rename Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(playlist)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-destructive hover:bg-destructive/15 cursor-pointer"
              >
                <Trash2 className="size-4" />
                <span>Delete Playlist</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Music, Play, Pause, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";

const PlaylistCardCover = ({
  coverUrl,
  title,
  songCount = 0,
  isPlaying = false,
  onPlayClick,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-gradient-to-br from-white/5 to-white/10 shadow-inner">
      {coverUrl && !imageError ? (
        <Image
          src={coverUrl}
          alt={title || "Playlist cover"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setImageError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-secondary/10 via-dark-accent to-primary/10 p-4 text-center">
          <div className="flex size-11 items-center justify-center rounded-[10px] bg-white/5 border border-white/10 text-secondary shadow-md group-hover:scale-105 transition-transform duration-300">
            <Music className="size-5 stroke-[1.8]" />
          </div>
          <span className="text-[10px] font-medium text-light-gray/70 tracking-wider uppercase">
            BEATX SOUND
          </span>
        </div>
      )}

      {/* Track count pill */}
      <div className="absolute top-2.5 left-2.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-whitetext border border-white/10 flex items-center gap-1.5 select-none">
        <ListMusic className="size-3 text-secondary" />
        <span>
          {songCount} {songCount === 1 ? "track" : "tracks"}
        </span>
      </div>

      {/* Floating Play button */}
      <button
        type="button"
        onClick={onPlayClick}
        aria-label={isPlaying ? "Pause Playlist" : "Play Playlist"}
        className={cn(
          "absolute bottom-2.5 right-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-secondary text-button-text shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
          isPlaying
            ? "opacity-100 scale-100"
            : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        {isPlaying ? (
          <Pause className="size-4 fill-current" />
        ) : (
          <Play className="size-4 fill-current ml-0.5" />
        )}
      </button>
    </div>
  );
};

export default PlaylistCardCover;

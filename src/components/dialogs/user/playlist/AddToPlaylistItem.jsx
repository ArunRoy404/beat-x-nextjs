"use client";

import React from "react";
import Image from "next/image";
import { Music2, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atomic playlist row item within AddToPlaylistDialog.
 */
const AddToPlaylistItem = ({
  playlist,
  isAdding = false,
  isDisabled = false,
  onSelect,
  className,
}) => {
  const plTitle = playlist?.title || playlist?.name || "Untitled Playlist";
  const plSongsCount = Array.isArray(playlist?.songs)
    ? playlist.songs.length
    : (playlist?.songCount ?? 0);
  const plCover = playlist?.coverUrl || playlist?.art;

  return (
    <div
      onClick={() => !isDisabled && onSelect?.(playlist)}
      className={cn(
        "flex items-center justify-between gap-3 p-2 rounded-[8px] hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5 group",
        isAdding && "opacity-70 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-[6px] bg-white/5">
          {plCover ? (
            <Image
              src={plCover}
              alt={plTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-light-gray">
              <Music2 className="size-4 text-secondary/70" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-whitetext group-hover:text-secondary transition-colors">
            {plTitle}
          </p>
          <p className="text-xs text-light-gray">
            {plSongsCount} {plSongsCount === 1 ? "track" : "tracks"}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isDisabled}
        className="size-8 rounded-full bg-white/5 group-hover:bg-secondary group-hover:text-button-text text-light-gray flex items-center justify-center transition-all cursor-pointer"
        title="Add track"
        aria-label={`Add track to ${plTitle}`}
      >
        {isAdding ? (
          <Loader2 className="size-4 animate-spin text-secondary" />
        ) : (
          <Plus className="size-4" />
        )}
      </button>
    </div>
  );
};

export default AddToPlaylistItem;

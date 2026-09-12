"use client";

import React from "react";
import {
  Heart,
  MoreVertical,
  Play,
  ListPlus,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToggleLikeSong } from "@/hooks/api/user/songs/useToggleLikeSong";
import { cn } from "@/lib/utils";

/**
 * Atomic action buttons for a liked song row:
 * - Heart like/unlike toggle
 * - Context menu with Play Now, Add to Playlist, and Song Info
 */
const LikedSongActions = ({
  songId,
  isLiked = true,
  onPlayNow,
  onAddToPlaylist,
  onSongInfo,
  className,
}) => {
  const { mutate: toggleLike, isPending: isLikePending } = useToggleLikeSong();

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (!songId || isLikePending) return;
    toggleLike(songId);
  };

  return (
    <div
      className={cn("flex items-center justify-end gap-1.5", className)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Like Heart Button */}
      <button
        type="button"
        disabled={isLikePending}
        onClick={handleToggleLike}
        className="size-8 flex items-center justify-center rounded-full text-secondary hover:bg-white/10 transition-transform active:scale-90 cursor-pointer"
        title="Remove from Liked Songs"
        aria-label="Toggle like"
      >
        <Heart className="size-4 fill-current text-secondary" />
      </button>

      {/* Context Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="size-8 flex items-center justify-center rounded-full text-light-gray hover:text-whitetext hover:bg-white/10 transition-colors cursor-pointer outline-none"
          aria-label="More options"
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-48 rounded-[10px] border border-white/10 bg-dark-accent/95 p-1.5 backdrop-blur-xl shadow-2xl"
        >
          <DropdownMenuItem
            onClick={onPlayNow}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-whitetext hover:bg-white/10 cursor-pointer transition-colors"
          >
            <Play className="size-4 text-secondary fill-secondary" />
            <span>Play Now</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onAddToPlaylist}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-whitetext hover:bg-white/10 cursor-pointer transition-colors"
          >
            <ListPlus className="size-4 text-secondary" />
            <span>Add to Playlist</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onSongInfo}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-whitetext hover:bg-white/10 cursor-pointer transition-colors"
          >
            <Info className="size-4 text-light-gray" />
            <span>Song Info</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LikedSongActions;

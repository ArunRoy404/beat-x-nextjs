"use client";

import React from "react";
import Image from "next/image";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atomic song info cell displaying track cover artwork, title, and artist name.
 */
const LikedSongInfoCell = ({
  title = "Untitled Track",
  artist = "Unknown Artist",
  coverUrl,
  isActive = false,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-3 min-w-0 pr-2", className)}>
      <div className="relative size-11 shrink-0 overflow-hidden rounded-[8px] bg-dark-accent border border-white/5">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-light-gray">
            <Music2 className="size-5 text-secondary/60" />
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0">
        <span
          className={cn(
            "text-[14px] font-medium truncate",
            isActive
              ? "text-secondary font-semibold"
              : "text-whitetext group-hover:text-secondary transition-colors"
          )}
        >
          {title}
        </span>
        <span className="text-[12px] text-light-gray truncate">
          {artist}
        </span>
      </div>
    </div>
  );
};

export default LikedSongInfoCell;

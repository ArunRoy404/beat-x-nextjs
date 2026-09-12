"use client";

import React from "react";
import Image from "next/image";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atomic track preview banner within the AddToPlaylistDialog.
 */
const AddToPlaylistTrackPreview = ({
  title = "Selected Song",
  artist = "Unknown Artist",
  coverUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-6 py-3 bg-white/[0.02] border-b border-white/5",
        className
      )}
    >
      <div className="relative size-11 shrink-0 overflow-hidden rounded-[8px] bg-white/5">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-light-gray">
            <Music2 className="size-5 text-secondary" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-whitetext">
          {title}
        </p>
        <p className="truncate text-[12px] text-light-gray">
          {artist}
        </p>
      </div>
    </div>
  );
};

export default AddToPlaylistTrackPreview;

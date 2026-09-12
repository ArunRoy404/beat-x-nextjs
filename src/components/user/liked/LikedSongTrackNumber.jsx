"use client";

import React from "react";
import { Play, Pause } from "lucide-react";
import EqualizerWave from "@/components/shared/EqualizerWave";
import { cn } from "@/lib/utils";

/**
 * Atomic track number / play hover / active equalizer indicator.
 */
const LikedSongTrackNumber = ({
  index,
  isPlaying = false,
  onPlayToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex size-6 items-center justify-center",
        className
      )}
    >
      {isPlaying ? (
        <>
          {/* Animated equalizer waves when track is playing and not hovered */}
          <div className="flex items-center justify-center group-hover:hidden">
            <EqualizerWave />
          </div>
          {/* Pause button shown on hover when playing */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlayToggle?.();
            }}
            className="hidden group-hover:flex size-6 items-center justify-center text-secondary transition-transform active:scale-95 cursor-pointer"
            title="Pause"
            aria-label="Pause track"
          >
            <Pause className="size-4 fill-current" />
          </button>
        </>
      ) : (
        <>
          {/* Track position number */}
          <span className="text-xs font-medium text-light-gray group-hover:hidden">
            {index + 1}
          </span>
          {/* Play button shown on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlayToggle?.();
            }}
            className="hidden group-hover:flex size-6 items-center justify-center text-whitetext hover:text-secondary transition-transform active:scale-95 cursor-pointer"
            title="Play track"
            aria-label="Play track"
          >
            <Play className="size-3.5 fill-current ml-0.5" />
          </button>
        </>
      )}
    </div>
  );
};

export default LikedSongTrackNumber;

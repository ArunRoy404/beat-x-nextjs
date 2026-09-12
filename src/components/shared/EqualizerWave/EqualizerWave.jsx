import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable animated equalizer wave indicator to show active audio playback.
 */
const EqualizerWave = ({ className, barClassName }) => {
  return (
    <span
      className={cn(
        "inline-flex items-end gap-[2px] h-3.5 w-3.5",
        className
      )}
      aria-label="Playing"
    >
      <span
        className={cn(
          "w-[2.5px] h-full bg-secondary animate-pulse rounded-full",
          barClassName
        )}
      />
      <span
        className={cn(
          "w-[2.5px] h-2/3 bg-secondary animate-pulse [animation-delay:150ms] rounded-full",
          barClassName
        )}
      />
      <span
        className={cn(
          "w-[2.5px] h-4/5 bg-secondary animate-pulse [animation-delay:300ms] rounded-full",
          barClassName
        )}
      />
    </span>
  );
};

export default EqualizerWave;

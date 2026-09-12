import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Atomic skeleton placeholder rows for loading liked songs.
 */
const LikedSongsSkeleton = ({ count = 8, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-[14px] border border-white/5 bg-dark-accent/20 p-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between gap-4 py-3 px-3 rounded-[8px]"
        >
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="size-6 rounded-md bg-white/5" />
            <Skeleton className="size-11 rounded-[8px] bg-white/5" />
            <div className="flex flex-col gap-1.5 flex-1 max-w-xs">
              <Skeleton className="h-4 w-3/4 rounded bg-white/5" />
              <Skeleton className="h-3 w-1/2 rounded bg-white/5" />
            </div>
          </div>
          <Skeleton className="h-4 w-24 rounded bg-white/5 hidden md:block" />
          <Skeleton className="h-4 w-20 rounded bg-white/5 hidden md:block" />
          <Skeleton className="h-4 w-12 rounded bg-white/5 hidden md:block" />
          <Skeleton className="size-8 rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  );
};

export default LikedSongsSkeleton;

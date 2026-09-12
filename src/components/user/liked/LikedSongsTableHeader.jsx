import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atomic table header for the liked songs track list.
 */
const LikedSongsTableHeader = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[32px_1fr_48px] md:grid-cols-[40px_minmax(200px,2.5fr)_minmax(140px,1.5fr)_minmax(100px,1fr)_80px_60px] items-center gap-3 px-4 py-3 border-b border-white/5 text-[11px] font-semibold tracking-wider text-light-gray uppercase select-none",
        className
      )}
    >
      <div className="flex items-center justify-center">#</div>
      <div>Title</div>
      <div className="hidden md:block">Album</div>
      <div className="hidden md:block">Date Added</div>
      <div className="hidden md:flex items-center justify-end pr-2">
        <Clock className="size-3.5" />
      </div>
      <div className="flex items-center justify-end">Actions</div>
    </div>
  );
};

export default LikedSongsTableHeader;

import React from "react";
import Link from "next/link";
import { Heart, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atomic empty state component for when the user has no liked songs.
 */
const LikedSongsEmptyState = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 rounded-[16px] border border-white/5 bg-dark-accent/20 text-center",
        className
      )}
    >
      <div className="size-20 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-5 shadow-[0px_0px_30px_rgba(58,223,250,0.15)]">
        <Heart className="size-10 fill-secondary/20 text-secondary" />
      </div>
      <h3 className="text-2xl font-bold text-whitetext mb-2">
        No Liked Songs Yet
      </h3>
      <p className="max-w-md text-sm text-light-gray mb-6 leading-relaxed">
        Songs you like across Beat-X will appear here. Tap the heart icon on any song, player bar, or modal to curate your favorites.
      </p>
      <Link
        href="/explore"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-button-text font-semibold text-sm transition-transform active:scale-95 shadow-[0px_10px_15px_-3px_rgba(58,223,250,0.2)]"
      >
        <Compass className="size-4" />
        <span>Explore Music</span>
      </Link>
    </div>
  );
};

export default LikedSongsEmptyState;

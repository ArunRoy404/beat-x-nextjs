import React from "react";
import { Sparkles, ListMusic } from "lucide-react";

const PlaylistHeroBadge = ({ totalCount = 0 }) => {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
        <Sparkles className="size-3.5" />
        Sonic Collections
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-light-gray">
        <ListMusic className="size-3.5 text-primary" />
        {totalCount} {totalCount === 1 ? "Playlist" : "Playlists"}
      </span>
    </div>
  );
};

export default PlaylistHeroBadge;

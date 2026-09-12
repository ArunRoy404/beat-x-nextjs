"use client";

import React from "react";
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell";
import { Play, Pause, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDurationMs } from "@/lib/format/formatDuration";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import { useRemoveSongFromPlaylist } from "@/hooks/api/user/playlists";
import { cn } from "@/lib/utils";

function formatSeconds(ms) {
  if (!ms) return "--:--";
  const total = ms > 1000 ? Math.floor(ms / 1000) : Math.floor(ms);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

const PlaylistTrackRow = ({ track, index, tracks = [], playlistId }) => {
  const trackId = track?._id || track?.id;
  const { playSong, currentSongId, isPlaying } = usePlaySong();
  const { mutate: removeSong, isPending: isRemovePending } = useRemoveSongFromPlaylist();

  const isCurrentPlaying = trackId && trackId === currentSongId && isPlaying;
  const durationText = formatSeconds(track?.durationMs || track?.duration);

  return (
    <div className="group flex items-center justify-between gap-3 py-2.5 px-3 rounded-[8px] hover:bg-white/[0.03] transition-colors border-b border-white/[0.03] last:border-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Index / Play Toggle */}
        <div className="relative flex size-7 shrink-0 items-center justify-center">
          <span className="text-xs font-medium text-dark-gray group-hover:hidden">
            {index + 1}
          </span>
          <button
            type="button"
            onClick={() =>
              playSong(track, {
                queue: tracks.length > 0 ? tracks : [track],
                index,
              })
            }
            className={cn(
              "cursor-pointer text-secondary transition-transform active:scale-95",
              isCurrentPlaying ? "flex" : "hidden group-hover:flex"
            )}
            title={isCurrentPlaying ? "Pause" : "Play"}
          >
            {isCurrentPlaying ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Common Song Cell (Avatar + Title + Duration) */}
        <div className="min-w-0 flex-1">
          <CommonSongCell
            title={track?.title || "Untitled Track"}
            duration={track?.artist || track?.subtitle || "Unknown Artist"}
            cover={track?.coverUrl || track?.art}
          />
        </div>
      </div>

      {/* Duration & Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-[13px] font-normal text-light-gray/70">
          {durationText}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isRemovePending}
          onClick={() => removeSong({ playlistId, songId: trackId })}
          className="size-7 rounded-[6px] text-light-gray hover:text-red-error hover:bg-red-error/10 cursor-pointer"
          title="Remove from playlist"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default PlaylistTrackRow;

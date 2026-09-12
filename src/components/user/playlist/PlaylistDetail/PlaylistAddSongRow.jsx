"use client";

import React from "react";
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell";
import { Play, Pause, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import { useAddSongToPlaylist } from "@/hooks/api/user/playlists";
import { cn } from "@/lib/utils";

function formatSeconds(ms) {
  if (!ms) return "--:--";
  const total = ms > 1000 ? Math.floor(ms / 1000) : Math.floor(ms);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

const PlaylistAddSongRow = ({ song, isAlreadyAdded, playlistId }) => {
  const songId = song?._id || song?.id;
  const { playSong, currentSongId, isPlaying } = usePlaySong();
  const { mutate: addSong, isPending: isAddPending } = useAddSongToPlaylist();

  const isCurrentPlaying = songId && songId === currentSongId && isPlaying;
  const durationText = formatSeconds(song?.durationMs || song?.duration);

  return (
    <div className="group flex items-center justify-between gap-3 py-2 px-3 rounded-[8px] hover:bg-white/[0.03] transition-colors border-b border-white/[0.03] last:border-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Play preview trigger */}
        <button
          type="button"
          onClick={() => playSong(song)}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-secondary hover:bg-secondary/20 transition-all cursor-pointer active:scale-95",
            isCurrentPlaying && "bg-secondary/20"
          )}
          title={isCurrentPlaying ? "Pause preview" : "Play preview"}
        >
          {isCurrentPlaying ? (
            <Pause className="size-3.5 fill-current" />
          ) : (
            <Play className="size-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Common Song Cell */}
        <div className="min-w-0 flex-1">
          <CommonSongCell
            title={song?.title || "Untitled Track"}
            duration={song?.artist || song?.subtitle || "Unknown Artist"}
            cover={song?.coverUrl || song?.art}
          />
        </div>
      </div>

      {/* Duration & Add CTA */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[12px] text-light-gray/60 hidden sm:inline-block">
          {durationText}
        </span>

        {isAlreadyAdded ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-semibold text-secondary border border-secondary/20 select-none">
            <Check className="size-3 stroke-[2.5]" />
            <span>Added</span>
          </span>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isAddPending}
            onClick={() => addSong({ playlistId, songId })}
            className="h-7 px-3 rounded-full border-secondary/30 text-secondary hover:bg-secondary/15 cursor-pointer text-[12px] font-medium"
          >
            <Plus className="size-3 mr-0.5" />
            <span>Add</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlaylistAddSongRow;

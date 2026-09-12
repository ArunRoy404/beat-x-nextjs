"use client";

import React from "react";
import Image from "next/image";
import { Music, SquarePen, Play, Pause, ListMusic, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditPlaylistDialog from "@/components/dialogs/user/playlist/EditPlaylistDialog";
import { formatDurationMs } from "@/lib/format/formatDuration";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";

const PlaylistDetailHeader = ({ playlist, tracks = [] }) => {
  const { playSong, currentSongId, isPlaying } = usePlaySong();

  const title = playlist?.title || playlist?.name || "Untitled Playlist";
  const coverUrl =
    playlist?.coverUrl ||
    playlist?.art ||
    (tracks?.[0]?.coverUrl ?? null);

  const totalDurationMs = tracks.reduce((acc, t) => acc + (t?.durationMs || 0), 0);
  const firstSong = tracks?.[0];
  const isFirstPlaying =
    firstSong && (firstSong?._id === currentSongId || firstSong?.id === currentSongId) && isPlaying;

  const handlePlayAll = () => {
    if (firstSong) {
      playSong(firstSong, { queue: tracks, index: 0 });
    }
  };

  return (
    <div
      className="p-6 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
      style={{ background: "var(--modal-header-bg)" }}
    >
      <div className="flex items-start gap-5 min-w-0 flex-1">
        {/* Artwork */}
        <div className="relative w-[88px] h-[88px] rounded-[16px] bg-white/5 border border-white/10 overflow-hidden shrink-0 shadow-md">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="88px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary">
              <Music className="size-8" />
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-col justify-between min-h-[88px] pr-12 min-w-0 flex-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[20px] font-semibold text-whitetext truncate leading-tight">
                {title}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border bg-secondary/15 text-secondary border-secondary/20 capitalize select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                Personal Playlist
              </span>
            </div>
            <p className="text-[13px] font-normal text-light-gray">
              Curated by You
            </p>
          </div>

          {/* Stats & Play CTA */}
          <div className="flex items-center gap-6 mt-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-medium text-whitetext leading-tight flex items-center gap-1.5">
                <ListMusic className="size-3.5 text-secondary" />
                {tracks.length}
              </span>
              <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">
                Tracks
              </span>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-medium text-whitetext leading-tight flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                {totalDurationMs > 0 ? formatDurationMs(totalDurationMs) : "--"}
              </span>
              <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">
                Duration
              </span>
            </div>

            {tracks.length > 0 && (
              <>
                <div className="w-[1px] h-6 bg-white/10 hidden sm:block" />
                <Button
                  type="button"
                  variant="gradient"
                  size="sm"
                  onClick={handlePlayAll}
                  className="h-8 px-4 font-semibold text-button-text flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {isFirstPlaying ? (
                    <>
                      <Pause className="size-3.5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 fill-current" />
                      <span>Play All</span>
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Trigger placed to the left of the close button */}
      <div className="absolute top-5 right-16 z-50">
        <EditPlaylistDialog playlist={playlist}>
          <button
            type="button"
            className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
          >
            <SquarePen className="w-3.5 h-3.5" />
            Rename
          </button>
        </EditPlaylistDialog>
      </div>
    </div>
  );
};

export default PlaylistDetailHeader;

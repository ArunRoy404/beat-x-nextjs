"use client";

import Image from "next/image";
import { Play, Heart, Calendar, Music2, Eye, Disc3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommonPill from "@/components/shared/CommonPill";
import { useSongDetail } from "@/hooks/api/user/songs/useSongDetail";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import { useToggleLikeSong } from "@/hooks/api/user/songs/useToggleLikeSong";
import { cn } from "@/lib/utils";

const formatDuration = (ms) => {
  if (!ms || !Number.isFinite(ms)) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
};

const SongDetailModal = ({ song, open, onOpenChange }) => {
  const songId = song?._id || song?.id;
  const { data: songDetail, isLoading } = useSongDetail(open ? songId : null);
  const { playSong, isPending: isPlayingPending } = usePlaySong();
  const { toggleLike, isPending: isLikePending } = useToggleLikeSong();

  const activeSong = songDetail || song;
  const genreName = activeSong?.genre?.name || (typeof activeSong?.genre === "string" ? activeSong?.genre : null);
  const formattedDate = formatDate(activeSong?.publishedAt || activeSong?.createdAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden p-0 border border-white/10 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-whitetext">Song Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 p-6 pt-2">
          <div className="flex gap-4 items-center">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-[16px] bg-dark-accent">
              {activeSong?.coverUrl ? (
                <Image
                  src={activeSong.coverUrl}
                  alt={activeSong?.title || "Song Cover"}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-light-gray">
                  <Music2 className="size-8 text-secondary" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h3 className="truncate text-xl font-bold text-whitetext">
                {activeSong?.title || "Untitled"}
              </h3>
              <p className="truncate text-sm font-medium text-light-gray">
                {activeSong?.artist || activeSong?.subtitle || "Unknown Artist"}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {activeSong?.isFeatured && (
                  <CommonPill variant="filled" className="text-[10px] uppercase">
                    Featured
                  </CommonPill>
                )}
                {genreName && (
                  <CommonPill variant="glass" className="text-[10px] uppercase">
                    {genreName}
                  </CommonPill>
                )}
                {activeSong?.explicit && (
                  <CommonPill variant="glass" className="text-[10px] text-red-error uppercase">
                    Explicit
                  </CommonPill>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-[14px] bg-white/5 p-3.5 text-xs">
            <div className="flex items-center gap-2 text-light-gray">
              <Music2 className="size-4 text-secondary shrink-0" />
              <span className="truncate">Duration: {formatDuration(activeSong?.durationMs)}</span>
            </div>

            <div className="flex items-center gap-2 text-light-gray">
              <Eye className="size-4 text-secondary shrink-0" />
              <span className="truncate">Plays: {activeSong?.playCount ?? 0}</span>
            </div>

            <div className="flex items-center gap-2 text-light-gray">
              <Heart className="size-4 text-secondary shrink-0" />
              <span className="truncate">Likes: {activeSong?.likeCount ?? 0}</span>
            </div>

            {formattedDate && (
              <div className="flex items-center gap-2 text-light-gray">
                <Calendar className="size-4 text-secondary shrink-0" />
                <span className="truncate">{formattedDate}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isPlayingPending}
              onClick={() => {
                playSong(activeSong);
                onOpenChange(false);
              }}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-button-text transition-transform active:scale-95 disabled:opacity-50"
            >
              <Play className="size-4" fill="currentColor" />
              Play Track
            </button>

            <button
              type="button"
              disabled={isLikePending}
              onClick={() => songId && toggleLike(songId)}
              aria-label={activeSong?.isLiked ? "Unlike song" : "Like song"}
              className={cn(
                "flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 active:scale-95",
                activeSong?.isLiked && "border-red-error/40 text-red-error bg-red-error/10"
              )}
            >
              <Heart
                className={cn(
                  "size-5",
                  activeSong?.isLiked ? "fill-red-error text-red-error" : "text-whitetext"
                )}
              />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SongDetailModal;

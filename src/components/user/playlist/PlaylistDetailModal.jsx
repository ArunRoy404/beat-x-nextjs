"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  usePlaylistDetail,
  useAddSongToPlaylist,
  useRemoveSongFromPlaylist,
} from "@/hooks/api/user/playlists";
import { useBrowseSongs } from "@/hooks/api/user/songs/useBrowseSongs";
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong";
import {
  Music,
  Play,
  Pause,
  Trash2,
  Plus,
  Check,
  Search,
  ListMusic,
  Disc3,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatTrackTime(val) {
  if (!val) return "--:--";
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return "--:--";
  const totalSeconds = num > 1000 ? Math.floor(num / 1000) : Math.floor(num);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function PlaylistDetailModal({
  playlist,
  open,
  onOpenChange,
}) {
  const playlistId = playlist?._id || playlist?.id;
  const [activeTab, setActiveTab] = useState("tracks"); // "tracks" | "add_songs"
  const [songSearchQuery, setSongSearchQuery] = useState("");

  const { data: detailData, isLoading: isDetailLoading } = usePlaylistDetail(
    playlistId,
    {
      enabled: Boolean(playlistId && open),
      initialData: playlist,
    }
  );

  const rawDetail = detailData?.playlist || detailData?.data || detailData || playlist;
  const activePlaylist = (rawDetail && typeof rawDetail === "object" && "title" in rawDetail) ? rawDetail : (rawDetail?.data || rawDetail);
  const tracks = Array.isArray(activePlaylist?.songs) ? activePlaylist.songs : [];

  const { data: browseSongsData, isLoading: isBrowseSongsLoading } = useBrowseSongs({
    page: 1,
    limit: 50,
  });

  const allSongs =
    (Array.isArray(browseSongsData?.data?.data) ? browseSongsData.data.data : null) ??
    (Array.isArray(browseSongsData?.data) ? browseSongsData.data : null) ??
    (Array.isArray(browseSongsData?.songs) ? browseSongsData.songs : null) ??
    (Array.isArray(browseSongsData) ? browseSongsData : []);

  const addSongMutation = useAddSongToPlaylist();
  const removeSongMutation = useRemoveSongFromPlaylist();
  const { playSong, currentSongId, isPlaying } = usePlaySong();

  const playlistTitle = activePlaylist?.title || activePlaylist?.name || "Playlist";
  const coverUrl =
    activePlaylist?.coverUrl ||
    activePlaylist?.art ||
    (tracks?.[0]?.coverUrl ?? null);

  const filteredCatalogSongs = allSongs.filter((song) => {
    if (!songSearchQuery.trim()) return true;
    const q = songSearchQuery.toLowerCase();
    const songTitle = (song?.title || song?.name || "").toLowerCase();
    const artist = (song?.artist || song?.subtitle || "").toLowerCase();
    return songTitle.includes(q) || artist.includes(q);
  });

  const trackIdsInPlaylist = new Set(
    tracks.map((t) => t?._id || t?.id).filter(Boolean)
  );

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playSong(tracks[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-white/10 bg-dark-accent p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with Artwork & Action Info */}
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-secondary/15 via-dark-accent/90 to-dark-accent p-6 shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Artwork */}
            <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={playlistTitle}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary">
                  <Music className="size-10" />
                </div>
              )}
            </div>

            {/* Metadata & Quick Controls */}
            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Personal Playlist
              </span>
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-whitetext truncate">
                {playlistTitle}
              </DialogTitle>
              <div className="flex items-center gap-3 text-xs text-light-gray">
                <span className="flex items-center gap-1">
                  <Disc3 className="size-3.5 text-primary" />
                  {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
                </span>
                <span>•</span>
                <span>Created by You</span>
              </div>

              <div className="mt-3 flex items-center gap-2.5">
                <Button
                  type="button"
                  variant="gradient"
                  onClick={handlePlayAll}
                  disabled={tracks.length === 0}
                  className="h-9 px-4 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Play className="size-3.5 fill-current" />
                  <span>Play All</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab(activeTab === "tracks" ? "add_songs" : "tracks")}
                  className="h-9 px-4 rounded-xl border-white/20 text-whitetext hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  {activeTab === "tracks" ? (
                    <>
                      <Plus className="size-3.5 text-secondary" />
                      <span>Add Songs</span>
                    </>
                  ) : (
                    <>
                      <ListMusic className="size-3.5 text-secondary" />
                      <span>View Tracks ({tracks.length})</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-white/10 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab("tracks")}
              className={cn(
                "cursor-pointer px-4 py-2 text-xs font-semibold transition-all rounded-lg",
                activeTab === "tracks"
                  ? "bg-white/10 text-whitetext border-b-2 border-secondary"
                  : "text-light-gray hover:text-whitetext"
              )}
            >
              Tracks ({tracks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add_songs")}
              className={cn(
                "cursor-pointer px-4 py-2 text-xs font-semibold transition-all rounded-lg flex items-center gap-1.5",
                activeTab === "add_songs"
                  ? "bg-white/10 text-whitetext border-b-2 border-secondary"
                  : "text-light-gray hover:text-whitetext"
              )}
            >
              <Plus className="size-3.5" />
              <span>Explore & Add Songs</span>
            </button>
          </div>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-[320px]">
          {activeTab === "tracks" ? (
            /* Tracks Tab */
            tracks.length > 0 ? (
              <div className="flex flex-col divide-y divide-white/5">
                {tracks.map((track, idx) => {
                  const trackId = track?._id || track?.id;
                  const isThisPlaying =
                    trackId && trackId === currentSongId && isPlaying;
                  const trackCover =
                    track?.coverUrl || track?.art || "/assets/default-song.jpg";

                  return (
                    <div
                      key={trackId || idx}
                      className="group flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        {/* Index / Play Button */}
                        <div className="relative flex size-8 shrink-0 items-center justify-center">
                          <span className="text-xs font-medium text-light-gray/60 group-hover:hidden">
                            {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => playSong(track)}
                            className={cn(
                              "cursor-pointer text-secondary transition-all",
                              isThisPlaying ? "flex" : "hidden group-hover:flex"
                            )}
                          >
                            {isThisPlaying ? (
                              <Pause className="size-4 fill-current" />
                            ) : (
                              <Play className="size-4 fill-current ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Thumbnail */}
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                          {trackCover ? (
                            <Image
                              src={trackCover}
                              alt={track?.title || "Song cover"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-light-gray">
                              <Music className="size-4" />
                            </div>
                          )}
                        </div>

                        {/* Title & Artist */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span
                            className={cn(
                              "truncate text-sm font-semibold transition-colors",
                              isThisPlaying ? "text-secondary" : "text-whitetext"
                            )}
                          >
                            {track?.title || "Untitled Track"}
                          </span>
                          <span className="truncate text-xs text-light-gray">
                            {track?.artist || track?.subtitle || "Unknown Artist"}
                          </span>
                        </div>
                      </div>

                      {/* Duration & Remove */}
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs text-light-gray/70">
                          {formatTrackTime(track?.durationMs || track?.duration)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={removeSongMutation.isPending}
                          onClick={() =>
                            removeSongMutation.mutate({
                              playlistId,
                              songId: trackId,
                            })
                          }
                          className="size-8 rounded-lg text-light-gray hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                          title="Remove from playlist"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-light-gray">
                  <ListMusic className="size-7 text-secondary" />
                </div>
                <h4 className="mt-3 text-base font-semibold text-whitetext">
                  No tracks in this playlist yet
                </h4>
                <p className="mt-1 max-w-sm text-xs text-light-gray">
                  Discover platform songs and add them to build your custom playlist.
                </p>
                <Button
                  type="button"
                  variant="gradient"
                  onClick={() => setActiveTab("add_songs")}
                  className="mt-4 h-9 px-4 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>Browse Songs to Add</span>
                </Button>
              </div>
            )
          ) : (
            /* Add Songs Tab */
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-light-gray" />
                <Input
                  type="text"
                  placeholder="Search songs by title or artist..."
                  value={songSearchQuery}
                  onChange={(e) => setSongSearchQuery(e.target.value)}
                  className="h-10 pl-10 rounded-xl border-white/10 bg-black/40 text-whitetext placeholder:text-light-gray/60"
                />
              </div>

              {/* Song List */}
              {isBrowseSongsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner className="size-6 text-secondary" />
                </div>
              ) : filteredCatalogSongs.length > 0 ? (
                <div className="flex flex-col divide-y divide-white/5">
                  {filteredCatalogSongs.map((song) => {
                    const songId = song?._id || song?.id;
                    const isAlreadyAdded = trackIdsInPlaylist.has(songId);
                    const isThisPlaying =
                      songId && songId === currentSongId && isPlaying;
                    const songCover =
                      song?.coverUrl || song?.art || "/assets/default-song.jpg";

                    return (
                      <div
                        key={songId}
                        className="group flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {/* Play Preview */}
                          <button
                            type="button"
                            onClick={() => playSong(song)}
                            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-secondary hover:bg-secondary/20 transition-colors cursor-pointer"
                          >
                            {isThisPlaying ? (
                              <Pause className="size-4 fill-current" />
                            ) : (
                              <Play className="size-4 fill-current ml-0.5" />
                            )}
                          </button>

                          {/* Thumbnail */}
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                            {songCover ? (
                              <Image
                                src={songCover}
                                alt={song?.title || "Song"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-light-gray">
                                <Music className="size-4" />
                              </div>
                            )}
                          </div>

                          {/* Title & Artist */}
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="truncate text-sm font-semibold text-whitetext">
                              {song?.title || "Untitled Song"}
                            </span>
                            <span className="truncate text-xs text-light-gray">
                              {song?.artist || song?.subtitle || "Unknown Artist"}
                            </span>
                          </div>
                        </div>

                        {/* Add / Added Button */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-light-gray/60 hidden sm:inline-block">
                            {formatTrackTime(song?.durationMs || song?.duration)}
                          </span>

                          {isAlreadyAdded ? (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary">
                              <Check className="size-3.5 stroke-[2.5]" />
                              <span>Added</span>
                            </span>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={addSongMutation.isPending}
                              onClick={() =>
                                addSongMutation.mutate({
                                  playlistId,
                                  songId,
                                })
                              }
                              className="h-8 px-3 rounded-lg border-secondary/40 text-secondary hover:bg-secondary/15 cursor-pointer font-medium"
                            >
                              <Plus className="size-3.5" />
                              <span>Add</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-light-gray">
                  <p className="text-sm">No songs match "{songSearchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

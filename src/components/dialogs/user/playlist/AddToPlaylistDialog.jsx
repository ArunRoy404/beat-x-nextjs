"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListPlus, Search, Music2, Plus, Loader2 } from "lucide-react";
import { useMyPlaylists, useAddSongToPlaylist } from "@/hooks/api/user/playlists";
import CreatePlaylistDialog from "./CreatePlaylistDialog";
import AddToPlaylistTrackPreview from "./AddToPlaylistTrackPreview";
import AddToPlaylistItem from "./AddToPlaylistItem";

/**
 * Composite dialog for adding a track to a user playlist.
 * Assembled from atomic track preview and playlist item components.
 */
const AddToPlaylistDialog = ({ open, onOpenChange, song }) => {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [addingPlaylistId, setAddingPlaylistId] = useState(null);

  const { data: playlistsData, isLoading } = useMyPlaylists({ page: 1, limit: 50 });
  const { mutate: addSong, isPending } = useAddSongToPlaylist({
    onSuccess: () => {
      setAddingPlaylistId(null);
      onOpenChange?.(false);
    },
    onError: () => {
      setAddingPlaylistId(null);
    },
  });

  const rawPlaylists =
    (Array.isArray(playlistsData?.data?.data) ? playlistsData.data.data : null) ??
    (Array.isArray(playlistsData?.data) ? playlistsData.data : null) ??
    (Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : null) ??
    (Array.isArray(playlistsData) ? playlistsData : []);

  const playlists = Array.isArray(rawPlaylists) ? rawPlaylists : [];

  const filteredPlaylists = playlists.filter((pl) => {
    if (!search.trim()) return true;
    const title = (pl?.title || pl?.name || "").toLowerCase();
    return title.includes(search.toLowerCase());
  });

  const songId = song?._id || song?.id;
  const songTitle = song?.title || "Selected Song";
  const songArtist = song?.artist || song?.subtitle || "Unknown Artist";
  const songCover = song?.coverUrl || song?.art;

  const handleAddToPlaylist = (playlist) => {
    const playlistId = playlist?._id || playlist?.id;
    if (!playlistId || !songId) return;
    setAddingPlaylistId(playlistId);
    addSong({ playlistId, songId });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border border-white/10 bg-dark-accent/95 backdrop-blur-xl">
          <DialogHeader className="p-6 pb-4 border-b border-white/5">
            <DialogTitle className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
                <ListPlus className="size-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-semibold text-whitetext leading-tight">
                  Add to Playlist
                </span>
                <span className="text-xs text-light-gray font-normal mt-0.5">
                  Choose a playlist to save this track
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Atomic Selected Track Preview Banner */}
          <AddToPlaylistTrackPreview
            title={songTitle}
            artist={songArtist}
            coverUrl={songCover}
          />

          <div className="p-6 pt-4 flex flex-col gap-4">
            {/* Search Filter Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-light-gray" />
              <input
                type="text"
                placeholder="Find a playlist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-[8px] bg-white/5 border border-white/10 text-sm text-whitetext placeholder:text-light-gray/60 focus:outline-none focus:border-secondary/50 transition-colors"
              />
            </div>

            {/* Playlists List */}
            <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-8 text-light-gray">
                  <Loader2 className="size-6 animate-spin text-secondary" />
                </div>
              ) : filteredPlaylists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center text-light-gray">
                  <Music2 className="size-8 text-white/20 mb-2" />
                  <p className="text-sm font-medium text-whitetext">
                    {search ? "No matching playlists found" : "No playlists yet"}
                  </p>
                  <p className="text-xs text-light-gray mt-0.5">
                    {search ? "Try searching another title" : "Create your first playlist to get started"}
                  </p>
                </div>
              ) : (
                filteredPlaylists.map((pl) => (
                  <AddToPlaylistItem
                    key={pl?._id || pl?.id}
                    playlist={pl}
                    isAdding={addingPlaylistId === (pl?._id || pl?.id) && isPending}
                    isDisabled={isPending}
                    onSelect={handleAddToPlaylist}
                  />
                ))
              )}
            </div>

            {/* Action: Create New Playlist Shortcut */}
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[8px] border border-dashed border-white/20 hover:border-secondary/40 bg-white/[0.02] hover:bg-secondary/5 text-sm font-medium text-whitetext hover:text-secondary transition-all cursor-pointer"
              >
                <Plus className="size-4" />
                <span>Create New Playlist</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Nested Create Playlist Dialog */}
      <CreatePlaylistDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </>
  );
};

export default AddToPlaylistDialog;

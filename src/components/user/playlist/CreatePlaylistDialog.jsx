"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreatePlaylist } from "@/hooks/api/user/playlists";
import { Music, Plus } from "lucide-react";

export default function CreatePlaylistDialog({ open, onOpenChange }) {
  const [title, setTitle] = useState("");
  const createMutation = useCreatePlaylist({
    onSuccess: () => {
      setTitle("");
      onOpenChange(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    createMutation.mutate({ title: trimmed });
  };

  const handleOpenChange = (newOpen) => {
    if (!createMutation.isPending) {
      if (!newOpen) setTitle("");
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-dark-accent p-0 overflow-hidden">
        <DialogHeader className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Music className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-whitetext">
                Create New Playlist
              </DialogTitle>
              <DialogDescription className="text-xs text-light-gray mt-1">
                Give your soundscape a title to get started.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="playlist-title"
                className="text-xs font-medium text-light-gray flex items-center justify-between"
              >
                <span>Playlist Name</span>
                <span className="text-[10px] text-light-gray/60">{title.length}/100</span>
              </label>
              <Input
                id="playlist-title"
                type="text"
                placeholder="e.g., Midnight Melodies, Focus Flow..."
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                disabled={createMutation.isPending}
                className="h-11 rounded-xl border-white/15 bg-black/40 text-whitetext placeholder:text-light-gray/50 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary"
                autoFocus
              />
            </div>
          </div>

          <DialogFooter className="border-t border-white/10 bg-black/20 p-4 sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={createMutation.isPending}
              className="h-9 px-4 rounded-xl border-white/20 text-whitetext hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={!title.trim() || createMutation.isPending}
              className="h-9 px-5 rounded-xl font-semibold flex items-center gap-2"
            >
              {createMutation.isPending ? (
                <>
                  <Spinner className="size-3.5" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>Create Playlist</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

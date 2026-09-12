"use client";

import React, { useState, useEffect } from "react";
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
import { useUpdatePlaylist } from "@/hooks/api/user/playlists";
import { Edit3, Check } from "lucide-react";

export default function EditPlaylistDialog({ playlist, open, onOpenChange }) {
  const playlistId = playlist?._id || playlist?.id;
  const initialTitle = playlist?.title || playlist?.name || "";
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
    }
  }, [open, initialTitle]);

  const updateMutation = useUpdatePlaylist({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || !playlistId) return;
    updateMutation.mutate({ id: playlistId, title: trimmed });
  };

  const handleOpenChange = (newOpen) => {
    if (!updateMutation.isPending) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-dark-accent p-0 overflow-hidden">
        <DialogHeader className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Edit3 className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-whitetext">
                Edit Playlist Title
              </DialogTitle>
              <DialogDescription className="text-xs text-light-gray mt-1">
                Rename your playlist across all your devices.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="edit-playlist-title"
                className="text-xs font-medium text-light-gray flex items-center justify-between"
              >
                <span>Playlist Name</span>
                <span className="text-[10px] text-light-gray/60">{title.length}/100</span>
              </label>
              <Input
                id="edit-playlist-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                disabled={updateMutation.isPending}
                className="h-11 rounded-xl border-white/15 bg-black/40 text-whitetext placeholder:text-light-gray/50 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                autoFocus
              />
            </div>
          </div>

          <DialogFooter className="border-t border-white/10 bg-black/20 p-4 sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateMutation.isPending}
              className="h-9 px-4 rounded-xl border-white/20 text-whitetext hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={!title.trim() || updateMutation.isPending}
              className="h-9 px-5 rounded-xl font-semibold flex items-center gap-2"
            >
              {updateMutation.isPending ? (
                <>
                  <Spinner className="size-3.5" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="size-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

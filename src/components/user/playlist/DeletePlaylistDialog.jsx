"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePlaylist } from "@/hooks/api/user/playlists";
import { Trash2, AlertTriangle } from "lucide-react";

export default function DeletePlaylistDialog({ playlist, open, onOpenChange }) {
  const playlistId = playlist?._id || playlist?.id;
  const playlistTitle = playlist?.title || playlist?.name || "this playlist";

  const deleteMutation = useDeletePlaylist({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleDelete = () => {
    if (!playlistId) return;
    deleteMutation.mutate(playlistId);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !deleteMutation.isPending && onOpenChange(v)}>
      <DialogContent className="max-w-md border-white/10 bg-dark-accent p-0 overflow-hidden">
        <DialogHeader className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-whitetext">
                Delete Playlist
              </DialogTitle>
              <DialogDescription className="text-xs text-light-gray mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 text-sm text-light-gray">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-whitetext">"{playlistTitle}"</span>? All
          custom track associations in this playlist will be removed.
        </div>

        <DialogFooter className="border-t border-white/10 bg-black/20 p-4 sm:flex-row sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
            className="h-9 px-4 rounded-xl border-white/20 text-whitetext hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="h-9 px-5 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
          >
            {deleteMutation.isPending ? (
              <>
                <Spinner className="size-3.5" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                <span>Delete Playlist</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

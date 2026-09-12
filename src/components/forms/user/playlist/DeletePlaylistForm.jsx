"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useDeletePlaylist } from "@/hooks/api/user/playlists";

const DeletePlaylistForm = ({ playlist, onSuccess, onCancel }) => {
  const playlistId = playlist?._id || playlist?.id;
  const playlistTitle = playlist?.title || playlist?.name || "this playlist";
  const { mutate: deletePlaylist, isPending } = useDeletePlaylist();

  const handleDelete = () => {
    if (!playlistId) return;
    deletePlaylist(playlistId, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
      <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
        You are about to permanently delete{" "}
        <span className="text-whitetext font-semibold">"{playlistTitle}"</span>.
        All tracks associated with this playlist will be detached, not deleted from the
        platform. This action cannot be undone.
      </p>

      <div className="flex items-center gap-4 mt-2 shrink-0">
        <DialogClose asChild className="flex-1 w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full h-[52px]!"
            size="lg"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="button"
          className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white flex items-center justify-center gap-2 border-0 h-[52px]! cursor-pointer"
          size="lg"
          onClick={handleDelete}
          isLoading={isPending}
        >
          <Trash2 className="w-4 h-4" /> Delete Playlist
        </Button>
      </div>
    </div>
  );
};

export default DeletePlaylistForm;

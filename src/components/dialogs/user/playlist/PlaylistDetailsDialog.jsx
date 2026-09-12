"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { usePlaylistDetail } from "@/hooks/api/user/playlists";
import PlaylistDetailHeader from "@/components/user/playlist/PlaylistDetail/PlaylistDetailHeader";
import PlaylistDetailsTabs from "@/components/user/playlist/PlaylistDetail/PlaylistDetailsTabs";
import PlaylistDetailFooter from "@/components/user/playlist/PlaylistDetail/PlaylistDetailFooter";

const PlaylistDetailsDialog = ({
  playlist: summary,
  open: controlledOpen,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const playlistId = summary?._id || summary?.id;
  const { data: detailData, isLoading } = usePlaylistDetail(open ? playlistId : undefined, {
    enabled: Boolean(open && playlistId),
  });

  const rawDetail = detailData?.playlist || detailData?.data || detailData || summary;
  const playlist =
    rawDetail && typeof rawDetail === "object" && "title" in rawDetail
      ? rawDetail
      : rawDetail?.data || rawDetail || summary;

  const tracks = Array.isArray(playlist?.songs) ? playlist.songs : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
        <DialogTitle className="sr-only">
          Playlist Details - {playlist?.title || "Playlist"}
        </DialogTitle>

        {isLoading && !detailData ? (
          <div className="flex items-center justify-center py-24">
            <Spinner className="size-6 text-secondary" />
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <PlaylistDetailHeader playlist={playlist} tracks={tracks} />

            {/* Switchable Tabs between Tracks & Add Songs */}
            <PlaylistDetailsTabs playlist={playlist} tracks={tracks} />

            {/* Footer with Delete and Close buttons */}
            <PlaylistDetailFooter
              playlist={playlist}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistDetailsDialog;

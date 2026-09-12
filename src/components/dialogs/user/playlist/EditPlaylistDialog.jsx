"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3 } from "lucide-react";
import EditPlaylistForm from "@/components/forms/user/playlist/EditPlaylistForm";

const EditPlaylistDialog = ({ playlist, open: controlledOpen, onOpenChange, children }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <span className="text-[20px] font-semibold leading-none">
              Edit Playlist
            </span>
          </DialogTitle>
        </DialogHeader>

        <EditPlaylistForm
          playlist={playlist}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPlaylistDialog;

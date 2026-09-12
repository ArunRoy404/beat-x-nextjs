"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListMusic } from "lucide-react";
import CreatePlaylistForm from "@/components/forms/user/playlist/CreatePlaylistForm";

const CreatePlaylistDialog = ({ open: controlledOpen, onOpenChange, children }) => {
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
            <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
              <ListMusic className="w-5 h-5" />
            </div>
            <span className="text-[20px] font-semibold leading-none">
              Create New Playlist
            </span>
          </DialogTitle>
        </DialogHeader>

        <CreatePlaylistForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistDialog;

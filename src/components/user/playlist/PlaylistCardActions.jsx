"use client";

import React from "react";
import { MoreVertical, ListMusic, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PlaylistCardActions = ({ onViewDetails, onEdit, onDelete }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex size-7 items-center justify-center rounded-full text-light-gray hover:bg-white/10 hover:text-whitetext transition-colors cursor-pointer outline-none">
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-48 rounded-[8px] border border-white/10 bg-dark-accent/95 p-1.5 backdrop-blur-md shadow-xl"
        >
          <DropdownMenuItem
            onClick={onViewDetails}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-whitetext hover:bg-white/10 cursor-pointer"
          >
            <ListMusic className="size-4 text-secondary" />
            <span>View & Add Songs</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-whitetext hover:bg-white/10 cursor-pointer"
          >
            <Edit2 className="size-4 text-primary" />
            <span>Rename Playlist</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-[13px] text-red-error hover:bg-red-error/10 cursor-pointer"
          >
            <Trash2 className="size-4" />
            <span>Delete Playlist</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PlaylistCardActions;

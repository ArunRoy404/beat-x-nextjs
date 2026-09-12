"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlaylistHeroAction = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="gradient"
      className="h-11 shrink-0 px-6 font-semibold flex items-center gap-2 text-button-text shadow-lg shadow-secondary/20 hover:shadow-secondary/30 cursor-pointer"
    >
      <Plus className="size-4 stroke-[2.5]" />
      <span>Create Playlist</span>
    </Button>
  );
};

export default PlaylistHeroAction;

"use client";

import React from "react";
import { Plus, ListMusic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaylistHeroBanner({ totalCount = 0, onCreateClick }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-dark-accent/60 p-6 md:p-8 backdrop-blur-md shadow-2xl">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex max-w-2xl flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <Sparkles className="size-3.5" />
              Sonic Collections
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-light-gray">
              <ListMusic className="size-3.5 text-primary" />
              {totalCount} {totalCount === 1 ? "Playlist" : "Playlists"}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-whitetext sm:text-3xl lg:text-4xl">
            Your Playlists
          </h1>
          <p className="text-sm text-light-gray sm:text-base leading-relaxed">
            Craft, curate, and listen to your personalized soundscapes. Organize your favorite
            tracks for any vibe, moment, or atmosphere.
          </p>
        </div>

        <Button
          onClick={onCreateClick}
          variant="gradient"
          className="h-11 shrink-0 px-6 font-semibold flex items-center gap-2 text-button-text shadow-lg shadow-secondary/20 hover:shadow-secondary/30 cursor-pointer"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>Create Playlist</span>
        </Button>
      </div>
    </div>
  );
}

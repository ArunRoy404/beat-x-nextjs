"use client";

import React from "react";
import PlaylistHeroBadge from "./PlaylistHero/PlaylistHeroBadge";
import PlaylistHeroContent from "./PlaylistHero/PlaylistHeroContent";
import PlaylistHeroAction from "./PlaylistHero/PlaylistHeroAction";

const PlaylistHeroBanner = ({ totalCount = 0, onCreateClick }) => {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-dark-accent/60 p-6 md:p-8 backdrop-blur-md shadow-2xl">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex max-w-2xl flex-col gap-2.5">
          <PlaylistHeroBadge totalCount={totalCount} />
          <PlaylistHeroContent />
        </div>

        <PlaylistHeroAction onClick={onCreateClick} />
      </div>
    </div>
  );
};

export default PlaylistHeroBanner;

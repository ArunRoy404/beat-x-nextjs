import React from "react";

const PlaylistHeroContent = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="text-2xl font-bold tracking-tight text-whitetext sm:text-3xl lg:text-4xl">
        Your Playlists
      </h1>
      <p className="text-sm text-light-gray sm:text-base leading-relaxed max-w-2xl">
        Craft, curate, and listen to your personalized soundscapes. Organize your favorite
        tracks for any vibe, moment, or atmosphere.
      </p>
    </div>
  );
};

export default PlaylistHeroContent;

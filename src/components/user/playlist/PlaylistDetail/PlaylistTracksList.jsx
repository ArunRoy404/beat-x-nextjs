"use client";

import React from "react";
import PlaylistTrackRow from "./PlaylistTrackRow";
import PlaylistTracksEmptyState from "./PlaylistTracksEmptyState";

const PlaylistTracksList = ({ tracks = [], playlistId, onAddSongsClick }) => {
  if (!tracks || tracks.length === 0) {
    return <PlaylistTracksEmptyState onAddSongsClick={onAddSongsClick} />;
  }

  return (
    <div className="flex flex-col gap-0.5">
      {tracks.map((track, idx) => (
        <PlaylistTrackRow
          key={track?._id || track?.id || idx}
          track={track}
          index={idx}
          tracks={tracks}
          playlistId={playlistId}
        />
      ))}
    </div>
  );
};

export default PlaylistTracksList;

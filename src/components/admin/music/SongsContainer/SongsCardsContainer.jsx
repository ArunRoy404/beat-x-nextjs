import React from "react"
import SongsCard from "./SongsCard"

const SongsCardsContainer = ({ songs = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            {songs.map((song) => (
                <SongsCard key={song._id} song={song} />
            ))}
        </div>
    )
}

export default SongsCardsContainer
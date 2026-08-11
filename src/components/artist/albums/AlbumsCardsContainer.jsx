import React from "react"
import AlbumCard from "./AlbumCard"

const AlbumsCardsContainer = ({ albums = [] }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    )
}

export default AlbumsCardsContainer

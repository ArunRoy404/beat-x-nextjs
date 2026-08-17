import React from "react"
import AlbumsCard from "./AlbumsCard"

const AlbumsCardsContainer = ({ albums = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            {albums.map((album) => (
                <AlbumsCard key={album._id} album={album} />
            ))}
        </div>
    )
}

export default AlbumsCardsContainer

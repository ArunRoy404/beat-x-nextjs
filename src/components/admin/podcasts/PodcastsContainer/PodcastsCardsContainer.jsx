import React from "react"
import PodcastsCard from "./PodcastsCard"

const PodcastsCardsContainer = ({ podcasts = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            {podcasts.map((podcast) => (
                <PodcastsCard key={podcast._id} podcast={podcast} />
            ))}
        </div>
    )
}

export default PodcastsCardsContainer

import React from "react"
import EventsCard from "./EventsCard"

const EventsCardsContainer = ({ events = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            {events.map((event) => (
                <EventsCard key={event.id || event.title} event={event} />
            ))}
        </div>
    )
}

export default EventsCardsContainer

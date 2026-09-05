import React from "react"
import EventsCard from "./EventsCard"

const EventsCardsContainer = ({ events = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            {events.map((event, idx) => (
                <EventsCard key={event._id || event.id || idx} event={event} />
            ))}
        </div>
    )
}

export default EventsCardsContainer

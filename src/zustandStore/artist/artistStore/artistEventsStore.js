import { create } from "zustand"
import {
  eventsStatsCards,
  eventsList
} from "@/dummyData/artist/artistData/artistEventsData"

export const useArtistEventsStore = create((set) => ({
  eventsStatsCards: eventsStatsCards,
  eventsList: eventsList,
  addEvent: (newEvent) => set((state) => ({
    eventsList: [
      {
        id: state.eventsList.length + 1,
        title: newEvent.eventTitle,
        artist: "TAHSIN",
        genre: "General",
        venue: newEvent.venue,
        city: newEvent.city,
        eventDate: newEvent.eventDate ? newEvent.eventDate.toISOString().split('T')[0] : "-",
        eventTime: newEvent.eventTime || "-",
        ticketPrice: Number(newEvent.ticketPrice) || 0,
        totalTickets: Number(newEvent.totalTickets) || 0,
        ticketsSold: 0,
        revenue: "0.0k",
        status: newEvent.visibility === "publish" || newEvent.visibility === "schedule"
          ? "Upcoming"
          : "Draft",
        cover: newEvent.coverImage && typeof newEvent.coverImage === "object"
          ? URL.createObjectURL(newEvent.coverImage)
          : "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=400",
        description: newEvent.description || ""
      },
      ...state.eventsList
    ]
  })),
  updateEvent: (id, updatedEvent) => set((state) => ({
    eventsList: state.eventsList.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          title: updatedEvent.eventTitle,
          venue: updatedEvent.venue,
          city: updatedEvent.city,
          eventDate: updatedEvent.eventDate
            ? (updatedEvent.eventDate instanceof Date
              ? updatedEvent.eventDate.toISOString().split('T')[0]
              : updatedEvent.eventDate)
            : "-",
          eventTime: updatedEvent.eventTime || event.eventTime,
          ticketPrice: Number(updatedEvent.ticketPrice) || event.ticketPrice,
          totalTickets: Number(updatedEvent.totalTickets) || event.totalTickets,
          status: updatedEvent.visibility === "publish" || updatedEvent.visibility === "schedule"
            ? "Upcoming"
            : "Draft",
          cover: updatedEvent.coverImage && typeof updatedEvent.coverImage === "object"
            ? URL.createObjectURL(updatedEvent.coverImage)
            : (updatedEvent.coverImage || event.cover),
          description: updatedEvent.description
        }
      }
      return event
    })
  })),
  deleteEvent: (id) => set((state) => ({
    eventsList: state.eventsList.filter((event) => event.id !== id)
  }))
}))

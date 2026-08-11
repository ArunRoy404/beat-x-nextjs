import { z } from "zod"

export const uploadEventSchema = z.object({
  coverImage: z.any().refine((file) => file !== null, {
    message: "Event cover image is required",
  }),
  eventTitle: z.string().min(1, "Event title is required"),
  venue: z.string().min(1, "Venue is required"),
  city: z.string().min(1, "City is required"),
  eventDate: z.date({
    required_error: "Event date is required",
    invalid_type_error: "Event date is required",
  }),
  eventTime: z.string().min(1, "Event time is required"),
  ticketPrice: z.string().min(1, "Ticket price is required"),
  totalTickets: z.string().min(1, "Total tickets is required"),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
})

export const editEventSchema = z.object({
  coverImage: z.any().optional(),
  eventTitle: z.string().min(1, "Event title is required"),
  venue: z.string().min(1, "Venue is required"),
  city: z.string().min(1, "City is required"),
  eventDate: z.date({
    required_error: "Event date is required",
    invalid_type_error: "Event date is required",
  }),
  eventTime: z.string().min(1, "Event time is required"),
  ticketPrice: z.string().min(1, "Ticket price is required"),
  totalTickets: z.string().min(1, "Total tickets is required"),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
})

export const uploadEventDefaultValues = {
  coverImage: null,
  eventTitle: "",
  venue: "",
  city: "",
  eventDate: null,
  eventTime: "",
  ticketPrice: "",
  totalTickets: "",
  description: "",
  visibility: "publish",
}

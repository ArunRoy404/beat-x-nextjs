import { axiosPrivate } from "@/lib/axios/axiosPrivate"

/**
 * Fetch admin events/tours dashboard statistics.
 * GET /admin/events/dashboard
 */
export async function getEventsDashboardStatsRequest() {
  const res = await axiosPrivate.get("/admin/events/dashboard")
  return res?.data?.data ?? res?.data
}

/**
 * Fetch events list with optional query parameters (page, limit, q, status, etc.).
 * GET /admin/events
 */
export async function getEventsRequest(params) {
  const res = await axiosPrivate.get("/admin/events", { params })
  return res?.data?.data ?? res?.data
}

/**
 * Fetch single event detail.
 * GET /admin/events/:eventId
 */
export async function getEventDetailRequest(eventId) {
  if (!eventId) return null
  const res = await axiosPrivate.get(`/admin/events/${eventId}`)
  return res?.data?.data ?? res?.data
}

/**
 * Fetch event analytics.
 * GET /admin/events/:eventId/analytics
 */
export async function getEventAnalyticsRequest(eventId) {
  if (!eventId) return null
  const res = await axiosPrivate.get(`/admin/events/${eventId}/analytics`)
  return res?.data?.data ?? res?.data
}

/**
 * Create a new event.
 * POST /creator/events
 * Body: FormData (title, venue, city, eventDate, eventTime, ticketPrice, totalTickets, description, status, ownerId, cover)
 */
export async function createEventRequest(data) {
  let body = data
  let headers = {}
  if (data instanceof FormData) {
    body = data
    headers = { "Content-Type": "multipart/form-data" }
  }
  const res = await axiosPrivate.post("/creator/events", body, { headers })
  return res?.data?.data ?? res?.data
}

/**
 * Update an existing event.
 * PATCH /admin/events/:eventId
 */
export async function updateEventRequest(param1, param2) {
  let eventId
  let data

  if (typeof param1 === "object" && param1 !== null && !(param1 instanceof FormData)) {
    eventId = param1.eventId || param1.id
    data = param1.data || param1.body
  } else {
    eventId = param1
    data = param2
  }

  if (!eventId) {
    throw new Error("Event ID is required for update")
  }

  const res = await axiosPrivate.patch(`/admin/events/${eventId}`, data)
  return res?.data?.data ?? res?.data
}

/**
 * Delete an event.
 * DELETE /admin/events/:eventId
 */
export async function deleteEventRequest(eventId) {
  const res = await axiosPrivate.delete(`/admin/events/${eventId}`)
  return res?.data?.data ?? res?.data
}


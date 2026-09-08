import { format, isValid, parseISO } from "date-fns"

/**
 * Formats an API date string for display. Returns the empty-state marker
 * rather than a guessed date whenever the value is missing or unparseable.
 */
export function formatDateTime(value, pattern = "d MMM yyyy, h:mm a") {
  if (!value) return "-"

  const parsed = typeof value === "string" ? parseISO(value) : new Date(value)
  return isValid(parsed) ? format(parsed, pattern) : "-"
}

export function formatDate(value) {
  return formatDateTime(value, "d MMM yyyy")
}

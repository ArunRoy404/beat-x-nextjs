export function formatDurationMs(ms) {
  if (!ms) return "0m"

  const totalMinutes = Math.round(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

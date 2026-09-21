// Deliberately NOT "use client" — the SSR page.jsx (Server Component) reaches
// this through buildSongsParams, so it has to stay importable from both sides.

/**
 * Canonical song `status` values written back to the API.
 *
 * The docs are inconsistent about the "live" value: SongDetailResponseDto
 * documents `status: "active"` (the only song-specific example in the spec)
 * while SongAdminStatsDto labels the same bucket `published` and mixed
 * content feeds (DashboardRecentUploadDto) echo `published` back. The sibling
 * admin albums module — already integrated against this backend — writes
 * `active`/`archived`, so `active` is what we send; `published` is accepted on
 * the way in as a synonym. If the backend turns out to want `published`,
 * flipping SONG_STATUS.ACTIVE here is the only change needed.
 */
export const SONG_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  PENDING: "pending",
  REJECTED: "rejected",
}

// Only spellings the API actually uses are listed — nothing invented.
// Confirmed against the Postman collection's documented enum for
// GET/PATCH /admin/songs: draft | pending_review | scheduled | active |
// archived | rejected — "pending_review" is the real wire value for the
// PENDING bucket, not "pending".
const SONG_STATUS_ALIASES = {
  active: SONG_STATUS.ACTIVE,
  published: SONG_STATUS.ACTIVE,
  draft: SONG_STATUS.DRAFT,
  scheduled: SONG_STATUS.SCHEDULED,
  archived: SONG_STATUS.ARCHIVED,
  pending: SONG_STATUS.PENDING,
  pending_review: SONG_STATUS.PENDING,
  awaitingapproval: SONG_STATUS.PENDING,
  rejected: SONG_STATUS.REJECTED,
}

export const SONG_STATUS_LABELS = {
  [SONG_STATUS.ACTIVE]: "Active",
  [SONG_STATUS.DRAFT]: "Draft",
  [SONG_STATUS.SCHEDULED]: "Scheduled",
  [SONG_STATUS.ARCHIVED]: "Archived",
  [SONG_STATUS.PENDING]: "Pending",
  [SONG_STATUS.REJECTED]: "Rejected",
}

/**
 * Folds every spelling the API returns onto one canonical value so badges,
 * filters and row actions all key off the same string. Unknown values pass
 * through lowercased rather than being coerced into a guess.
 */
export function normalizeSongStatus(status) {
  if (!status || typeof status !== "string") return ""
  const key = status.trim().toLowerCase()
  return SONG_STATUS_ALIASES[key] ?? key
}

/**
 * Reverses normalizeSongStatus for values being sent back to the API (e.g.
 * the list filter's `status` query param). Every bucket's wire spelling
 * matches its canonical value except PENDING, whose wire value is
 * "pending_review" — use this instead of sending a canonical status as-is.
 */
export function toApiSongStatus(canonicalStatus) {
  return canonicalStatus === SONG_STATUS.PENDING ? "pending_review" : canonicalStatus
}

/**
 * Review state lives on `submittedStatus` (the Song schema keeps it separate
 * from `status`), so a live song can still have a pending re-submission.
 */
export function isSongAwaitingReview(song) {
  return (
    normalizeSongStatus(song?.status) === SONG_STATUS.PENDING ||
    normalizeSongStatus(song?.submittedStatus) === SONG_STATUS.PENDING
  )
}

// Deliberately NOT "use client" — importable from Server Components too,
// mirrors the pattern in songStatus.js / videoStatus.js.

/**
 * Canonical podcast `status` values, confirmed against the Postman
 * collection's documented enum for PATCH /admin/podcasts: draft |
 * pending_review | scheduled | active | archived | rejected.
 */
export const PODCAST_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  PENDING: "pending",
  REJECTED: "rejected",
}

// Only spellings the API actually uses are listed — nothing invented.
// "pending_review" is the real wire value for the PENDING bucket, not
// "pending" (same asymmetry as songStatus.js / videoStatus.js).
const PODCAST_STATUS_ALIASES = {
  active: PODCAST_STATUS.ACTIVE,
  published: PODCAST_STATUS.ACTIVE,
  draft: PODCAST_STATUS.DRAFT,
  scheduled: PODCAST_STATUS.SCHEDULED,
  archived: PODCAST_STATUS.ARCHIVED,
  pending: PODCAST_STATUS.PENDING,
  pending_review: PODCAST_STATUS.PENDING,
  rejected: PODCAST_STATUS.REJECTED,
}

export const PODCAST_STATUS_LABELS = {
  [PODCAST_STATUS.ACTIVE]: "Active",
  [PODCAST_STATUS.DRAFT]: "Draft",
  [PODCAST_STATUS.SCHEDULED]: "Scheduled",
  [PODCAST_STATUS.ARCHIVED]: "Archived",
  [PODCAST_STATUS.PENDING]: "Pending",
  [PODCAST_STATUS.REJECTED]: "Rejected",
}

export const PODCAST_STATUS_COLORS = {
  [PODCAST_STATUS.ACTIVE]: "bg-green-success/15 text-green-success border-green-success/20",
  [PODCAST_STATUS.DRAFT]: "bg-white/[0.05] text-light-gray border-white/10",
  [PODCAST_STATUS.SCHEDULED]: "bg-[#CC97FF]/15 text-[#CC97FF] border-[#CC97FF]/20",
  [PODCAST_STATUS.ARCHIVED]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
  [PODCAST_STATUS.PENDING]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
  [PODCAST_STATUS.REJECTED]: "bg-red-error/15 text-red-error border-red-error/20",
}

/**
 * Folds every spelling the API returns onto one canonical value so badges,
 * filters and row actions all key off the same string. Unknown values pass
 * through lowercased rather than being coerced into a guess.
 */
export function normalizePodcastStatus(status) {
  if (!status || typeof status !== "string") return ""
  const key = status.trim().toLowerCase()
  return PODCAST_STATUS_ALIASES[key] ?? key
}

/**
 * Reverses normalizePodcastStatus for values sent back to the API (e.g. the
 * list filter's `status` query param). Every bucket's wire spelling matches
 * its canonical value except PENDING, whose wire value is "pending_review".
 */
export function toApiPodcastStatus(canonicalStatus) {
  return canonicalStatus === PODCAST_STATUS.PENDING ? "pending_review" : canonicalStatus
}

/**
 * Admin-created content publishes with no approval step — only a real
 * artist submission (status: "pending_review") is awaiting review. A
 * "draft" is just the admin's own unpublished upload, not a moderation
 * queue item, so it must NOT be treated as awaiting review.
 */
export function isPodcastAwaitingReview(podcast) {
  return normalizePodcastStatus(podcast?.status) === PODCAST_STATUS.PENDING
}

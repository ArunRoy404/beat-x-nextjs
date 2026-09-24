// Deliberately NOT "use client" — importable from Server Components too,
// mirrors the pattern in songStatus.js.

/**
 * Canonical video `status` values, confirmed against the Postman collection's
 * documented enum for GET/PATCH /admin/videos: draft | pending_review |
 * scheduled | active | archived | rejected.
 */
export const VIDEO_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  PENDING: "pending",
  REJECTED: "rejected",
}

// Only spellings the API actually uses are listed — nothing invented.
// "pending_review" is the real wire value for the PENDING bucket, not
// "pending" (same asymmetry as songStatus.js).
const VIDEO_STATUS_ALIASES = {
  active: VIDEO_STATUS.ACTIVE,
  published: VIDEO_STATUS.ACTIVE,
  draft: VIDEO_STATUS.DRAFT,
  scheduled: VIDEO_STATUS.SCHEDULED,
  archived: VIDEO_STATUS.ARCHIVED,
  pending: VIDEO_STATUS.PENDING,
  pending_review: VIDEO_STATUS.PENDING,
  rejected: VIDEO_STATUS.REJECTED,
}

export const VIDEO_STATUS_LABELS = {
  [VIDEO_STATUS.ACTIVE]: "Active",
  [VIDEO_STATUS.DRAFT]: "Draft",
  [VIDEO_STATUS.SCHEDULED]: "Scheduled",
  [VIDEO_STATUS.ARCHIVED]: "Archived",
  [VIDEO_STATUS.PENDING]: "Pending",
  [VIDEO_STATUS.REJECTED]: "Rejected",
}

export const VIDEO_STATUS_COLORS = {
  [VIDEO_STATUS.ACTIVE]: "bg-green-success/15 text-green-success border-green-success/20",
  [VIDEO_STATUS.DRAFT]: "bg-white/[0.05] text-light-gray border-white/10",
  [VIDEO_STATUS.SCHEDULED]: "bg-primary/15 text-primary border-primary/20",
  [VIDEO_STATUS.ARCHIVED]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
  [VIDEO_STATUS.PENDING]: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20",
  [VIDEO_STATUS.REJECTED]: "bg-red-error/15 text-red-error border-red-error/20",
}

/**
 * Folds every spelling the API returns onto one canonical value so badges,
 * filters and row actions all key off the same string. Unknown values pass
 * through lowercased rather than being coerced into a guess.
 */
export function normalizeVideoStatus(status) {
  if (!status || typeof status !== "string") return ""
  const key = status.trim().toLowerCase()
  return VIDEO_STATUS_ALIASES[key] ?? key
}

/**
 * Reverses normalizeVideoStatus for values sent back to the API (e.g. the
 * list filter's `status` query param). Every bucket's wire spelling matches
 * its canonical value except PENDING, whose wire value is "pending_review".
 */
export function toApiVideoStatus(canonicalStatus) {
  return canonicalStatus === VIDEO_STATUS.PENDING ? "pending_review" : canonicalStatus
}

/**
 * Admin-created content publishes with no approval step — only a real
 * artist submission (status: "pending_review") is awaiting review. A
 * "draft" is just the admin's own unpublished upload, not a moderation
 * queue item, so it must NOT be treated as awaiting review.
 */
export function isVideoAwaitingReview(video) {
  return normalizeVideoStatus(video?.status) === VIDEO_STATUS.PENDING
}

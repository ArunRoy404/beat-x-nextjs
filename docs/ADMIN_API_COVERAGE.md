# BeatX Admin — API Coverage

Living tracker for `src/app/admin/**` API integration against `postman/BeatX-RoleBased.postman_collection.json`. Updated as each module gets worked on. For the original full audit/investigation writeup, see `docs/ADMIN_API_AUDIT.md`.

**Convention:** every endpoint below is listed as `[method] [path]` with a status emoji, and the reason (when relevant) always sits at the end in parentheses.
- ✅ endpoint — fully integrated, request/response verified against the collection
- ⚠️ endpoint (reason) — integrated but has a gap, mismatch, or missing piece
- 🆕 endpoint (reason) — backend endpoint is ready, no frontend code calls it yet
- ❌ endpoint (reason) — no frontend code and/or no page exists for this at all

---

## 1. User Management — ✅ Done

**What I did:** rewired the whole module off the wrong endpoint (`/users`) onto the real admin contract (`/admin/users`), replaced the fake "coming soon" toast stubs with real mutations, fixed the status model to match the backend enum, and deleted the dead `adminDashboardUsersStore.js`.

- `GET /admin/users ✅` — was calling `/users` with unsupported params; now calls `/admin/users` with `role`/`status` (`active|suspended|banned`)/`q`/`page`/`limit`, all validated in `usersParams.js`
- `GET /admin/users/{userId} ✅` — new: `useUserDetail.js` (added `queryKeys.users.detail`)
- `PATCH /admin/users/{userId}/suspend ✅` — new: `useSuspendUser.js`, wired into `UserDetailsDialog`
- `PATCH /admin/users/{userId}/ban ✅` — new: `useBanUser.js`, wired into `UserDetailsDialog`
- `PATCH /admin/users/{userId}/reactivate ✅` — new: `useReactivateUser.js`, wired into `UserDetailsDialog`
- `DELETE /admin/users/{userId} ✅` — new: `useDeleteUser.js`; contract has no request body (no password confirmation, unlike artist delete), form updated to match
- `POST /admin/users/invite ✅` — new: `useInviteUser.js`, `InviteUserForm` now sends `{ email, role }` with `role` restricted to `admin|developer` per contract

**Design decision:** the invite flow only ever creates `admin`/`developer` accounts (the endpoint's contract, not mine) — regular end users can't be admin-invited, only self-register. Kept it on this page since the UI banner already lived here; may move to a dedicated Admins/Staff page later (see module 19).

**Post-ship bug found & fixed:** the live server's `GET /admin/users` response nests the list under `data.admins`, not `data.data` as the Postman collection's *saved example response* shows — the two disagree. The unwrap logic in `UsersContainer.jsx`/`AdminDashboardUsersPage.jsx` was written against the saved example and silently rendered zero rows against the real server. Fixed to check `data?.admins` first, `data?.data` as fallback. **Lesson applied going forward: verify unwrap/response-shape logic against a real live response, not just the collection's saved example — the example can be stale.**

**Still open (out of scope for this pass, unrelated to the endpoint work):**
- Stat cards (Total/Verified/Suspended-Banned/New This Month) are computed client-side from the current page of results (max `limit` users), not a real aggregate — there's no dedicated stats endpoint for this in the collection. Flagging for awareness, not a bug I introduced.

---

## 2. Artist Verification — ✅ Done (no changes needed)

- `GET /admin/artist-verification ✅`
- `GET /admin/artist-verification/{id} ✅`
- `PATCH /admin/artist-verification/{id}/checklist ✅`
- `PATCH /admin/artist-verification/{id}/social-links/checklist ✅`
- `PATCH /admin/artist-verification/{id}/review/overview ✅`
- `PATCH /admin/artist-verification/{id}/review/media_assets ✅`
- `PATCH /admin/artist-verification/{id}/approve ✅`
- `PATCH /admin/artist-verification/{id}/reject ✅`
- `PATCH /admin/artist-verification/{id}/request-info ✅`
- `PATCH /admin/artist-verification/{id}/suspend ✅`
- `PATCH /admin/artist-verification/{id}/reactivate ✅`
- `PATCH /admin/artist-verification/{id}/genres ✅`
- `DELETE /admin/artist-verification/{id} ✅` — password-confirmed, matches contract

All 12 endpoints verified correct: URL, body shape, and enums (reject `reasonCode`, request-info `items`) all match the collection exactly.

---

## 3. Genres — ✅ Done (no changes needed)

- `GET /genre ✅`
- `GET /genre/search ✅`
- `POST /genre ✅`
- `PATCH /genre/{id} ✅`
- `DELETE /genre/{id} ✅`

---

## 4. Albums — ✅ Done (no changes needed)

- `GET /admin/albums ✅`
- `POST /admin/albums ✅`
- `GET /admin/albums/{id} ✅`
- `PATCH /admin/albums/{id} ✅` — also used for take-down/restore via `status`
- `PATCH /admin/albums/{id}/cover ✅`
- `DELETE /admin/albums/{id} ✅`

---

## 5. Dashboard (Overview) — ✅ Done (no changes needed)

- `GET /admin/dashboard ✅` — owned by `/admin/dashboard/overview`; the bare `/admin/dashboard` route is an intentional redirect, not a duplicate integration

---

## 6. Analytics — ✅ Done (no changes needed)

- `GET /admin/analytics?range= ✅` — `range` enum (`7d|30d|3m|6m|1y`) validated in a shared params builder

---

## 7. Admin Profile — ✅ Done (no changes needed)

- `GET /users/me ✅`
- `GET /auth/login-history ✅`

---

## 8. Songs / Music — ✅ Done

**What I did:** ran a full endpoint-by-endpoint check against live Postman request/response examples (not just the earlier summary), confirmed the rest of the module was already built correctly, and fixed the one real defect — the `pending` vs `pending_review` status mismatch — plus the missing filter tabs. Renamed the sidebar entry from "Music's & Songs" to "Music".

- `GET /admin/songs ✅` — verified real response nests the list under `data.song` (singular) plus a `data.stats` object (`total`, `totalStreams`, `published`, `awaitingApproval`, `rejected`, `draft`, `scheduled`); `SongsContainer.jsx` and `AdminDashboardMusicPage.jsx` already unwrapped this correctly — no bug here, unlike the Users module's `data.admins` surprise
- `POST /admin/songs ✅` — formdata fields match contract exactly; response is `{ trackingId }`, handled correctly as async (list invalidates immediately, `transcodeStatus` updates via refetch)
- `GET /admin/songs/{id} ✅`
- `PATCH /admin/songs/{id} ✅` — all fields match contract (title/artist/album/genre/explicit/status/scheduledAt/isFeatured/isTrending); take-down/restore via `status` confirmed working
- `PATCH /admin/songs/{id}/approve ✅` — fixed: `pending_review` is now aliased to the canonical `PENDING` bucket in `songStatus.js`, so `isSongAwaitingReview()` correctly detects real artist submissions
- `PATCH /admin/songs/{id}/reject ✅` — same fix; reject dialog already sent `{ reason }` correctly, it just never used to render
- `DELETE /admin/songs/{id} ✅`
- `POST /admin/songs/upload-url 🆕 (unused by design per contract note — Create Song uploads directly via multipart)`

**Root cause & fix:** `songStatus.js`'s alias map had `pending` but the backend's real enum value (confirmed from the live Postman collection, not assumed) is `pending_review`. Added `pending_review` as an input alias, and added `toApiSongStatus()` to convert the canonical `pending` bucket back to the wire value `pending_review` when building the outgoing list-filter param (`songsParams.js`) — every other status bucket's wire spelling already matches its canonical value 1:1, only this one bucket is asymmetric. Also added the missing `Scheduled` and `Rejected` tabs to `SongsContainer.jsx`'s `STATUS_TABS`.

**Verified correct, no changes needed:** create/edit forms (`buildSongFormData.js`, `EditSongForm.jsx`, `AdminSongFormFields.jsx`) — visibility→status mapping is correct (`"schedule"` → `SONG_STATUS.SCHEDULED` = `"scheduled"`, no typo bug like Events had); all 5 mutation hooks handle toast/invalidate internally per project convention; SSR prefetch in `page.jsx` correctly parallel-fetches songs + genres; stats cards already read the real `stats.*` fields precisely.

**Known minor gap, left as-is (not an API issue):** `SongDetailFooter.jsx` only has Delete/Close — no Approve/Reject/Take-down/Restore buttons in the detail dialog, unlike Podcasts' detail footer which has full action parity. Those actions all work correctly from the table row and mobile card, just not from inside the detail view. Cosmetic/UX inconsistency, not a broken endpoint — left out of this pass to keep it scoped to actual bugs.

**Full UI field sweep (every remaining file, every displayed value):** checked `SongsCard.jsx`, `SongDetailContent.jsx`, `SongDetailHeader.jsx`, `SongDetailsDialog.jsx`, `EditSongDialog.jsx`, `DeleteSongForm.jsx`, `UploadNewSongDialog.jsx`, and `adminSongSchema.js` field-by-field against the real `GET /admin/songs/{id}` response. Every value shown (title, artist, album, genre, durationMs, publishedAt, scheduledAt, playCount, playCountWeek, likeCount, explicit, isTrending, trendDirection, isFeatured, ownerId, submittedStatus, submittedAt, reviewedBy, reviewedAt, rejectionReason, transcodeStatus, coverUrl, hlsMasterUrl) maps to a real API field — nothing fabricated, no `|| "hardcoded fallback"` patterns, Mongo refs (`album`/`ownerId`/`reviewedBy`) correctly handled as either populated objects or bare ids. `SongDetailsDialog` correctly re-fetches `GET /admin/songs/{id}` on open rather than trusting stale list-row data. One cosmetic-only item with no API to verify against: the Upload dialog's helper text ("MP3/WAV/FLAC · Max 100MB · Cover art min 1000×1000px") is static UI copy — the Postman collection doesn't document file-size/dimension limits, so this couldn't be cross-checked either way.

---

## 9. Videos — ⚠️ Needs adjustment (not yet fixed)

- `GET /admin/videos ✅`
- `GET /admin/videos/{id} ✅`
- `PATCH /admin/videos/{id} ✅`
- `PATCH /admin/videos/{id}/approve ⚠️ (gating checks literal "pending" instead of "pending_review", and wrongly treats "draft" as needing approval)`
- `PATCH /admin/videos/{id}/reject ⚠️ (same gating bug as approve)`
- `DELETE /admin/videos/{id} ✅`
- `POST /creator/videos ❌ (admin video creation intentionally not built — correctly disabled in UI with an explanatory note, matches contract's lack of an /admin/videos create route)`

**Also:** `UploadVideoDialog.jsx` is a dead/broken file (no valid component definition) that should be deleted; filter tabs omit `pending_review`, `scheduled`, `rejected`.

---

## 10. Podcasts + Reviews — ⚠️ Needs adjustment (not yet fixed)

- `POST /creator/podcasts ⚠️ (form exists but is a non-functional stub — shows a toast and never actually calls this endpoint)`
- `GET /admin/podcasts ✅`
- `GET /admin/podcasts/{id} ✅`
- `PATCH /admin/podcasts/{id} ✅`
- `PATCH /admin/podcasts/{id}/approve ⚠️ (same "pending" vs "pending_review" + draft-gating bug as Videos)`
- `PATCH /admin/podcasts/{id}/reject ⚠️ (same gating bug as approve)`
- `DELETE /admin/podcasts/{id} ✅`
- `GET /admin/podcasts/reviews ✅`
- `PATCH /admin/podcasts/reviews/{id}/moderate ✅`
- `DELETE /admin/podcasts/reviews/{id} ✅`

**Note:** the reviews sub-module (list/moderate/delete) is the best-built review UI in the app — fully correct. Only the create-podcast flow and the approve/reject gating bug need work. Podcast category select also hardcodes a fake list instead of fetching real `/category` data (see module 22).

---

## 11. Audiobooks + Reviews — ⚠️ Needs adjustment (not yet fixed)

- `POST /admin/audiobooks/upload-url ✅`
- `GET /admin/audiobooks ✅`
- `POST /admin/audiobooks ✅`
- `GET /admin/audiobooks/{id} ✅`
- `PATCH /admin/audiobooks/{id} ⚠️ (status field is carried through the form but there's no control to actually change it — no take-down/restore UI)`
- `PATCH /admin/audiobooks/{id}/cover ✅`
- `POST /admin/audiobooks/{id}/chapters ⚠️ (trackingId returned and discarded — no SSE progress subscription, see module 23)`
- `PATCH /admin/audiobooks/{id}/chapters/{chapterId} ✅`
- `DELETE /admin/audiobooks/{id}/chapters/{chapterId} ✅`
- `DELETE /admin/audiobooks/{id} ✅`
- `GET /admin/audiobooks/reviews ❌ (zero code — no service, hook, queryKey, or UI tab exists)`
- `PATCH /admin/audiobooks/reviews/{id}/moderate ❌ (zero code)`
- `DELETE /admin/audiobooks/reviews/{id} ❌ (zero code)`

---

## 12. Events / Tours — ⚠️ Needs adjustment (not yet fixed)

- `POST /creator/events ✅`
- `GET /admin/events/dashboard ✅`
- `GET /admin/events ✅`
- `GET /admin/events/{id} ✅`
- `PATCH /admin/events/{id} ⚠️ (most field edits actually route to PATCH /creator/events/{id} instead of this endpoint — only pure ownerId reassignment hits the right route; needs backend verification)`
- `GET /admin/events/{id}/analytics ✅`
- `DELETE /admin/events/{id} ✅`

**Also:** status filter tabs (`upcoming/live/under_review/sold_out/rejected`) don't match the real enum (`draft|scheduled|active|completed|archived`); `EditEventForm.jsx` has a `"schedule"` vs `"scheduled"` typo bug; owner-reassignment field exists in the form but has no actual UI control; orphaned dummy data/zustand store still present.

---

## 13. Merch Products / Shop — ⚠️ Needs adjustment (not yet fixed)

- `GET /admin/products/dashboard ✅`
- `GET /admin/products ✅`
- `GET /admin/products/{id} ✅`
- `PATCH /admin/products/{id} ⚠️ (category dropdown offers "Bags/Posters/Other" which aren't in the real enum apparel|vinyl|accessories|digital-art|gear; colorVariants unsupported in UI)`
- `GET /admin/products/{id}/analytics ✅`
- `DELETE /admin/products/{id} ✅`
- *(no create route in contract)* `❌ (correctly stubbed — Add Product button shows an honest "unavailable" toast, matches contract's missing create endpoint)`

**Also:** status filter tabs don't match real enum; no owner-reassignment UI at all; `useUpdateProduct` has a dead toast branch for a non-existent `"rejected"` status; orphaned dummy data/zustand store still present.

---

## 14. Payouts — ❌ Not built

- `POST /admin/payouts ❌ (zero code)`
- `GET /admin/payouts ❌ (zero code)`
- `GET /admin/payouts/{id} ❌ (zero code)`
- `PATCH /admin/payouts/{id}/mark-paid ❌ (zero code)`
- `PATCH /admin/payouts/{id}/cancel ❌ (zero code)`

No service, hook, page, or `queryKeys` entry exists on the admin side. (Not to be confused with the unrelated artist-facing self-service payout page, which is a different feature and still dummy-data driven.)

---

## 15. Activity Log — ⚠️ Partial (dashboard-embedded only)

- `GET /admin/activity ⚠️ (no dedicated paginated/filterable page — only a small "recentActivity" slice embedded in the GET /admin/dashboard response is shown, on the Overview page's Recent Activity widget)`

---

## 16. Scheduler (cron jobs) — 🧟 Orphaned + ❌ incomplete

- `GET /admin/scheduler/status 🧟 (hook exists — useSchedulerStatus.js — but no page imports it)`
- `GET /admin/scheduler/jobs ❌ (zero code)`
- `POST /admin/scheduler/jobs/{jobName}/run 🧟 (hook exists — useTriggerSchedulerJob.js — but no page imports it)`
- `PATCH /admin/scheduler/jobs/{jobName}/schedule ❌ (zero code)`
- `POST /admin/scheduler/pause ❌ (zero code)`
- `POST /admin/scheduler/resume ❌ (zero code)`

No page exists anywhere under `src/app/admin/dashboard/*` for this module — completely unreachable by any admin today.

---

## 17. Uploads (background progress, SSE) — ❌ Not built

- `GET /uploads/mine ❌ (zero code)`
- `GET /uploads/{trackingId}/progress ❌ (zero code — SSE stream never subscribed to; song/audiobook-chapter uploads return trackingId and discard it)`

---

## 18. Support Tickets — ❌ Not built

- `GET /admin/support/tickets ❌ (zero code)`
- `GET /admin/support/tickets/{id} ❌ (zero code)`
- `POST /admin/support/tickets/{id}/messages ❌ (zero code)`
- `PATCH /admin/support/tickets/{id}/status ❌ (zero code)`
- `POST /admin/support/tickets/{id}/create-event ❌ (zero code)`

Largest single build-out gap in the whole admin surface — no service, hook, page, template, or component exists.

---

## 19. Admins / Staff Accounts — ❌ Not built

- `GET /admin/admins ❌ (zero code — no dedicated staff-list page exists)`
- `POST /admin/admins/invite ❌ (the only related UI — a modal on the Roles & RBAC page — fires a fake alert(), no network call)`

Note: `POST /admin/users/invite` (module 1) is the functionally-identical route already wired for this same purpose; a real `/admin/admins` list page is still needed if staff accounts should be managed separately from general users.

---

## 20. Platform Settings — 🆕 Ready, not integrated

- `GET /admin/settings 🆕 (page is 100% dummy/zustand-driven — no settingsServices.js exists at all)`
- `PATCH /admin/settings 🆕 (toggles only flip local state, no PATCH ever sent)`
- `POST /admin/settings/clear-cache 🆕 (button shows a canned success string, no request sent)`
- `POST /admin/settings/reset-analytics 🆕 (same — no request sent)`

---

## 21. Categories (podcast categories) — 🆕 Ready, not integrated

- `POST /category 🆕 (zero code — no categoryServices.js, no hooks, no admin UI)`
- `PATCH /category/{id} 🆕 (zero code)`
- `DELETE /category/{id} 🆕 (zero code)`

Podcast create form hardcodes a fake 6-item category list instead of fetching real ones.

---

## 22. Roles & RBAC — ❌ No backend concept exists

Confirmed via full-collection search: there is no RBAC/roles/permissions API anywhere in the backend, only the plain `role` enum on user records (already covered by modules 1/19). This page is intentionally 100% mock/local-state until the backend ships this feature — nothing to integrate yet.

---

## 23. Subscriptions — ❌ No backend concept exists

Confirmed via full-collection search: zero subscription endpoints exist anywhere in the backend. Page is intentionally 100% mock/local-state (zustand + dummy data). `queryKeys.subscriptions` and `subscriptionsParams.js` exist as unused scaffolding for whenever the backend adds this.

---

## Progress snapshot

| Status | Modules |
|---|---|
| ✅ Fully done | User Management, Artist Verification, Genres, Albums, Dashboard, Analytics, Admin Profile, Songs/Music — **8 / 23** |
| ⚠️ Needs adjustment | Videos, Podcasts+Reviews, Audiobooks+Reviews, Events/Tours, Shop, Activity Log — **6 / 23** |
| 🆕 Backend ready, not wired | Platform Settings, Categories — **2 / 23** |
| ❌ Not built / no backend | Payouts, Scheduler, Uploads, Support Tickets, Admins/Staff, Roles & RBAC, Subscriptions — **7 / 23** |

Next recommended target: the same `pending` vs `pending_review` status-enum bug in Videos and Podcasts (same root cause just fixed in Songs, applied one module at a time per current workflow).

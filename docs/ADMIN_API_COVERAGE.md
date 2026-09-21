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

## 9. Videos — ✅ Done

**What I did:** checked every endpoint one by one against live Postman request/response examples (not assumptions). Found and fixed one bug worse than the planned `pending_review` gating issue — the video grid was silently broken (always empty) — plus several smaller correctness/UI-honesty issues along the way.

- `GET /admin/videos ✅` — **critical bug fixed**: the real response nests the list under `data.videos`, but `VideosContainer.jsx` was reading `data?.data` (always `undefined` → always fell back to `[]`). The admin Videos grid has been showing "No videos found" regardless of real data. Now reads `data?.videos` correctly.
- `GET /admin/videos/{id} ✅`
- `PATCH /admin/videos/{id} ✅` — take-down/restore via `status` confirmed working; contract confirms this route is JSON-only and cannot replace the cover file (see Edit-dialog fix below)
- `PATCH /admin/videos/{id}/approve ✅` — fixed: gating previously checked literal `"pending"` (backend sends `"pending_review"`) and incorrectly treated `"draft"` as needing approval (admin's own drafts don't go through review). Centralized the fix into a new `src/lib/constants/videoStatus.js` (mirrors `songStatus.js`) instead of patching the inline logic in place, since the same incomplete status handling was duplicated across `VideoCard.jsx`, `VideoDetailHeader.jsx`, and `VideoDetailFooter.jsx` with three different incomplete color maps
- `PATCH /admin/videos/{id}/reject ✅` — same fix; also corrected a nonsensical canned rejection-reason option ("Identity Music unclear or unreadable" → "Video content unclear or unreadable", looked like copy-pasted leftover text)
- `DELETE /admin/videos/{id} ✅`
- `POST /creator/videos ❌ (correctly not built — admin video creation intentionally absent, disabled in UI with an honest "unavailable" toast, matches contract's lack of an /admin/videos create route)`

**Other real issues found and fixed in the same pass:**
- **Deceptive UI (silent data loss):** `EditVideoDialog.jsx` let an admin pick a new thumbnail image, showed a live preview, and on save displayed "Video changes saved successfully!" — but the selected file was never sent anywhere. The contract confirms `PATCH /admin/videos/{id}` is JSON-only and cannot replace the cover file, so there was never a way for this to actually work. Fixed: the thumbnail box is now an honest read-only preview — clicking it explains cover replacement isn't supported by the API yet, instead of silently accepting and discarding a file.
- **Fabricated UI element:** `VideoDetailHeader.jsx` rendered a "verified" checkmark badge on every single video unconditionally — there is no such field anywhere in the video object or the contract. Removed; it was misleading, implying a verification status that doesn't exist.
- **Fabricated fallback data:** both `VideoDetailHeader.jsx` and `VideoDetailContent.jsx` showed `video?.transcodeStatus || "ready"` — guessing "ready" whenever the real value was missing/falsy, which could hide a genuinely different transcode state. Changed to show `"-"` when absent, per the "no fabricated data" project rule.
- **Thin detail view:** `VideoDetailContent.jsx` was missing the entire moderation trail (`submittedStatus`, `submittedAt`, `reviewedBy`, `reviewedAt`, `rejectionReason`) that Songs' equivalent already shows — directly relevant since we were fixing the approve/reject flow and an admin couldn't previously see *why* a video was rejected anywhere. Added, following the same `refToText()` Mongo-ref-safe pattern as `SongDetailContent.jsx`.
- **Pre-existing rules-of-hooks violation:** `VideoCard.jsx` called `useGlobalMediaPlayerStore()` *after* an early `if (!video) return null` — a real (if latent) React bug predating this session, caught by lint while editing the file. Moved the hook call above the guard.
- **Pre-existing effect anti-pattern:** `EditVideoDialog.jsx` synced fetched video data into form fields via `useEffect` + multiple `setState` calls, flagged by `react-hooks/set-state-in-effect`. Refactored into a `VideoEditFormFields` subcomponent keyed by `video?._id`/open-state so field values initialize directly from props on mount — no effect needed, matches the pattern React recommends for "resetting state when a prop changes."
- **SSR gap:** the genre filter dropdown wasn't prefetched server-side (unlike Songs, which prefetches genres alongside its list) — caused an empty-then-populated flash on first paint. Added the same parallel `prefetchQuery` to `page.jsx`, and aligned `VideosContainer.jsx`'s `useGenres()` call to use the shared `TAXONOMY_OPTIONS_PARAMS` so the client cache key matches what's prefetched.
- **Optional chaining:** `VideoCard.jsx` had several direct `video.x` property accesses without `?.` (technically safe today only because of a local guard, but inconsistent with the rest of the codebase and the project's mandatory-optional-chaining rule) — added throughout.

**Also:** filter tabs were missing `Pending`, `Scheduled`, `Rejected` — added, matching Songs' tab set. Deleted two dead files: `UploadVideoDialog.jsx` (broken — no valid component definition, would throw if ever rendered) and `RejectVideoDialog.jsx` (unused duplicate — `VideoDetailFooter.jsx` already has its own working inline reject flow). Removed the stale comment in `AdminDashboardVideosPage.jsx` referencing the now-deleted `UploadVideoDialog`.

---

## 10. Podcasts + Reviews — ✅ Done

**What I did:** checked every endpoint one by one against live Postman request/response examples. This module had four separate "list renders empty / crashes" bugs from the same root cause (response-shape assumptions never checked against the real payload), the same `pending_review` gating bug as Songs/Videos, and a completely non-functional create flow. All fixed. Also built out real category support (`GET /category`) since podcasts are categorized by Category, not Genre — the module was wrongly wired to the Genre endpoint.

- `GET /admin/podcasts ✅` — **critical bug fixed**: real response nests the list under `data.podcasts`, but `PodcastsContainer.jsx` read `data?.data` (always empty). The admin Podcasts table/cards have been showing "No podcasts" regardless of real data.
- `GET /admin/podcasts/{id} ✅` — **critical bug fixed**: real response nests episodes under `data.episodes.data` (a paginated object), but `PodcastDetailsDialog.jsx` passed the whole `episodes` object straight through as `podcast.episodes`. Opening any podcast's detail view and switching to its episode list would throw `episodes.map is not a function` the moment a real response landed (same bug class as the `genres.map` crash reported earlier on this route — see below).
- `PATCH /admin/podcasts/{id} ✅` — take-down/restore via `status` confirmed working
- `PATCH /admin/podcasts/{id}/approve ✅` — fixed: gating previously checked literal `"pending"`/`"draft"` (backend sends `"pending_review"`, and an admin's own draft isn't a review-queue item). Centralized into new `src/lib/constants/podcastStatus.js` (mirrors `videoStatus.js`), replacing two separately-duplicated incomplete gating checks in `PodcastDetailFooter.jsx` and `PodcastsTableActions.jsx`.
- `PATCH /admin/podcasts/{id}/reject ✅` — same fix
- `DELETE /admin/podcasts/{id} ✅`
- `GET /admin/podcasts/reviews ✅` — **critical bug fixed**: real response nests the list under `data.reviews`, but `PodcastDetailReviews.jsx`'s unwrap only checked `data.data`/`data.items`/a bare array — never `data.reviews`. The reviews tab (previously reported as "the best-built review UI in the app — fully correct") was actually always showing the empty state; that earlier finding was wrong, caught only by this detailed re-check.
- `PATCH /admin/podcasts/reviews/{id}/moderate ✅`
- `DELETE /admin/podcasts/reviews/{id} ✅`
- `POST /creator/podcasts ✅ (admin shares the artist create route, same pattern as Events)` — was a dead stub (`toast.info(...)`, never called the endpoint, and the form's fields — Episode Title/Series Name/Season/Episode # — were for creating an *episode*, not the podcast show this endpoint actually creates). Rebuilt from scratch: new `podcastCreateSchema` + `buildPodcastFormData.js` (title/description/language/category/status/cover, matches the real multipart contract), new `useCreatePodcast.js` hook, and the "Create Podcast" banner button now opens a real dialog instead of showing an "unavailable" toast.

**Root cause common to three of the four critical bugs:** the codebase consistently assumed unwrapped/flat response shapes without checking the live payload — `data.podcasts` read as `data.data`, `episodes.data` read as a bare array, `data.reviews` read as `data.data`. Same bug class as the Users `data.admins` bug and the Videos `data.videos` bug found earlier this session.

**Podcasts use Category, not Genre — a second, pre-existing bug:** the module was calling `useGenres()` (music genres) for its filter dropdown, while the real podcast object only has a `category` field (a bare Category ObjectId, e.g. `"66fd1c2e2f1b9a0012a3000c"`, never populated to `{name}` by the backend). `useGenres()`'s response resolves to `{ data: [...], total, ... }` (an object), and the old code did `const { data: genres = [] } = useGenres()` then unconditionally called `genres.map(...)` to build filter options — since `genres` was a truthy object, not an array, this threw `genres.map is not a function`. **This is the exact crash you reported earlier on `/admin/dashboard/podcasts`.** At the time I left it alone since it wasn't the day's target; fixed now as part of this module's full pass, the same way Songs/Videos' analogous genre-fetch crash risk was already fixed (aligning to the `genresList = genresData?.genre ?? genresData?.genres ?? genresData?.data ?? []` defensive pattern) — except here the fix is to stop calling the wrong endpoint entirely. Added a small read-only `categoryServices.js` / `useCategories.js` (mirrors `genreServices.js`) hitting the real `GET /category` endpoint, and used it to resolve every category id shown in the table, cards, and detail view to a real name — full admin Category CRUD (Create/Update/Delete) still has no UI and remains tracked separately (module 21).

**Other real issues found and fixed in the same pass:**
- **Fabricated data:** `PodcastDetailContent.jsx` hardcoded `artist: podcast?.title || "Podcast ADDA"` as the now-playing label fallback — a made-up brand name with no basis in the API. Changed to a generic `"Podcast"`.
- **React purity bug:** `PodcastDetailReviews.jsx` used `key={review?._id || Math.random()}` — calling `Math.random()` during render is impure and was flagged by the React Compiler as a real correctness issue (unstable keys break reconciliation). Changed to `review?._id || index`.
- **Thin detail view:** `PodcastDetailContent.jsx` was missing the entire moderation trail (`submittedStatus`, `submittedAt`, `reviewedBy`, `reviewedAt`, `rejectionReason`) that Songs/Videos already show — added, following the same `refToText()` Mongo-ref-safe pattern. Also added the missing `Scheduled For` field.
- **SSR gap:** the category filter/lookup wasn't prefetched server-side — added the same parallel `prefetchQuery` (plus the unfiltered-stats prefetch Videos already has) to `page.jsx`.
- **Missing filter tabs:** `STATUS_TABS` only had `All/Draft/Active/Archived` — added `Pending`, `Scheduled`, `Rejected` to match Songs/Videos.
- **Optional chaining:** added throughout `PodcastDetailContent.jsx`'s episode list rendering (`episode?.title`, `episode?.durationMs`, etc. — was direct property access without `?.`).

**Documented, not expanded (deliberate, out of scope for this pass):** `EditPodcastForm.jsx` only edits description/status/scheduledAt/isFeatured/isTrending/trendDirection — `PATCH /admin/podcasts/{id}` also accepts title/language/category/ownerId, so those could be added to the edit form later. The old comment in `adminPodcastSchema.js` incorrectly claimed those fields "belong to the Creator route" (they don't — the admin update endpoint accepts them directly); corrected the comment to say this is simply unbuilt, not that it's out of the admin endpoint's contract.

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
| ✅ Fully done | User Management, Artist Verification, Genres, Albums, Dashboard, Analytics, Admin Profile, Songs/Music, Videos, Podcasts+Reviews — **10 / 23** |
| ⚠️ Needs adjustment | Audiobooks+Reviews, Events/Tours, Shop, Activity Log — **4 / 23** |
| 🆕 Backend ready, not wired | Platform Settings, Categories (now partially — read-only `GET /category` is wired for the Podcasts module; admin Create/Update/Delete Category still has no UI) — **2 / 23** |
| ❌ Not built / no backend | Payouts, Scheduler, Uploads, Support Tickets, Admins/Staff, Roles & RBAC, Subscriptions — **7 / 23** |

Next recommended target: Audiobooks + Reviews — same missing-reviews-sub-module gap as Podcasts had, plus a take-down/restore control missing from the edit form and an unsubscribed upload-progress endpoint.

# Admin Modules — Today's Session, Feature-by-Feature Detail

Scope: every module actually touched by a commit dated today — verified file by file, directly against the code and against `postman/BeatX-RoleBased.postman_collection.json`. Every row was checked by opening the actual component/service/hook file, and every Postman claim was pulled from the collection's exact request body/params JSON, not from memory. (Correction: an earlier version of this doc only covered 3 of the 5 real modules touched today — Users and Songs were missed because they weren't discussed as recently in conversation, even though their commits are timestamped today. Both are now included.)

Commits covered, in order: `e318f22`/`b0fc860` (Postman collection + initial audit, not a module), `873393e` (User Management), `49df1b2` (Songs), `8da85e3` (Videos), `b1bd8b0` (Podcasts), `6aa321e` (Audiobooks).

**Legend**
- ✅ **Implemented** — works, calls a real endpoint, request/response shape confirmed correct.
- ⚠️ **Partial** — exists but incomplete, disabled, read-only, or only covers some of what the endpoint supports.
- ❌ **No API** — no backend endpoint exists for this at all (not a frontend gap — nothing to wire up).
- ❌ (not wired) — the backend endpoint/field exists and is documented, but no frontend code calls/sends it.

One flat numbered list per module — every feature the admin can (or can't) do with this content type, regardless of whether it lives on the list page, the card, or the detail dialog.

---

## 1. Videos (Admin)

1. List videos (grid) — ✅ `GET /admin/videos`, reads `data?.videos`
2. Filter by status (All/Draft/Pending/Scheduled/Active/Archived/Rejected) — ✅ sent as `status` query param
3. Filter by genre — ✅ `GET /genre` populates dropdown, sent as `genre` query param
4. Filter by owner/artist (`ownerId`) — ❌ (not wired) — contract documents this as a real query param on `GET /admin/videos`; nothing in the code reads or sends it; `video.ownerId` is only ever displayed (uploader name), never filterable
5. Search by title — ✅ debounced, sent as `q`
6. Pagination — ✅ `page`/`limit`
7. Stats card — Total Videos — ✅ computed from `data.total` of the unfiltered list query
8. View Details (dialog) — ✅ re-fetches `GET /admin/videos/{id}` on open
9. Play video inline — ✅ plays via `hlsMasterUrl`/`sourceKey` in the global media player
10. Edit — title, description, genre, status (active/draft/archived only), featured, trending — ✅ `PATCH /admin/videos/{id}`
11. Edit — set status to "Scheduled" + scheduledAt date — ❌ (not wired) — contract's PATCH body includes `scheduledAt` and the status enum includes `scheduled`, and the Details tab already *displays* a "Scheduled For" field, but the Edit dialog's status options only list Active/Draft/Archived and there is no date-picker anywhere in the form. An admin can see a scheduled video but can never schedule one. Podcasts' equivalent Edit form has this working — Videos does not.
12. Edit — trendDirection (up/down/stable) — ❌ (not wired) — contract accepts it; Details tab shows it read-only; the Edit form only has an isTrending on/off switch, no direction selector
13. Edit — ownerId reassignment — ❌ (not wired) — contract accepts it; no UI control exists
14. Replace thumbnail/cover image — ❌ (no API) — `PATCH /admin/videos/{id}` is JSON-only per contract, no file-upload route exists for the video cover at all; UI shows a read-only preview with an explanatory tooltip instead of a fake upload control
15. Delete video — ✅ `DELETE /admin/videos/{id}`, confirm dialog
16. Approve (artist submission) — ✅ `PATCH /admin/videos/{id}/approve`, only shown when `status === pending_review`
17. Reject (artist submission, with reason) — ✅ `PATCH /admin/videos/{id}/reject`, canned-reason dropdown + free-text note
18. Take Down (Active → Archived) — ✅ `PATCH /admin/videos/{id}` with `{status: "archived"}`
19. Restore (Archived → Active) — ✅ `PATCH /admin/videos/{id}` with `{status: "active"}`
20. Create/Upload new video — ❌ (no API) — no `POST /admin/videos` route exists in the collection at all; creation only exists at `POST /creator/videos` (artist-scoped). The "Upload New Video" banner is an intentionally disabled stub, not a broken feature.
21. Moderation trail display (submitted status/at, reviewed by/at, rejection reason) — ✅ Mongo-ref-safe rendering
22. Analytics tab — ❌ (no API) — `GET /admin/videos/{id}` returns no analytics/chart data at all; UI shows an honest empty state, chart JSX preserved but commented out for later
23. "Verified" badge — removed this session — was previously shown unconditionally with no backing field anywhere in the contract; deleted as fabricated UI (noted here for completeness, no longer present)

---

## 2. Podcasts (Admin) + Reviews

1. List podcasts (table + mobile cards) — ✅ `GET /admin/podcasts`, reads `data?.podcasts`
2. Filter by status (All/Draft/Pending/Scheduled/Active/Archived/Rejected) — ✅ matches the real enum exactly
3. Filter by category — ⚠️ partial — the query param is fully plumbed (`buildPodcastsParams` builds and sends `category` when present) but the dropdown UI is commented out in `PodcastsContainer.jsx` per explicit instruction this session — backend-ready, UI-disabled, not "no API"
4. Filter by owner/artist (`ownerId`) — ❌ (not wired) — contract documents this as a real query param on `GET /admin/podcasts`; nothing in the code reads or sends it; only ever displayed, never filterable
5. Search by title — ✅
6. Pagination — ✅
7. Category column (id → name resolution) — ✅ `GET /category` used as a lookup table since the podcast object only stores a bare category id
8. View Details (dialog) — ✅ `GET /admin/podcasts/{id}`
9. Edit — description, visibility (publish/schedule/draft), scheduled date, featured, trending, trend direction — ✅ `PATCH /admin/podcasts/{id}`
10. Edit — title — ❌ (not wired) — contract accepts `title`; `EditPodcastForm.jsx` has no title field at all, cannot rename a podcast after creation
11. Edit — language — ❌ (not wired) — contract accepts it, form doesn't collect it
12. Edit — category — ❌ (not wired) — contract accepts it, form doesn't collect it; a podcast's category can only ever be set once, at creation
13. Edit — ownerId reassignment — ❌ (not wired) — contract accepts it, no UI control anywhere
14. Edit — cover image replacement — ❌ (not wired) — `PATCH /creator/podcasts/{id}/cover` exists as its own endpoint in the collection, but nothing in the admin Edit form calls it
15. Delete podcast — ✅ `DELETE /admin/podcasts/{id}`
16. Approve (artist submission) — ✅ `PATCH /admin/podcasts/{id}/approve`
17. Reject (artist submission, with reason) — ✅ `PATCH /admin/podcasts/{id}/reject`
18. Take Down (Active → Archived) — ✅ via `PATCH /admin/podcasts/{id}`
19. Restore (Archived → Active) — ✅ via `PATCH /admin/podcasts/{id}`
20. Create new podcast (show) — title, description, language, category, cover, visibility — ✅ `POST /creator/podcasts` (shared admin/artist route), rebuilt from scratch this session
21. Create new podcast — assign owning artist (`ownerId`) — ❌ (not wired) — the contract's own field description literally reads *"admin-only — the artist this podcast belongs to"*, meaning it exists specifically for this flow, but the create form never collects or sends it — every admin-created podcast goes out with no owner set
22. View episode list (read-only) — ⚠️ partial — rendered from `GET /admin/podcasts/{id}` → `episodes.data`; **not paginated** — the endpoint accepts `page`/`limit` for the nested episode list but the hook never sends them, so episodes beyond the backend's default page size would be invisible with no "load more" control
23. Play an episode inline — ✅ via global media player
24. Add/create a new episode — ❌ (no API for admin) — the only episode-create endpoint in the whole collection, `POST /creator/podcasts/{podcastId}/episodes`, lives under the **Artist** role section, not Admin — episodes are an artist-managed sub-resource with no admin-side equivalent
25. Edit an episode (title/description/season/episode#) — ❌ (no API for admin) — same, `PATCH /creator/podcasts/{podcastId}/episodes/{episodeId}` is Artist-only
26. Delete an episode — ❌ (no API for admin) — same, `DELETE /creator/podcasts/{podcastId}/episodes/{episodeId}` is Artist-only
27. Delete a season — ❌ (no API for admin) — same, `DELETE /creator/podcasts/{podcastId}/seasons/{n}` is Artist-only
28. List reviews — ✅ `GET /admin/podcasts/reviews?podcastId=`, reads `data?.reviews` (fixed this session — was reading the wrong key and always showing empty)
29. Filter reviews by rating — ❌ (not wired) — contract documents a `rating` query param on this endpoint; never sent
30. Filter reviews by hidden/visible — ❌ (not wired) — contract documents a `hidden` query param; never sent — the tab always fetches every review mixed together and relies on styling (dimmed background) to distinguish hidden ones, not a real filter
31. Hide / unhide a review — ✅ `PATCH /admin/podcasts/reviews/{id}/moderate`
32. Delete a review — ✅ `DELETE /admin/podcasts/reviews/{id}`
33. Analytics tab — ❌ (no API) — `GET /admin/podcasts/{id}` returns no analytics fields; honest empty state, chart JSX commented out for later

---

## 3. Audiobooks (Admin) + Reviews + Chapters

Note: this module has **no artist-submission queue at all** — the contract has no `pending_review`/approve/reject anywhere for audiobooks (admin-only content, unlike Videos/Podcasts/Songs). "No approve/reject buttons" below is correct-by-design, not a gap.

1. List audiobooks (grid) — ✅ `GET /admin/audiobooks`, reads `data?.audio` (corrected this session — the Postman saved example was stale and showed `data.data`; real key is `audio`)
2. Filter by status (All/Draft/Active/Archived) — ✅ no Pending/Rejected tabs, correctly — those statuses don't exist for audiobooks per the contract
3. Filter by genre — ✅
4. Search by title — ✅
5. Pagination — ✅
6. View Details (dialog) — ✅ `GET /admin/audiobooks/{id}`
7. Edit — title/author/narrator/language/synopsis/genre/status — ✅ `PATCH /admin/audiobooks/{id}`
8. Edit — cover image replacement — ✅ separate `PATCH /admin/audiobooks/{id}/cover` (multipart, field `file`), fired only when a new cover was actually picked
9. Edit — Bestseller/Trending/Featured flags + bestsellerRank + trendDirection + publishedAt — ✅ admin-only editorial fields, PATCH-only per contract, gated behind `showAdminFlags` so Create never sends them
10. Edit — `universe` (link to prequel/sequel audiobooks) — ❌ (not wired) — the full PATCH contract body includes `universe: [{ audiobookId, relation: "prequel"|"sequel" }]`, a whole series-linking feature; confirmed via full-codebase search that **zero code anywhere** references this field — no form field, no schema entry, no display of it anywhere. Completely unbuilt, not partial.
11. Delete audiobook — ✅ `DELETE /admin/audiobooks/{id}`
12. Take Down (Active → Archived) / Restore — ✅ via the Edit dialog's Status select (no separate dedicated buttons like Videos/Podcasts, but functionally reachable)
13. Create new audiobook — ✅ `POST /admin/audiobooks` — title/author/narrator/synopsis/language/genre/status/cover
14. View chapter list — ⚠️ partial — `GET /admin/audiobooks/{id}` → `chapters.data` (corrected this session — was reading a bare array, crashed the whole dialog on any real data). **Not paginated** — same gap as Podcasts' episodes, chapters beyond the default page size would be invisible with no way to reach them
15. Add/upload a new chapter (title + audio file) — ⚠️ partial — `POST /admin/audiobooks/{id}/chapters` works, but the file picker accepts wav/flac formats the **backend currently rejects** (confirmed `400 "Unsupported file type"` for `audio/x-flac` via direct Postman test) — only mp3/mp4/aac/ogg actually succeed today. Picker deliberately left open to the full intended format list per your instruction; flagged as a backend TODO in the Postman collection.
16. Edit a chapter (title, replace audio) — ⚠️ partial — same wav/flac backend-rejection caveat as above; title-only edits work fully
17. Delete a chapter — ✅ `DELETE /admin/audiobooks/{id}/chapters/{chapterId}`
18. Play a chapter inline — ✅ via global media player, guarded against missing/unprocessed audio
19. Reorder chapters — ❌ (no API) — no reorder/re-sequence endpoint exists in the collection at all; chapters are always sorted client-side by `chapterNumber`, no drag-to-reorder UI and nothing to call if there were
20. Batch/bulk chapter upload via presigned URL — ❌ (unused by design) — `POST /admin/audiobooks/upload-url` exists in the collection but is intentionally unused; the app always uses the single multipart chapter-create endpoint instead (mirrors Songs' unused upload-url endpoint)
21. List reviews — ✅ `GET /admin/audiobooks/reviews?audiobookId=`, built from scratch this session, mirrors the already-fixed Podcasts reviews unwrap
22. Filter reviews by rating — ❌ (not wired) — same gap as Podcasts reviews, contract documents a `rating` param, never sent
23. Filter reviews by hidden/visible — ❌ (not wired) — same, contract documents a `hidden` param, never sent
24. Hide / unhide a review — ✅ `PATCH /admin/audiobooks/reviews/{id}/moderate`
25. Delete a review — ✅ `DELETE /admin/audiobooks/reviews/{id}`
26. Analytics tab — ❌ (no API, and no tab at all) — unlike Videos/Podcasts, this module doesn't even have an empty-state Analytics tab; `GET /admin/audiobooks/{id}` has no analytics fields either, so it's consistent, just worth noting the tab itself doesn't exist here

### Known UI-copy inconsistency (found this pass, not fixed)
`UploadNewAudioBook.jsx`'s banner subtitle reads **"MP3 / WAV / FLAC · Max 100MB · Cover art min 1000×1000px"** — but that button only opens the **Create Audiobook** dialog, which has **no audio-file field at all** (only cover image + text fields; audio only ever gets added afterward, per-chapter, in the detail view). The MP3/WAV/FLAC copy describes chapter-audio formats and sits on the wrong dialog. Flagged, not changed — this pass was analysis only.

---

## 4. User Management (Admin)

1. List users (table + mobile cards) — ✅ `GET /admin/users`, reads `data?.admins` with `data?.data` fallback (fixed a prior session — the real key is `admins`, not `data`)
2. Filter by status (All/Active/Suspended/Banned) — ✅
3. Filter by role (user/artist/developer) — ❌ (not wired) — the contract documents `role` as a real filterable query param and `buildUsersParams` already validates/builds it when passed a value, but no dropdown or any UI control anywhere ever sets it — the table always shows every role mixed together with no way to isolate, say, just artists
4. Search by name/email — ✅
5. Pagination — ✅
6. View Details (dialog) — ⚠️ partial — shows only the summary row data passed in as a prop; does **not** re-fetch `GET /admin/users/{id}` on open, unlike every other detail dialog built this session (Songs/Videos/Podcasts/Audiobooks all re-fetch fresh detail data). `useUserDetail.js` and `getUserDetailRequest` exist in the codebase but are **dead code** — confirmed via full-codebase grep, `useUserDetail` is never imported anywhere. If a list row is stale (e.g. another admin just changed the user elsewhere), the dialog would show stale data with no way to refresh it short of closing and re-opening after a list refetch.
7. Suspend user — ✅ `PATCH /admin/users/{id}/suspend`
8. Ban user — ✅ `PATCH /admin/users/{id}/ban`
9. Reactivate user — ✅ `PATCH /admin/users/{id}/reactivate`
10. Delete user — ✅ `DELETE /admin/users/{id}` — correctly has no password-confirmation body, matching the contract (unlike Artist Verification's delete, which does require one)
11. Invite admin/developer — ✅ `POST /admin/users/invite`, role correctly restricted to `admin`/`developer` only (regular users/artists can't be admin-invited, matching the contract)
12. Edit user profile fields (name/email/etc.) — ❌ (no API) — no generic update endpoint exists in the contract at all; only the specific status-transition endpoints above exist. Correct-by-design, not a gap.
13. Stats cards (Total Users/Verified/Suspended-Banned/New This Month) — ⚠️ partial — computed client-side from only the **current page** of results (max `limit`, default 20 users), not a real server-side aggregate; no dedicated stats endpoint exists in the contract for this at all

---

## 5. Songs / Music (Admin)

1. List songs (table + mobile cards) — ✅ `GET /admin/songs`, reads `data?.song` (singular, with fallbacks)
2. Filter by status tabs (All/Draft/Pending/Scheduled/Active/Archived/Rejected) — ✅
3. Filter by genre — ✅
4. Filter by album — ❌ (not wired) — the contract documents `album` as a real filterable query param on `GET /admin/songs`, and `buildSongsParams` already builds/sends it when a value is passed — but `SongsContainer.jsx` has no Album filter dropdown at all, not even a disabled/commented-out one like Podcasts' category filter. The plumbing exists, nothing in the UI can trigger it.
5. Search by title/artist — ✅
6. Pagination — ✅
7. View Details (dialog) — ✅ re-fetches `GET /admin/songs/{id}` on open
8. Play song inline (full transport: play/pause/seek/rewind/forward/volume) — ✅
9. Edit — title, artist, genre, album, explicit, status/visibility, scheduledAt, featured, trending, replace audio, replace cover — ⚠️ **verified with an open caveat, not a confirmed bug**: the Postman collection's saved example for `PATCH /admin/songs/{id}` documents only 3 fields (`title`, `cover`, `audio`) with no accompanying description text listing anything else — but the actual Edit form sends up to 9 fields (`artist`, `genre`, `album`, `explicit`, `status`, `scheduledAt`, `isFeatured`, `isTrending` in addition to those 3). Given this session's established pattern of saved examples being stale/incomplete relative to the real deployed backend (confirmed 3 separate times already — Users, Audiobooks list, Audiobooks chapters), the most likely explanation is that this example is just a minimal test case, not an exhaustive field list — but I have no real captured response to confirm the backend actually accepts (rather than silently drops or 400s on) the extra fields. Flagging as unverified rather than asserting it works or is broken.
10. Delete song — ✅ `DELETE /admin/songs/{id}`
11. Approve (artist submission) — ✅ `PATCH /admin/songs/{id}/approve`
12. Reject (artist submission, with reason) — ✅ `PATCH /admin/songs/{id}/reject`
13. Take Down (Active → Archived) / Restore — ✅ via `PATCH /admin/songs/{id}` with `{status}`
14. Create new song — title, artist, genre, status, cover, audio — ✅ matches the documented Create formdata exactly for these 6 fields
15. Create new song — album selection, explicit toggle — ⚠️ same open caveat as #9: the Create form's `AdminSongFormFields` also collects and sends `album` (when one is picked) and `explicit`, neither of which appears in the Postman collection's documented Create formdata (`title`/`artist`/`genre`/`status`/`cover`/`audio` only). Unverified whether the live backend accepts these on create or silently ignores them — not confirmed as a bug, just not confirmed as correct either.
16. Moderation trail display (submitted status/at, reviewed by/at, rejection reason, transcode status) — ✅ Mongo-ref-safe rendering
17. Analytics tab — ❌ (no API) — `GET /admin/songs/{id}` returns no analytics/chart data; honest empty state, chart JSX preserved but commented out for later
18. Upload-progress tracking after Create/Edit with new audio — ⚠️ partial — both create and update-with-new-audio resolve with a `trackingId` and rely on the list's periodic refetch (per the project's React Query auto-refresh) to eventually show the processed result; there's no visible "processing..." progress indicator or SSE subscription to `GET /uploads/{trackingId}/progress` (that endpoint exists in the contract but has zero code anywhere in the app — same for Audiobooks' chapter uploads). The admin just has to wait and it updates on its own within the next auto-refresh window; not broken, just not real-time.

---

## What "No API" vs "not wired" means here

- **No API** — checked against the full Postman collection across all three role sections (User, Artist, Admin), not just the Admin folder. No such endpoint exists anywhere for the admin role to call.
- **Not wired** — the endpoint/field exists and is documented in the contract (sometimes under a different role, called out explicitly when so), but no frontend code in the admin module currently calls or sends it.

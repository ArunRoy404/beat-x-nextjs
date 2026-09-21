# Admin Modules — API Integration Audit

Generated from a full pass over the codebase (`src/app/admin`, `src/templates/admin`, `src/components/admin`, `src/hooks/api/admin`, `src/services/admin`) cross-checked field-by-field against `postman/BeatX-RoleBased.postman_collection.json` (ADMIN folder only — user/artist folders out of scope).

Rules applied:
- ✅ = the full round trip is wired: UI action → hook → service → a real endpoint documented in Postman with a success example, with matching payload fields both ways.
- ❌ = any part is broken or missing — API doesn't exist in Postman, UI doesn't call any API (dummy/local state), a required field is missing on either side, an enum/dropdown doesn't match the backend's accepted values, or only a small piece of a feature is incomplete. A feature is **never** marked ✅ if any part of it is incomplete.

---

## 1. Admin Overview (Dashboard)
 - ✅ GET /admin/dashboard wired end-to-end — `dashboardServices.js:getAdminDashboardOverviewRequest` → `useAdminDashboard` → `AdminDashboardOverviewPage.jsx`
 - ✅ SSR prefetch + HydrationBoundary in `src/app/admin/dashboard/overview/page.jsx` using `queryKeys.dashboard.overview()`, same key consumed by `useAdminDashboard`
 - ✅ `src/app/admin/dashboard/page.jsx` redirects to `/admin/dashboard/overview` (not a duplicate competing route)
 - ✅ Stat cards (totalUsers, totalSongs, activeArtists, totalAudiobooks+totalPodcasts) — real fields, optional-chained
 - ✅ AdminGreeting banner (activeUsers, pendingVerification, pendingContentReview.length, activeArtists, pendingPayoutsCount, revenueMTD in ৳) — real fields
 - ✅ PlatformGrowth chart (streams/followers by month) — real fields
 - ✅ GenreMix chart — real fields
 - ⚠️/❌ RevenueStreams chart — `store`/`events` are real fields, but `subscription` is hardcoded to `0` in the mapping since the API doesn't return a subscription figure; the chart still renders a "Subscription" series that always reads 0 as if it were real data
 - ✅ RecentUploads list — real fields (title/coverUrl/playCount/status/contentType)
 - ✅ RecentActivity embedded widget — real fields (type/message/createdAt)
 - ✅ UpcomingEvents widget — real fields (title/venue/city/eventDate/ticketsSold/totalTickets/status)
 - ✅ `/admin/dashboard/overview` registered in `src/lib/revalidate/isrPaths.js`
 - ❌ No dedicated paginated Activity Log page exists anywhere in `src/app/admin` — the documented `GET /admin/activity?page=&limit=` endpoint is never called; only the dashboard's embedded `recentActivity` slice is shown, with no "View All"/drill-down and no pagination

## 2. Admin Analytics
 - ✅ GET /admin/analytics?range= wired end-to-end — `analyticsServices.js:getAdminAnalyticsRequest` → `useAdminAnalytics` → `AdminDashboardAnalyticsPage.jsx`
 - ✅ SSR prefetch + HydrationBoundary in `src/app/admin/dashboard/analytics/page.jsx`, shared query key with client hook
 - ✅ Range picker supports all 5 Postman-documented ranges: 7d, 30d, 3m, 6m, 1y
 - ✅ Range state lives in the URL via `useUrlListParams` (`range` param), not local `useState`
 - ✅ Stat cards (totalStreams, listeners, followerGrowth, avgListenTimeMs) with changePercent — real fields
 - ✅ GrowthOverview chart — real fields
 - ✅ PeakListeningHours chart — real fields
 - ✅ GenreDistribution chart — real fields
 - ✅ `/admin/dashboard/analytics` registered in `isrPaths.js`
 - ✅ No dummy data / zustand store leftover

## 3. Admin Users
 - ✅ List Users — GET /admin/users with status/q/page/limit, matches Postman
 - ❌ Role filter — API supports `role` (user/artist/developer) per Postman example, but no role filter control exists anywhere in the UI (only status tabs + search) — capability unreachable
 - ✅ Status filter tabs (All/Active/Suspended/Banned) — wired via URL state into SSR prefetch
 - ✅ Search (`q`) — wired to GET /admin/users?q=, server-prefetched
 - ✅ Pagination — page/limit sent, CommonPagination driven by response total/totalPages
 - ❌ View User Detail — dedicated GET /admin/users/{id} endpoint exists and a `useUserDetail` hook exists in code, but it is never imported/used anywhere; the detail dialog just reuses the row object from the list response
 - ✅ Invite Admin/Developer — POST /admin/users/invite with `{email, role}`, matches Postman exactly
 - ✅ Invite role picker — options are `admin`/`developer`, matches documented enum
 - ❌ Invite form missing `name` field — Postman documents an optional `name` field on the invite payload; the UI form only collects email and role
 - ⚠️/❌ Suspend User — PATCH /admin/users/{id}/suspend with `{reason}` wired correctly, but the UI never lets the admin type a reason — it's hardcoded to a fixed string on every call
 - ⚠️/❌ Ban User — same issue: PATCH /admin/users/{id}/ban with `{reason}` wired, but reason is a hardcoded constant, not an admin-entered value
 - ✅ Reactivate User — PATCH /admin/users/{id}/reactivate, no body required, matches
 - ✅ Delete User — DELETE /admin/users/{id}, matches
 - ❌ List Admins (GET /admin/admins) — zero code, no dedicated staff-only list page exists
 - ❌ Invite Admin duplicate (POST /admin/admins/invite) — confirmed unused; `/admin/users/invite` is the only wired invite route
 - ❌ Stats cards (Total/Verified/Suspended-Banned/New This Month) — computed client-side from only the current page of the users array, not true platform-wide totals (no dedicated stats endpoint is called)

## 4. Admin Artists (Verification Queue)
 - ❌ Status tabs mismatch — UI tabs are All/Pending/Approved/Suspended/Rejected and send `tab=approved` / `tab=rejected` directly to the API, but the documented enum is only `all | verified | pending | suspended` — "Approved" should map to `verified`, and "Rejected" has no backing tab value at all
 - ❌ Search param (`q`) sent to the list endpoint is not documented anywhere in the Postman "List Artists" example (only `tab`, `page`, `limit` shown)
 - ✅ List Artists queue (pagination, stats cards) — GET /admin/artist-verification, response fields consumed correctly
 - ✅ Pagination — CommonPagination wired to URL page param, matches
 - ✅ Get Verification by Id (detail dialog) — GET /admin/artist-verification/{id}, fetched lazily on open
 - ❌ Overview tab hardcodes "Artist Category: Singer" instead of reading the real `personalInfo.artistCategory` field from the API — fabricated data
 - ❌ Overview tab document-type fallback fabricates `"National ID Card"` instead of a real empty-state marker
 - ❌ KYC tab document-type fallback fabricates `"NATIONAL ID CARD"` — same fabrication issue
 - ❌ Genres fallback fabricates `["pop"]` when an artist has no genres, instead of showing an empty state
 - ✅ Identity docs display (front/back/selfie) — real fields
 - ✅ Document checklist toggle — PATCH .../checklist, body fields match exactly
 - ✅ Social links checklist toggle — PATCH .../social-links/checklist, body fields match exactly
 - ✅ Mark Tab Reviewed — Overview — PATCH .../review/overview `{reviewed:true}`, matches
 - ✅ Mark Tab Reviewed — Media Assets — PATCH .../review/media_assets `{reviewed:true}`, matches
 - ✅ Media assets tab (profile picture) — real field; "Additional Materials" (media kit/press release) correctly left as static non-functional UI since no API field backs it
 - ✅ Approve Artist — PATCH .../approve, matches
 - ✅ Reject Artist — PATCH .../reject, all 7 reasonCode enum values present and match exactly, plus note field
 - ✅ Request More Info — PATCH .../request-info, all 5 items enum values match exactly, plus optional message
 - ❌ Suspend Artist — endpoint wired correctly, but the UI has no input for the required `reason` string; it's hardcoded to a fixed string on every suspend
 - ✅ Reactivate Artist — PATCH .../reactivate, matches
 - ✅ Update Artist Genres — PATCH .../genres, `{genres:[...]}` matches exactly
 - ✅ Delete Artist (password-confirmed, destructive) — DELETE with `{password}` body, full round trip matches
 - ❌ "Add Artist" / Register New Artist — no create-artist endpoint exists in Postman at all; the real trigger is correctly disabled (shows a toast), but the fully-built form/dialog/schema for it remains as dead code with a fake `console.log`/`toast.success` submit handler instead of being removed

## 5. Admin Songs (Music)
 - ✅ List Songs table — GET /admin/songs, response shape matches
 - ✅ Status filter tabs (Draft/Pending/Scheduled/Active/Archived/Rejected) — "Pending" correctly maps to wire value `pending_review`, matches enum
 - ✅ Genre filter — sent as `genre` param, no client-side filtering
 - ✅ Search — debounced, sent as `q` param, no client-side filtering
 - ✅ Pagination — page/limit sent as params
 - ❌ Dashboard stat cards ("Total Songs", "Total Streams", "Published", "Drafts") read a `stats` object that does not appear anywhere in the documented GET /admin/songs response
 - ✅ View Song Details dialog — GET /admin/songs/{id}, opened lazily
 - ✅ Upload New Song (audio + cover + title/artist/genre/status) — POST /admin/songs multipart, matches documented formdata keys exactly
 - ❌ Upload New Song "Album" field — appended to the Create request's payload, but `album` is not part of the documented Create Song formdata keys (only documented on Update)
 - ❌ Upload New Song "Explicit Content" toggle — same issue: `explicit` is sent on create but is not in the documented Create Song formdata keys
 - ❌ Upload New Song "Schedule" visibility + scheduledAt date picker — `scheduledAt` is documented only on the Update DTO; the Create endpoint's documented body has no `scheduledAt` field, so scheduling a brand-new song sends an undocumented field the create endpoint doesn't accept
 - ✅ Edit Song (title/artist/genre/album/explicit/status/scheduledAt) — PATCH /admin/songs/{id}, field names match the Update DTO exactly
 - ✅ Edit Song "Featured" toggle — matches documented `isFeatured`, correctly omitted from Create
 - ✅ Edit Song "Trending" toggle — matches documented `isTrending`, correctly omitted from Create
 - ❌ `trendDirection` (enum up/down/stable) — documented as an accepted/editable Update field and even displayed read-only in the detail view, but there is no UI control to actually set it — an admin can never change it
 - ✅ Take Down / Restore — JSON-only PATCH `{status:"archived"|"active"}`, matches
 - ✅ Approve Song (artist submission) — PATCH .../approve, no body, gated correctly to pending submissions only
 - ✅ Reject Song (artist submission) — PATCH .../reject `{reason}`, matches, client validates non-empty reason
 - ✅ Delete Song — DELETE /admin/songs/{id}, handles 204 response correctly
 - ✅ Song Analytics tab — correctly left as a commented-out placeholder with an empty-state message since the API has no analytics fields for songs (not faked)
 - ✅ URL-driven filter/search/pagination state, SSR/ISR registration, and query-key sharing all correctly wired
 - ✅ No dummy data / zustand store leftover for admin Songs

## 6. Admin Albums
 - ✅ List Albums table — GET /admin/albums, all fields match the Postman example
 - ✅ Status filter tabs (All/Draft/Scheduled/Active/Archived) — matches enum
 - ✅ Genre filter dropdown — sends real `genre` id param
 - ✅ Search box — debounced, URL-driven
 - ✅ Pagination — matches
 - ✅ SSR prefetch + `/admin/dashboard/albums` registered in `isrPaths.js`
 - ✅ Create Album — FormData with title/artist/genre/explicit(stringified)/status/scheduledAt(if scheduled)/cover → POST /admin/albums; field names match Postman formdata keys exactly; correctly omits `isFeatured` on create per the documented contract
 - ✅ Get Album by Id (view details dialog) — GET /admin/albums/{id}, response shape matches
 - ❌ Songs-within-album list rendering — the detail view treats `album.songs` as a plain array (`.length`/`.map`), but the real API response nests it as a paginated wrapper (`songs.data: [...]`, same shape as the list envelope) — the tracklist silently renders "No songs attached to this album yet." for every album instead of the real songs
 - ✅ Edit Album (title/artist/genre/explicit/status/scheduledAt/isFeatured) — PATCH /admin/albums/{id}, field-for-field match
 - ✅ Edit Album cover replace — separate PATCH /admin/albums/{id}/cover multipart call, matches (correctly kept separate since the JSON update endpoint can't replace the cover)
 - ✅ Take Down / Restore — same PATCH endpoint with status archived/active, matches
 - ✅ Delete Album — DELETE /admin/albums/{id}, confirmation copy correctly explains songs are detached not deleted
 - ✅ Album Detail header stats and Details tab fields — all sourced from documented fields
 - ✅ Album Detail Analytics tab correctly left as a commented-out placeholder since the API has no analytics fields for albums (not faked)
 - ✅ No dummy data / zustand store leftover for admin Albums

## 7. Admin Videos
 - ✅ List Videos grid — GET /admin/videos, matches Postman response shape
 - ✅ Status filter tabs (All/Draft/Pending/Scheduled/Active/Archived/Rejected) — "Pending" correctly maps to wire value `pending_review`
 - ✅ Genre filter dropdown — options come from the real GET /genre endpoint, not dummy data
 - ✅ Search box (`q`) — real query param
 - ✅ Pagination — matches
 - ✅ "Total Videos" stat card — real `total` from the response, no fabricated fallback
 - ❌ Upload Video banner button — correctly disabled (shows a toast); no create-video endpoint exists in Postman at all (video creation is only documented via a different module's `/creator/videos` route)
 - ✅ View Details modal — GET /admin/videos/{id}, matches
 - ❌ Details tab "Submitted Status / Submitted At / Reviewed By / Reviewed At / Rejection Reason" fields — these keys do not appear anywhere in the documented GET/PATCH /admin/videos response bodies — unverified/likely-fabricated field names
 - ❌ Analytics tab — no per-video analytics endpoint exists; UI correctly shows an honest empty-state with the design commented out rather than faking data, but the capability is non-functional
 - ✅ Approve (artist submission) — PATCH .../approve, matches, gated correctly
 - ✅ Reject (artist submission) with reason — PATCH .../reject `{reason}`, matches exactly
 - ✅ Take Down — PATCH `{status:"archived"}`, matches
 - ✅ Restore — PATCH `{status:"active"}`, matches
 - ✅ Delete Video — DELETE /admin/videos/{id}, handles 204 correctly
 - ❌ Edit Video "Trending" toggle — the API documents a `trendDirection` enum (up/down/stable) alongside `isTrending`, but the Edit form's Trending toggle never sends `trendDirection` — trending can be turned on with no direction ever set
 - ❌ Edit Video owner reassignment — the API documents an admin-only `ownerId` reassignment field on PATCH, but no form control exposes it anywhere
 - ❌ Edit Video "Scheduled" status — the status dropdown only offers Active/Draft/Archived; there is no way to set status to "scheduled" nor any date/time input for the required `scheduledAt` field, even though the API supports it
 - ❌ Cover/Thumbnail replacement — correctly disabled with an explanatory toast (PATCH is JSON-only, cannot replace files), but the capability itself does not exist
 - ✅ Play/stream preview — consumes fields already present on the GET response, correctly no-ops with a toast if unavailable

## 8. Admin Podcasts
 - ✅ List Podcasts table — GET /admin/podcasts, matches
 - ✅ Status filter tabs (All/Draft/Pending/Scheduled/Active/Archived/Rejected) — "Pending" correctly maps to `pending_review`
 - ✅ Search box (`q`) — debounced, URL-driven (mirrors the pattern used in sibling modules)
 - ❌ Genre/Category filter dropdown — intentionally commented out in the container; category is shown read-only in the table/cards only, never filterable
 - ✅ Pagination — matches
 - ✅ "Total Podcasts" stat card — real unfiltered total, not dummy
 - ✅ View Details dialog header/basic fields — GET /admin/podcasts/{id}, matches
 - ❌ Episodes list inside podcast details — the UI assumes the detail response nests episodes as `episodes.data` and renders episode fields (episodeNumber, seasonNumber, durationMs, playCount, status, etc.), but the Postman example response for Get Podcast by Id never actually documents an `episodes` key or episode schema — this shape is unverified against the collection
 - ❌ Create Podcast — posts to the correct shared `/creator/podcasts` route with title/description/language/category/status/scheduledAt/cover, BUT the documented formdata also includes `ownerId` and the UI has **no artist/owner picker field at all**, so `ownerId` is never sent
 - ❌ Edit Podcast — form only submits description/status/scheduledAt/isFeatured/isTrending/trendDirection to PATCH /admin/podcasts/{id}; the endpoint also documents `title`, `language`, `category`, `ownerId` as editable, none of which are exposed in the form (the form's own code comments admit this is unfinished)
 - ❌ Cover image update after creation — the API documents a separate PATCH /admin/podcasts/{id}/cover (multipart) endpoint for replacing the cover, but no service/hook/UI anywhere calls it or exposes a re-upload control — the cover can only be set once, at creation
 - ✅ Approve podcast (artist submission) — PATCH .../approve, matches, gated correctly
 - ✅ Reject podcast (artist submission) — PATCH .../reject `{reason}`, matches
 - ✅ Take Down / Restore — PATCH with status archived/active, matches
 - ✅ Delete Podcast — DELETE /admin/podcasts/{id}, matches
 - ✅ Reviews tab: list reviews — GET /admin/podcasts/reviews?podcastId, correctly reads the nested `reviews` array
 - ✅ Reviews tab: hide/unhide review — PATCH .../moderate `{hidden, reason}`, matches
 - ✅ Reviews tab: delete review — DELETE .../reviews/{id}, matches
 - ❌ Analytics tab — no backend endpoint exists for per-podcast analytics; correctly shown as an honest empty state rather than fake data, but the tab has zero API round trip
 - ✅ Podcast category consumption — correctly read-only from the public GET /category endpoint; no admin category CRUD UI exists anywhere, which matches the fact that no such CRUD UI has been built yet

## 9. Admin Audiobooks
 - ✅ List audiobooks (grid) — GET /admin/audiobooks, matches
 - ✅ Status filter tabs (All/Draft/Active/Archived) — matches enum
 - ✅ Genre filter dropdown — sends real genre id param
 - ✅ Search box — debounced, URL-driven
 - ✅ Pagination — matches, SSR-prefetched and registered in `isrPaths.js`
 - ✅ Total Audiobooks stat card — real total, no fabricated fallback
 - ✅ View Details dialog — GET /admin/audiobooks/{id}, correctly unwraps `{book, chapters, userProgress}` including the paginated `chapters.data` shape
 - ✅ Create Audiobook — POST /admin/audiobooks multipart, all fields (title/author/narrator/synopsis/language/genre/status/cover) match Postman exactly; cover required client-side matching the backend's validation
 - ❌ Edit Audiobook metadata — the form collects a required `publishedAt` field, but the submit payload never actually includes it — the value is silently dropped and never sent to the API
 - ❌ Universe (prequel/sequel linking) — the PATCH payload documents a `universe: [{audiobookId, relation}]` field, but no UI control exists anywhere to view or edit it
 - ✅ Bestseller/Trending/Featured flags + bestsellerRank/trendDirection — sent conditionally in the PATCH payload, matches
 - ✅ Take-down/restore via status field — reuses the same PATCH endpoint, matches
 - ✅ Cover image update — PATCH /admin/audiobooks/{id}/cover multipart, matches
 - ✅ Delete Audiobook — DELETE /admin/audiobooks/{id}, matches
 - ❌ Create Chapter (audio upload) — the file picker and label accept WAV/FLAC in addition to mp3/mp4/aac/ogg, but the backend only accepts audio/mpeg, audio/mp4, audio/aac, audio/ogg and returns a 400 for wav/flac — the UI still lets users pick/submit formats guaranteed to fail server-side
 - ❌ Update Chapter (replace audio) — same file-type mismatch on the inline "Replace Audio" control
 - ✅ Update Chapter (title-only) — PATCH .../chapters/{id}, matches
 - ✅ Delete Chapter — DELETE .../chapters/{id}, matches
 - ❌ Chapter upload progress — the API documents an SSE progress endpoint (`GET /uploads/{trackingId}/progress`) for tracking long transcodes after the initial 201, but the UI has zero progress indicator and relies purely on toast + periodic refetch, so large uploads (up to 2GB per the UI's own copy) give no feedback until the next auto-refresh
 - ❌ Presigned chapter-upload-URL flow — the service function for it exists in code but has zero callers anywhere (dead code); non-blocking since Postman marks this endpoint optional-by-design, but per strict audit it's unwired
 - ✅ Reviews list — GET /admin/audiobooks/reviews?audiobookId, matches
 - ✅ Review hide/unhide (moderate) — PATCH .../moderate `{hidden, reason}`, matches
 - ✅ Review delete — DELETE .../reviews/{id}, matches
 - ✅ No dummy data / zustand store leftover for admin Audiobooks

## 10. Admin Genre
 - ✅ List genres — GET /genre, page+limit, URL-driven
 - ✅ Search genres by name — GET /genre/search?name=, debounced, switches list↔search query correctly
 - ✅ Pagination — matches
 - ✅ Create genre — POST /genre `{name}`, matches Postman exactly
 - ✅ Edit genre — PATCH /genre/{id} `{name}`, matches
 - ✅ Delete genre — DELETE /genre/{id}, matches
 - ✅ Stats cards (Total Genres, New This Month) — computed client-side from the real fetched genre list, no fabricated data
 - ✅ SSR prefetch + `/admin/dashboard/genre` registered in `isrPaths.js`
 - ✅ No dummy data / zustand store leftover for Genre
 - ❌ No Podcast Categories management tab/UI anywhere in the Genre module or elsewhere in the admin app — category CRUD (create/update/delete category) remains completely unwired: no service, hook, form, or dialog exists for it, even though the backend supports it

## 11. Admin Tours (Events)
 - ✅ Dashboard stats (Total Events, Ticket Revenue, Ticket Sold, Completed) — GET /admin/events/dashboard, SSR-prefetched, registered in `isrPaths.js`, fields match
 - ✅ List/table view — GET /admin/events, SSR-prefetched with the same query key as the client
 - ❌ Status filter tabs — UI tabs are All/Upcoming/Live/Completed/Under Review/Sold Out/Rejected, but the documented backend status enum for events is only `draft|scheduled|active|completed|archived` — none of "upcoming", "live", "under_review", "sold_out", "rejected" are documented backend values; the filter is unverified/likely non-functional
 - ✅ Search (`q`) — URL-driven
 - ✅ Pagination — matches
 - ✅ View Event Details (Details tab) — GET /admin/events/{id}, fields match
 - ✅ Event Analytics tab — GET /admin/events/{id}/analytics, all displayed fields match exactly
 - ❌ Create Event form fields — the form only collects coverImage/eventTitle/venue/city/eventDate/eventTime/ticketPrice/totalTickets/description/visibility; the API also accepts `genreTag` and `coinReward` on create, neither of which has a UI field (genreTag is even displayed elsewhere in the UI, but can never be set)
 - ✅ Create Event → correct endpoint — POST /creator/events, matches the documented create route
 - ❌ Create Event `ownerId` — code conditionally appends an `ownerId` value to the request, but no dropdown/field exists anywhere to set it — always undefined, dead code path
 - ❌ Create Event "Schedule" status value — sends the literal string `"schedule"` instead of the valid backend enum value `"scheduled"`, and never collects/sends the required `scheduledAt` date — scheduling an event silently sends invalid/incomplete data
 - ❌ Edit Event fields — same field set as Create (no genreTag, coinReward, livestreamUrl, or scheduledAt editable), despite all four being documented PATCH fields
 - ❌ Owner reassignment — no dropdown/select exists anywhere to reassign an event's owning artist, despite the API documenting an `ownerId` reassignment field; the dead code path that would use the dedicated JSON `/admin/events/{id}` endpoint is never actually triggered by any UI action
 - ❌ Edit Event "Schedule" status — same `"schedule"` vs `"scheduled"` bug as Create, and still no `scheduledAt` date/time picker
 - ✅ Delete Event — DELETE /admin/events/{id}, matches
 - ❌ "Under Review" Approve/Reject actions — the dialog renders full Approve/Reject buttons with a rejection-reason dropdown and note fields, but both buttons are non-functional stubs with no `onClick`/mutation — and no approve/reject/moderate endpoint exists for events in Postman at all, so this entire moderation UI is decorative
 - ❌ `livestreamUrl` field — documented as settable/returned by the API, but not displayed or editable anywhere in the UI
 - ❌ `coinReward` field — part of every event API response, but never surfaced anywhere in the UI (not on the card, not in detail, not editable)

## 12. Admin Shop (Products)
 - ✅ Dashboard stats — GET /admin/products/dashboard, all 4 stat cards mapped correctly, currency correctly shown in ৳
 - ✅ Product list/grid — GET /admin/products, SSR-prefetched and registered in `isrPaths.js`
 - ❌ Status filter tabs — UI tabs are All/Active/Out of Stock/Draft/Under review/Rejected, but the documented backend status enum is only `draft|scheduled|active|archived` — "Out of Stock", "Under review", "Rejected" are not valid backend values, and the List endpoint doesn't document a status/q/page/limit param at all
 - ✅ Search box — wired to `q` param (same undocumented-param caveat as above)
 - ✅ Pagination — wired (same caveat)
 - ✅ View product detail — GET /admin/products/{id}, all documented fields rendered including read-only colorVariants swatches
 - ✅ Product analytics tab — GET /admin/products/{id}/analytics, all fields match
 - ❌ Create product — no create-product capability exists anywhere: the real create dialog/form is fully commented out and replaced with a "feature unavailable" toast stub, correctly matching that there is no admin create-product endpoint (products can only be created from the Artist side) — but the dead form code (`AddProductForm.jsx`) remains unused in the tree
 - ❌ Edit product — category dropdown mismatch: UI offers Apparel/Vinyl/Accessories/Bags/Posters/Other, but the backend enum is `apparel|vinyl|accessories|digital-art|gear` — "Bags"/"Posters"/"Other" are invalid, and "digital-art"/"gear" are missing entirely
 - ❌ Edit product — no owner-reassignment control, despite the PATCH payload documenting `ownerId` for reassigning the owning artist
 - ❌ Edit product — colorVariants not editable; only `hasSizeVariants`/`availableSizes` are exposed, despite the API documenting a full `colorVariants:[{name,hex,stock}]` field
 - ❌ Edit product — image upload control is fully wired in the form (validated, rendered) but the submit handler never actually includes the images field in the outgoing payload — nothing is ever sent
 - ❌ Edit product — "Schedule" visibility option is broken: selecting it actually submits `status:"active"`, never `"scheduled"`, and there is no `scheduledAt` date input anywhere despite the API requiring it for scheduled status
 - ❌ Approve/Reject moderation UI (shown for "under review" products) — sends `status:"rejected"`, a `rejection:{reason,note}` object, and an `adminNote` field, none of which are documented PATCH fields (valid status enum is only draft|scheduled|active|archived) — this entire moderation workflow has no basis in the documented API contract
 - ✅ Delete product — DELETE /admin/products/{id}, matches (no body required)
 - ❌ Delete product password confirmation — the delete form collects a password field with validation, but it is never read or sent anywhere; the DELETE call ignores it entirely and the endpoint takes no body

## 13. Admin Subscriptions
 - ❌ Entire module (stats cards, Subscription Plan Cards, Subscription Charts, Subscribers Table, Add/Edit Plan modal) — 100% powered by a Zustand store (`adminSubscriptionsStore`) with hardcoded local data; **no Postman endpoint for subscriptions exists anywhere in the ADMIN, ARTIST, or USER folders of the collection**, no service file, no hook, no API call of any kind
 - ❌ Add/Edit Plan modal — form submits only to local Zustand state, never calls any API
 - ❌ Subscriber list — entirely dummy data, no list/filter/search/pagination hits any endpoint

## 14. Admin Roles & RBAC
 - ❌ Entire module (stats cards, Role Cards Grid, Edit Role modal) — 100% powered by a Zustand store (`adminRolesRbacStore`) with hardcoded local roles/permissions data; **no Roles/RBAC/permissions endpoint exists anywhere in the Postman collection**
 - ❌ Invite Admin Modal — collects email/role/message in local component state only; despite a real, working `POST /admin/users/invite` endpoint and `useInviteUser` hook already existing elsewhere in the codebase (used correctly by the Users module), this modal never calls it — the invite button does not send any request
 - ❌ Edit Role modal — edits title/member count/permissions purely in Zustand state, no backing endpoint exists to persist role/permission changes

## 15. Admin Settings
 - ❌ Entire module (all toggle sections, Danger Zone actions) — 100% powered by a Zustand store (`adminDashboardSettingsStore`) with hardcoded local toggle state; matches Postman's own note that the page is "100% dummy/zustand-driven"
 - ❌ Setting toggles — flipping any toggle only updates local Zustand state; no PATCH is ever sent even though a `GET/PATCH /admin/settings` endpoint is documented in Postman
 - ❌ "Clear Cache" button — shows a canned success message; no `POST /admin/settings/clear-cache` request is ever sent
 - ❌ "Reset Analytics Cache" button — shows a canned success message; no `POST /admin/settings/reset-analytics` request is ever sent

## 16. Admin Profile
 - ✅ Get My Profile — GET /users/me, SSR-prefetched with a matching query key
 - ✅ Get Login History — GET /auth/login-history, SSR-prefetched with a matching query key
 - ✅ Account Information card (avatar, name, email, role, provider, isVerified, createdAt, updatedAt, lastActiveAt) — all real fields, no fabricated fallbacks
 - ✅ Stats cards (Coin Balance, Account Status, System Role, Auth Provider) — real fields
 - ✅ System Preferences display (language, theme, enablePasscode, allowEmailNotification, etc.) — real fields, correctly read-only (no fake toggle state)
 - ✅ Favorites card — real counts of favorite songs/artists/genres/videos
 - ✅ Login history table/cards — real ip/device/at fields
 - ❌ No Edit Profile UI anywhere on the page — a working `PATCH /users/profile` endpoint (name/phone/avatar) and a matching hook/service already exist elsewhere in the codebase (used by the regular user profile flow), but nothing in the admin profile screen wires them up — the admin can never edit their own name/phone/avatar
 - ❌ No Avatar Upload control — the avatar is display-only, despite the backend endpoint accepting an avatar file
 - ❌ No Change Password UI anywhere on the page — a working `PATCH /users/change-password` endpoint and matching hook/service already exist elsewhere in the codebase, but it's never rendered for admins
 - ❌ "System Preferences" toggle rows (Passcode Lock, Email Notifications, SMS, Search History tracking, Usage Data, Wi-Fi Only) — rendered as static rows with no click handler; consistent with there being no documented settings-update endpoint, but the card styling implies these should be interactive toggles and none of them are

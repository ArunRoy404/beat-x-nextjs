# BeatX Admin Dashboard — API Integration Audit

Source of truth: `postman/BeatX-RoleBased.postman_collection.json` (ADMIN folder). Scope: `src/app/admin/**` only.

## Legend
- ✅ Done & correct
- ⚠️ Needs adjustment (integrated but has bugs/gaps)
- 🆕 New API, not integrated (backend supports it, frontend doesn't use it yet)
- ❌ No backend exists for this concept, or total absence of both backend+frontend work
- 🧟 Orphaned code (hooks/service exist, wired to nothing)

## Summary table

| # | Module | Status | Headline issue |
|---|---|---|---|
| 1 | Artist Verification | ✅ | Fully correct, all 12 endpoints wired, nothing to fix |
| 2 | Genres | ✅ | Fully correct |
| 3 | Albums | ✅ | Fully correct |
| 4 | Dashboard (Overview) | ✅ | Fully correct |
| 5 | Analytics | ✅ | Fully correct |
| 6 | Admin Profile | ✅ | Fully correct |
| 7 | Songs/Music | ⚠️ | `pending` vs `pending_review` string bug hides Approve/Reject for real submissions |
| 8 | Videos | ⚠️ | Same enum bug, backwards — gates `draft` instead of `pending_review`; dead broken file |
| 9 | Podcasts + Reviews | ⚠️ | Same enum bug; **create flow is a fake stub**, never calls real endpoint |
| 10 | Audiobooks + Reviews | ⚠️ | No take-down/restore UI at all; **review moderation entirely unbuilt** |
| 11 | Events/Tours | ⚠️ | Edits route to wrong endpoint; status enum UI doesn't match backend; typo bug |
| 12 | Merch/Shop | ⚠️ | Category & status enums don't match backend; no color-variant UI |
| 13 | User Management | ⚠️ | Lists from wrong/legacy endpoint; every action (suspend/ban/delete/invite) is a "coming soon" toast |
| 14 | Platform Settings | 🆕 | 100% dummy/zustand, zero backend wiring despite 4 ready endpoints |
| 15 | Scheduler | 🧟/❌ | 2 of 6 endpoints stubbed but unused by any page; no page exists at all |
| 16 | Activity Log | ⚠️ | Only a dashboard widget slice, no dedicated paginated/filterable page |
| 17 | Support Tickets | ❌ | Zero code anywhere — full build needed |
| 18 | Payouts | ❌ | Zero code anywhere — full build needed |
| 19 | Admins/Staff accounts | ❌ | Zero code anywhere; "Invite Admin" UI is a fake `alert()` |
| 20 | Roles & RBAC | ❌ | No backend concept exists at all; fully mock |
| 21 | Subscriptions | ❌ | No backend concept exists at all; fully mock |
| 22 | Categories (podcast) | 🆕 | Zero code anywhere; podcast create form hardcodes a fake category list |
| 23 | Uploads/progress (SSE) | ❌ | `trackingId` returned and discarded everywhere; no progress UI |

---

## ✅ Done & correct (no action needed)

### 1. Artist Verification — `src/app/admin/dashboard/artists`
All 12 endpoints (list/detail/checklist/social-checklist/review-overview/review-media/approve/reject/request-info/suspend/reactivate/genres/delete) implemented with exact URL and body shapes. Reject reason-code enum and request-info items enum match the backend exactly. Password-confirmed delete is correct. All 10 mutation hooks put toast + `invalidateQueries` inside the hook (not the component), per project convention. SSR prefetch correct.

### 2. Genres — `src/app/admin/dashboard/genre`
`POST/PATCH/DELETE /genre` match exactly, plus reasonable extras (`GET /genre`, `GET /genre/search`) for dropdowns elsewhere. Full CRUD UI, hooks correctly self-contained, SSR prefetch correct.

### 3. Albums — `src/app/admin/dashboard/albums`
Every service function matches contract (list/detail/create/update/status/cover/delete). Take-down/restore wired via `useUpdateAlbumStatus`. SSR prefetch correct. No dummy data left.

### 4. Dashboard (Overview) — `src/app/admin/dashboard` + `.../overview`
`/admin/dashboard` is an intentional redirect stub to `/overview`, which owns the real `GET /admin/dashboard` integration (SSR prefetch, correct query key reuse client-side, real fields throughout, registered in `isrPaths.js`). Two routes by design, not a bug.

### 5. Analytics — `src/app/admin/dashboard/analytics`
`range` enum (`7d|30d|3m|6m|1y`) whitelisted correctly in a shared params builder used both server- and client-side. SSR prefetch + `isrPaths.js` correct.

### 6. Admin Profile — `src/app/admin/profile` + `.../dashboard/profile`
Same redirect-stub + real-owner pattern as Dashboard. `GET /users/me` + `GET /auth/login-history` both prefetched in parallel, correct dynamic-rendering justification (no invalid `revalidate` literal). Nothing to fix.

---

## ⚠️ Needs adjustment

### 7. Songs/Music — `src/app/admin/dashboard/music`
Service and create flow are real and correct (formdata fields match contract). One systemic bug:
- **`src/lib/constants/songStatus.js`**: the alias map has `pending` but the real backend enum value is `pending_review`, which is never aliased. Result: `isSongAwaitingReview()` never returns true for a real artist submission, so Approve/Reject buttons never appear for genuinely pending songs, and the "Pending" filter tab sends `status=pending` (wrong value) to the API.
- Filter tabs (`SongsContainer.jsx`) omit `scheduled` and `rejected`.
- Fix: add `pending_review: SONG_STATUS.PENDING` to the alias map (or rename the constant), and add the two missing filter tabs.

### 8. Videos — `src/app/admin/dashboard/videos`
Service matches contract; correctly has no create endpoint (admin video creation intentionally goes through `/creator/videos`, and the create dialog trigger is correctly commented out with an explanatory note).
- **`VideoDetailFooter.jsx`**: gating logic treats `draft` as needing Approve/Reject (wrong — admin's own drafts don't need approval) AND checks for the literal `"pending"` instead of the real `"pending_review"` (wrong — so real pending videos never show Approve/Reject). This is backwards on both counts.
- Filter tabs missing `pending_review`, `scheduled`, `rejected`.
- **Dead file**: `src/components/dialogs/admin/videos/UploadVideoDialog.jsx` has no actual component function definition (broken syntax/structure) — harmless only because nothing imports it; should be deleted.
- Possible duplicate: a separate `RejectVideoDialog.jsx` sits unused alongside the working inline reject flow in `VideoDetailFooter.jsx` — worth removing if truly dead.

### 9. Podcasts + Reviews — `src/app/admin/dashboard/podcasts`
Podcast Reviews sub-module (list/moderate-hide/delete) is fully and correctly built — the best-implemented review UI in the app.
- **Podcast creation is a non-functional stub**: `UploadNewPodcastForm.jsx` just shows `toast.info("Podcast creation is currently unavailable.")` and never calls the real `POST /creator/podcasts` endpoint. This needs to actually be wired (formdata: title, description, language, category, status, ownerId, cover), including replacing its hardcoded fake category list with real `/category` data.
- Same `draft`/`pending` vs `pending_review` gating bug as Videos, present in both `PodcastDetailFooter.jsx` and `PodcastsTableActions.jsx`.
- Filter tabs missing `pending_review`, `scheduled`, `rejected`.

### 10. Audiobooks + Reviews — `src/app/admin/dashboard/audiobooks`
Core CRUD (create/update/cover/chapters/delete) matches contract, including the presigned upload-url flow.
- **No take-down/restore UI**: the backend supports `status: draft|active|archived` on PATCH, but no control anywhere lets an admin actually change it (the field is silently carried through forms with a default, never rendered).
- **Audiobook review moderation is entirely unbuilt** — no service, no hooks, no `queryKeys` entry, no UI tab. This is a straight gap vs. the fully-built podcast-reviews equivalent; `GET/PATCH/DELETE /admin/audiobooks/reviews...` has zero coverage.
- Chapter-upload progress: code comments claim "periodic refetch" handles transcode status updates, but no `refetchInterval` or SSE subscription actually exists anywhere (see Uploads/progress, #23).

### 11. Events/Tours — `src/app/admin/dashboard/tours`
Folder is named "tours" but consistently maps to the backend's "Events" concept everywhere (services/hooks/queryKeys/store) — just a UI naming choice, not a bug. SSR prefetch (list + dashboard stats) is real and correct.
- **`updateEventRequest` routes most edits to `PATCH /creator/events/{id}` (multipart) instead of the contract's `PATCH /admin/events/{id}` (JSON)** — only pure owner-reassignment payloads hit the correct admin endpoint. This needs verification against the real backend; as written it contradicts the given contract for every other field edit.
- Status enum: UI tabs (`upcoming/live/under_review/sold_out/rejected`) don't match the backend enum (`draft|scheduled|active|completed|archived`); the status badge component has no rendering for `scheduled`/`archived`; `EditEventForm.jsx` has a bug sending `status: "schedule"` (typo) instead of `"scheduled"`.
- Owner reassignment (`ownerId`) has plumbing in the forms but **no actual select field** for an admin to choose a new owner — dead code path.
- Orphaned dummy data + zustand store (`adminDashboardEventsData.js`, `adminDashboardEventsStore.js`) still present though unused — cleanup needed per project's "cut the cord" rule.

### 12. Merch Products/Shop — `src/app/admin/dashboard/shop`
Read/update/delete/analytics/dashboard all match contract exactly. Correctly has no create endpoint, and the "Add Product" UI is properly stubbed with a "currently unavailable" toast (matches contract's missing create route — this is the right call, not a bug).
- Category dropdown options (`Apparel, Vinyl, Accessories, Bags, Posters, Other`) don't match the backend enum (`apparel|vinyl|accessories|digital-art|gear`) — `Bags/Posters/Other` will fail server validation, and `digital-art`/`gear` are simply missing from the UI.
- Status filter tabs (`out_of_stock/under_review/rejected`) aren't real backend statuses; real values `scheduled`/`archived` aren't filterable or settable from the edit form.
- `colorVariants` (per-color stock) is entirely unimplemented in the UI despite backend support.
- No owner-reassignment UI at all (not even dead plumbing, unlike Events).
- `useUpdateProduct` has a dead toast branch checking for `status === "rejected"`, which isn't a real product status.
- Orphaned dummy data/zustand store present, unused, needs cleanup.

### 13. User Management — `src/app/admin/dashboard/users`
This is the most functionally incomplete "wired" module:
- **Lists from the wrong endpoint**: calls `GET /users` (a different, param-restricted route) instead of the contract's `GET /admin/users`, while also sending `status/q/page/limit` params that `/users` doesn't support per the collection.
- Status filter is "Verified/Unverified" (off `isVerified`) — doesn't correspond to the real `active|suspended|banned` status enum at all; there's no way to filter or view suspended/banned users.
- **No mutation hooks exist whatsoever**: no suspend, ban, reactivate, delete, or invite hook/service function anywhere.
- Every action button (Edit/Suspend/Delete/Invite in the dialogs) just fires `toast.info("This action will be enabled once backend user management endpoints are released.")` — with the real form JSX commented out in place rather than removed.
- Orphaned unused zustand store present.
- Needs: switch to `/admin/users` with correct role/status enum, build 4 action hooks + invite hook, wire the dialogs, delete dead store/commented code.

### 16. Activity Log
No dedicated page/service/hook exists for the real paginated `GET /admin/activity` endpoint. What *does* exist is a "Recent Activity" widget on the Dashboard-Overview page, fed from a `recentActivity` slice embedded in the `GET /admin/dashboard` response — it's real data, just not the dedicated endpoint, and has no pagination or `type` filter. Needs a decision: either build a real Activity Log page against `/admin/activity`, or accept the dashboard widget as sufficient.

---

## 🆕 New API, not integrated (backend ready, frontend untouched)

### 14. Platform Settings — `src/app/admin/dashboard/settings`
Zero backend wiring: no `settingsServices.js`, no `queryKeys.settings`, no SSR prefetch. The entire page (toggles, danger-zone Clear Cache/Reset Analytics buttons) runs off a zustand store seeded from static dummy data — toggles only flip local state, buttons just show a canned "success" string. Backend has `GET/PATCH /admin/settings`, `POST /admin/settings/clear-cache`, `POST /admin/settings/reset-analytics` all ready. Needs a full build: service, query key, SSR prefetch + `isrPaths.js` registration, mutation hook, real Danger Zone wiring.

### 22. Categories (podcast categories)
No service, no hooks, no admin page/section anywhere. The only place `/category` is even called is a read-only user-facing genre-chip fetch — nothing for admin CRUD. The podcast create form (itself non-functional, see #9) hardcodes a fake 6-item category list instead of fetching real ones. Needs: `categoryServices.js` + CRUD hooks + a small admin UI, likely nested in the Podcasts page or as its own `/admin/dashboard/categories` page (mirrors Genres).

---

## ❌ No code exists / needs full build

### 15. Scheduler (cron jobs)
No page exists anywhere in the app for this — completely unreachable by any admin. Two of six endpoints (`status`, `run job`) already have working service functions and hooks (`useSchedulerStatus`, `useTriggerSchedulerJob`, correctly self-contained mutation pattern) but neither is imported by anything — pure orphaned code. The other four (`jobs` list, `pause`, `resume`, `schedule` update) have no code at all. Needs: a new page, the 4 missing service/hook pairs, and wiring the 2 existing orphaned hooks in.

### 17. Support Tickets
Total absence — no service, hook, page, template, or component for any of the 5 endpoints (list/detail/reply/status/create-event-from-ticket). Largest single build-out gap in the whole audit.

### 18. Payouts (admin side)
Total absence on the admin side — no service, hook, page, `queryKeys` entry, or `isrPaths` registration for any of the 5 payout endpoints. (Note: there IS an unrelated artist-facing self-service payout page using dummy data — different feature, not to be confused with this.)

### 19. Admins/Staff accounts
No dedicated list page; `GET /admin/admins` and `POST /admin/admins/invite` have zero code. The only related UI is an "Invite Admin" modal folded into the Roles & RBAC page, and it's entirely fake — `handleSubmit` just calls `alert(...)`, no network call at all.

### 20. Roles & RBAC — `src/app/admin/dashboard/roles-rbac`
Confirmed: **no RBAC/roles/permissions concept exists anywhere in the backend** (grepped the full collection — only the plain `role` enum on user records exists). This entire page is, and must remain, mock/local-state until the backend adds this feature. Minor cleanup opportunity: a `queryKeys.rolesRbac` placeholder and vestigial unused `HydrationBoundary` scaffolding sit in the code with nothing behind them.

### 21. Subscriptions — `src/app/admin/dashboard/subscriptions`
Same situation as RBAC: **zero subscription endpoints exist in the backend** (confirmed via full-file search). Fully zustand/dummy-data driven; a `subscriptionsParams.js` helper and `queryKeys.subscriptions` exist but are never actually consumed by a real query. Nothing to fix on the frontend until backend ships this.

### 23. Uploads / background-upload progress (SSE)
`GET /uploads/mine` and the SSE `GET /uploads/{trackingId}/progress` are not integrated anywhere. Song and audiobook-chapter upload mutations receive a `trackingId` back and discard it, relying on an unconfigured "periodic refetch" that doesn't actually exist in code. No progress bar, no upload-queue UI. Needs an `EventSource`-based hook plus a `GET /uploads/mine` list if a real progress UI is wanted.

---

## Cross-cutting patterns worth fixing once, not per-module

1. **`pending` vs `pending_review` string bug** — repeated independently in Songs, Videos, and Podcasts. Worth fixing as one shared constant/util rather than three separate patches, so it can't drift again.
2. **`draft` wrongly gated behind Approve/Reject** in Videos and Podcasts (Songs got this right) — same root cause as above, same fix location.
3. **Filter tabs never cover the full backend status enum** — true in Songs, Videos, Podcasts, Events, Shop. Consider a single source-of-truth status-enum-to-tab-label map per domain instead of hand-typed tab arrays, so new/renamed backend statuses can't silently go unfilterable again.
4. **"Cut the cord" violations**: orphaned dummy-data files + zustand stores still present (unused) for Users, Events, Shop even though real hooks now exist — safe, mechanical deletion.
5. **Fake "coming soon" stubs presented as real buttons** (Users actions, Podcast create) vs. **honest disabled stubs** (Shop create, Video create) — the Shop/Video pattern (clear "not available yet" messaging tied to a real, confirmed backend gap) is the right model; Users/Podcasts should either get built for real or be updated to the same honest-disabled pattern until they are.

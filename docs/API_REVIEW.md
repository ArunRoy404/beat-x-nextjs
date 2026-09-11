# Beat-X API Review Log

Running log of API problems found while wiring each module to the backend — the
things we had to guess at, work around, or leave switched off because the docs
didn't say enough. One entry per issue, grouped by **role → module**.

- **Live docs:** http://13.200.168.40:3000/api/docs (raw OpenAPI: `/api/docs-json`)
- **Collection:** [`postman/Beat-X API Running (Updated).postman_collection.json`](../postman/Beat-X%20API%20Running%20%28Updated%29.postman_collection.json)
- **Last updated:** 2026-09-10

---

## How to use this file

- Add a module section **the moment its integration lands** — even if the outcome
  is "no issues", so we can tell "reviewed and clean" from "not looked at yet".
- Every issue gets a stable ID (`ADM-SONGS-01`) so it can be quoted in a ticket or
  a backend thread without re-explaining it.
- Each issue records **what we did in the meantime**. That's the part that matters
  later: when the backend answers, this tells us exactly what to undo.
- Mark an issue ✅ **Resolved** in place rather than deleting it — the history of
  what we assumed is worth keeping.
- Keep the endpoint markers in the Postman collection (✅ / ⚠️ / ❌) in sync with
  this file.

### Legend

| Marker | Meaning |
|---|---|
| 🔴 **Blocker** | We are guessing at a contract. A wrong guess ships a real bug. |
| 🟠 **Gap** | Endpoint works, but a capability the UI needs doesn't exist yet. |
| 🟡 **Docs** | API behaves fine; the spec is wrong, incomplete, or inconsistent. |
| 🔵 **Collection** | Defect in the Postman collection itself, not the API. |
| ✅ **Resolved** | Confirmed or fixed — kept for history. |

---

## Status board

| Role | Module | Reviewed | 🔴 | 🟠 | 🟡 | Notes |
|---|---|---|---|---|---|---|
| Admin | Songs | 2026-09-10 | 1 | 4 | 4 | Integrated; `status` value unconfirmed |
| Admin | _(other modules)_ | — | — | — | — | Not reviewed yet |
| Artist | _(all modules)_ | — | — | — | — | Not reviewed yet |
| User | _(all modules)_ | — | — | — | — | Not reviewed yet |

---

# ADMIN

## Songs — `/admin/songs`

**Reviewed:** 2026-09-10 · **Status:** integrated · **Collection folder:** `[AD05] Songs (Moderation & Management)`

### Endpoint coverage

| Endpoint | State | Note |
|---|---|---|
| `GET /admin/songs` | ⚠️ | Works; review queue not filterable — `ADM-SONGS-02` |
| `POST /admin/songs` | ⚠️ | Works; `status` value unconfirmed — `ADM-SONGS-01` |
| `GET /admin/songs/{id}` | ✅ | Consistent with docs |
| `PATCH /admin/songs/{id}` | ⚠️ | Works; documented DTO incomplete — `ADM-SONGS-06` |
| `PATCH /admin/songs/{id}/approve` | ✅ | Consistent with docs |
| `PATCH /admin/songs/{id}/reject` | ✅ | Consistent with docs |
| `DELETE /admin/songs/{id}` | ✅ | Consistent with docs |
| `POST /admin/songs/upload-url` | ❌ | Not integrated — `ADM-SONGS-05` |

> ⚠️ None of the above was executed against the live API during review — this is a
> spec-vs-code audit. Admin credentials weren't available in the session. **The write
> endpoints still need one manual run each** to confirm `ADM-SONGS-01`.

---

### 🔴 ADM-SONGS-01 — The `status` value for a live song is ambiguous

The docs contradict themselves on what a published/live song's `status` actually is.

| Source | Says |
|---|---|
| `SongDetailResponseDto.status` | example `"active"` |
| `SongAdminStatsDto` | bucket named `published` |
| `DashboardRecentUploadDto.status` | example `"published"` |
| Postman `AD05.03` body | `"active"` |

Nothing in the spec declares `status` as an enum, so there's no tiebreaker.

**Impact —** every write path depends on it: create, edit, take-down, restore. Write
the wrong string and songs land in a state the list filters can never surface.

**What we did —** canonicalised on **`active`**, on the grounds that (a) it's the only
song-specific example in the spec and (b) the already-integrated admin **albums**
module writes `active`/`archived` against this same backend. Reads fold `published`
→ `active` via `normalizeSongStatus()`. If it turns out to be wrong, it's a one-line
change in [`src/lib/constants/songStatus.js`](../src/lib/constants/songStatus.js) —
everything else derives from that constant.

**Need from backend —** confirm the persisted value, then publish `status` as a proper
enum in the spec.

---

### 🟠 ADM-SONGS-02 — No way to filter the artist review queue

`GET /admin/songs` accepts `genre`, `album`, `q`, `page`, `limit`, `status`. But
review state lives on `Song.submittedStatus`, which is a **separate field** from
`status` — a live song can carry a pending re-submission. There is no query param
for it.

**Impact —** the admin Music table's **Pending** tab can't do its job. It currently
sends `status=pending`, which isn't a documented `status` value and most likely
returns an empty list. Approve/Reject themselves work fine wherever a pending song
happens to appear.

**What we did —** left the tab visible and wired to the URL (per the project rule
against faking behaviour client-side). It stays non-functional until the param exists.

**Need from backend —** a `submittedStatus` query param on `GET /admin/songs`.

---

### 🟠 ADM-SONGS-03 — `SongAdminStatsDto` has no `archived` bucket

Buckets are `total`, `totalStreams`, `published`, `awaitingApproval`, `rejected`,
`draft`, `scheduled`. Taken-down (`archived`) songs appear in none of them, so a
song that's been taken down is invisible in the stat cards — and `total` may or may
not still include it (undocumented).

**Need from backend —** an `archived` count, and confirmation of whether `total`
counts archived songs.

---

### 🟠 ADM-SONGS-04 — No per-song analytics endpoint

The spec has `/admin/products/{id}/analytics` and `/admin/events/{id}/analytics`,
but nothing equivalent for songs. `GET /admin/songs/{id}` returns the record only —
no stream-over-time series, no platform or country breakdown.

**What we did —** the song detail modal's **Analytics** tab renders an empty state;
the designed chart blocks are commented out in
[`SongDetailAnalytics.jsx`](../src/components/admin/music/SongsDetails/SongDetailAnalytics.jsx)
awaiting the endpoint.

**Need from backend —** `GET /admin/songs/{id}/analytics`.

---

### 🟠 ADM-SONGS-05 — Presigned upload flow is unused; inline limits unknown

`POST /admin/songs/upload-url` exists (returns `{ uploadUrl, key }`) but nothing in
the frontend calls it — uploads post audio + cover inline as multipart to
`POST /admin/songs`. The upload card advertises "Max 100MB", which is a **UI string,
not a documented API limit**.

**Need from backend —** is the presigned flow the intended path for large files? What
is the actual size limit on the inline multipart route, and what does it return when
exceeded? Either wire the presigned flow or drop the endpoint.

---

### 🟡 ADM-SONGS-06 — `AdminUpdateSongDto` is incomplete

The DTO documents only `isFeatured`, `isTrending`, `trendDirection`. But the same
endpoint's own summary calls it *"also the take-down/restore endpoint"* — which
requires `status` — and in practice it accepts `title`, `album`, `genre`, `explicit`
and `scheduledAt`, all of which the Edit Song dialog sends.

**Impact —** we're relying on undocumented fields. Nothing warns us if one is dropped.

**Need from backend —** publish the full DTO.

---

### 🟡 ADM-SONGS-07 — `trendDirection` has no documented values

Typed as a bare `string` in both `Song` and `AdminUpdateSongDto`. No enum, no example
beyond Postman's placeholder `"trendDirection_sample"`.

**What we did —** deliberately **left out** of the edit form rather than inventing an
up/down/stable dropdown. The detail modal displays whatever the API returns.

**Need from backend —** the allowed values.

---

### 🟡 ADM-SONGS-08 — Ref fields: populated vs raw ObjectId is undocumented

`Song.album`, `ownerId`, `reviewedBy` and `genre` are all typed `ObjectId` in the
schema, but in practice some come back **populated** — `GET /api/v1/songs` returns
`genre` as `{ _id, name }`. Which endpoints populate which refs isn't stated anywhere.

**Impact —** this is a crash class, not a cosmetic issue: rendering a populated ref
object straight into JSX throws *"Objects are not valid as a React child"* and takes
the view down. It also isn't clear whether a populated `album` exposes `title` (the
`Album` schema's field) or `name`.

**What we did —** every ref goes through a `refToText()` helper that accepts both
shapes; `album` reads `title` first, then `name`.

**Need from backend —** document which refs are populated per endpoint, and the shape
of each populated object.

---

### 🟡 ADM-SONGS-09 — List response key is inconsistent across roles

| Endpoint | Array key |
|---|---|
| `GET /admin/songs` (`AdminSongListResponseDto`) | `song` |
| `GET /creator/songs` (`CreatorSongListResponseDto`) | `song` |
| `GET /songs` (`SongListResponseDto`) | `data` |

Two different keys for the same concept, and `song` is singular for an array.

**Impact —** low, but an easy trap when copying a hook between roles.

**Need from backend —** ideally standardise on one key.

---

### 🔵 Postman collection defects — ✅ fixed 2026-09-10

Found while auditing `[AD05]`. These would have failed on an actual collection run,
independent of the API:

| Request | Defect | Fix |
|---|---|---|
| `AD05.03` | `explicit` was a JSON boolean `false`; form-data values must be strings | → `"false"` |
| `AD05.05` | `isFeatured` / `isTrending` were JSON booleans | → `"true"` |
| `AD05.03` | `cover` had `src: ["", "/C:/…"]` — the empty entry breaks the upload | → plain string path |
| `AD05.03` | `audio` src was a 1-element array | → plain string path |
| `AD05.05` | `cover` / `audio` were `type: "file"` with `"value": null` and **no `src` key** | → `src: null` |
| `AD05.05` | No `status` field, despite being documented as the take-down/restore route | → added, disabled by default |
| `AD05.01` | Name had a truncated `(not done_` typo | → replaced with a ❌ marker |

---

### Frontend assumptions to revisit

Things we chose under uncertainty. Each should be re-checked when the matching issue
is answered.

| Assumption | Where | Unblocked by |
|---|---|---|
| Live status is `active`, not `published` | [`songStatus.js`](../src/lib/constants/songStatus.js) | `ADM-SONGS-01` |
| Scheduling writes `status: "scheduled"` | [`buildSongFormData.js`](../src/components/forms/music/buildSongFormData.js) | `ADM-SONGS-01` |
| `awaitingApproval` ≡ `pending` | [`songStatus.js`](../src/lib/constants/songStatus.js) | `ADM-SONGS-02` |
| Edit form may send `title`/`album`/`genre`/`explicit` | [`EditSongForm.jsx`](../src/components/forms/music/EditSongForm.jsx) | `ADM-SONGS-06` |
| Populated `album` exposes `title` | [`SongDetailContent.jsx`](../src/components/admin/music/SongsDetails/SongDetailContent.jsx) | `ADM-SONGS-08` |
| Genre/album dropdowns show only the first 50 records | [`taxonomyOptions.js`](../src/lib/constants/taxonomyOptions.js) | Needs a search-as-you-type endpoint if the catalogue outgrows 50 |

---

# ARTIST

_No modules reviewed yet._

---

# USER

_No modules reviewed yet._

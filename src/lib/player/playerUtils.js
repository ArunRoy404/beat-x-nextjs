/**
 * Pure reusable utility functions for music player queue operations,
 * song normalization, shuffle, loop, and boundary calculations.
 */

/**
 * Normalizes any song object coming from various API endpoints or dummy fixtures
 * into a consistent player-compatible structure.
 */
export function normalizeSong(song) {
  if (!song) return null;
  const id = song._id || song.id;
  const title = song.title || song.name || "Untitled Track";
  const artist =
    song.artist?.name ||
    (typeof song.artist === "string" ? song.artist : null) ||
    song.subtitle ||
    song.creator ||
    song.channel ||
    song.user?.name ||
    "Unknown Artist";
  const artwork =
    song.coverUrl ||
    song.artwork ||
    song.art ||
    song.cover ||
    song.thumbnail ||
    song.heroImage ||
    "";
  const src =
    song.src ||
    song.videoUrl ||
    song.audioUrl ||
    song.streamUrl ||
    song.hlsMasterUrl ||
    song.fileUrl ||
    "";
  const mediaType = song.mediaType || (song.videoUrl ? "video" : "audio");
  const durationMs =
    song.durationMs || (typeof song.duration === "number" ? song.duration * 1000 : 0);
  const liked = Boolean(song.isLiked || song.liked);

  return {
    ...song,
    id,
    _id: id,
    title,
    artist,
    artwork,
    coverUrl: artwork,
    src,
    mediaType,
    durationMs,
    isLiked: liked,
    liked,
  };
}

/**
 * Returns a random index from 0 to length - 1,
 * trying to avoid repeating excludeIndex if alternatives exist.
 */
export function getRandomIndex(length, excludeIndex = -1) {
  if (length <= 1) return 0;
  if (excludeIndex < 0 || excludeIndex >= length) {
    return Math.floor(Math.random() * length);
  }

  // Pick from remaining indices
  const candidates = [];
  for (let i = 0; i < length; i++) {
    if (i !== excludeIndex) candidates.push(i);
  }
  const picked = Math.floor(Math.random() * candidates.length);
  return candidates[picked];
}

/**
 * Determines whether the Next track button should be enabled.
 */
export function canPlayNext({
  queue = [],
  currentIndex = -1,
  isShuffle = false,
  repeatMode = "off",
}) {
  if (!queue || queue.length === 0) return false;
  if (queue.length === 1) {
    return repeatMode === "all" || repeatMode === "one";
  }
  if (isShuffle) return true;
  if (repeatMode === "all") return true;
  return currentIndex < queue.length - 1;
}

/**
 * Determines whether the Previous track button should be enabled.
 */
export function canPlayPrev({
  queue = [],
  currentIndex = -1,
  isShuffle = false,
  repeatMode = "off",
  history = [],
}) {
  if (!queue || queue.length === 0) return false;
  if (queue.length === 1) {
    return repeatMode === "all" || repeatMode === "one";
  }
  if (isShuffle) return history.length > 0 || queue.length > 1;
  if (repeatMode === "all") return true;
  return currentIndex > 0;
}

/**
 * Computes the index of the next song to play.
 * Returns -1 if no next song exists (e.g. reached end of queue and repeat is off).
 */
export function getNextIndex({
  queue = [],
  currentIndex = -1,
  isShuffle = false,
  repeatMode = "off",
}) {
  if (!queue || queue.length === 0) return -1;
  if (queue.length === 1) {
    return repeatMode === "all" || repeatMode === "one" ? 0 : -1;
  }

  if (isShuffle) {
    return getRandomIndex(queue.length, currentIndex);
  }

  const next = currentIndex + 1;
  if (next < queue.length) {
    return next;
  }

  if (repeatMode === "all") {
    return 0;
  }

  return -1;
}

/**
 * Computes the index of the previous song to play.
 * Returns -1 if cannot navigate backward.
 */
export function getPrevIndex({
  queue = [],
  currentIndex = -1,
  isShuffle = false,
  repeatMode = "off",
  history = [],
}) {
  if (!queue || queue.length === 0) return -1;
  if (queue.length === 1) {
    return repeatMode === "all" || repeatMode === "one" ? 0 : -1;
  }

  if (isShuffle) {
    if (history.length > 0) {
      return history[history.length - 1];
    }
    return getRandomIndex(queue.length, currentIndex);
  }

  const prev = currentIndex - 1;
  if (prev >= 0) {
    return prev;
  }

  if (repeatMode === "all") {
    return queue.length - 1;
  }

  return -1;
}

/**
 * Formats seconds into MM:SS display
 */
export function formatPlayerTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

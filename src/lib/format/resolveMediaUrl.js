/**
 * Resolves media paths/URLs (audio, video, images) from API responses.
 * Handles full URLs (http/https/blob/data) as well as relative paths returned
 * by backend uploads, prepending the backend host origin.
 */
export function resolveMediaUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") return "";
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("blob:") ||
    pathOrUrl.startsWith("data:")
  ) {
    return pathOrUrl;
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.200.168.40:3000";
  const origin = rawBaseUrl.replace(/\/api\/v1\/?$/, "");
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${cleanPath}`;
}

const DEFAULT_S3_ORIGIN = "https://beat-x-dev-s3-bucket.s3.ap-south-1.amazonaws.com";

function getS3Origin(song) {
  if (song?.coverUrl && typeof song.coverUrl === "string" && song.coverUrl.startsWith("http")) {
    try {
      const urlObj = new URL(song.coverUrl);
      return urlObj.origin;
    } catch {
      // ignore
    }
  }
  return DEFAULT_S3_ORIGIN;
}

export function getSongAudioUrl(song) {
  if (!song) return "";
  if (song?.hlsMasterUrl) {
    return resolveMediaUrl(song.hlsMasterUrl);
  }

  const directUrl = song?.audioUrl || song?.audio || song?.streamUrl || song?.fileUrl || song?.url || song?.path || song?.filePath;
  if (directUrl) {
    return resolveMediaUrl(directUrl);
  }

  if (song?.audioKey) {
    if (song.audioKey.startsWith("http://") || song.audioKey.startsWith("https://")) {
      return song.audioKey;
    }
    const origin = getS3Origin(song);
    const cleanKey = song.audioKey.startsWith("/") ? song.audioKey.slice(1) : song.audioKey;
    return `${origin}/${cleanKey}`;
  }

  return "";
}

export function getSongCoverUrl(song) {
  if (!song) return "";
  const rawUrl =
    song?.coverUrl ||
    song?.cover ||
    song?.imageUrl ||
    song?.image ||
    song?.thumbnailUrl;

  return resolveMediaUrl(rawUrl);
}

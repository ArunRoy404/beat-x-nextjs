/**
 * Pure helper function to parse raw URL search params into sanitized API params
 * for GET /admin/videos.
 * MUST remain a non-client file so Server Components (page.jsx) can import it.
 */
export function buildVideosParams(rawParams = {}) {
  const statusParam = typeof rawParams.status === "string" ? rawParams.status.trim() : "";
  let status;
  if (statusParam && statusParam.toLowerCase() !== "all") {
    status = statusParam.toLowerCase();
  }

  const genreParam = typeof rawParams.genre === "string" ? rawParams.genre.trim() : "";
  let genre;
  if (genreParam && genreParam.toLowerCase() !== "all") {
    genre = genreParam;
  }

  const q = typeof rawParams.q === "string" ? rawParams.q.trim() : undefined;
  const page = parseInt(rawParams.page, 10) || 1;
  const limit = parseInt(rawParams.limit, 10) || 20;

  return {
    ...(status && { status }),
    ...(genre && { genre }),
    ...(q && { q }),
    page,
    limit,
  };
}

/**
 * Pure helper to parse and sanitize URL search parameters into endpoint params
 * for the user's liked songs collection.
 * Must live in its own non-client file so Server Components (page.jsx)
 * can import it without client-bundle errors.
 */
export function buildLikedSongsParams(rawParams = {}) {
  const page = Math.max(1, Number(rawParams?.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(rawParams?.limit) || 20));

  return {
    page,
    limit,
  };
}

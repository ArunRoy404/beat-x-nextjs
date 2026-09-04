export const GENRES_PAGE_SIZE = 20;

export function buildGenresParams(rawParams = {}) {
  const page = Math.max(1, Number(rawParams?.page) || 1);
  const limit = Math.max(1, Number(rawParams?.limit) || GENRES_PAGE_SIZE);
  const q = rawParams?.q?.trim() || undefined;

  return {
    page,
    limit,
    ...(q ? { q } : {}),
  };
}

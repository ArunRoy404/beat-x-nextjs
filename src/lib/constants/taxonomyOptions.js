// Shared by every place that fills a genre/album dropdown, so the option
// lists resolve to one React Query cache entry instead of one per caller.
// 50 is the API's maximum page size for these lists.
export const TAXONOMY_OPTIONS_PARAMS = { page: 1, limit: 50 }

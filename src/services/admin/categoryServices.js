import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Read-only for now — only what the Podcasts module needs to resolve/select
 * a real category id (GET /category). Admin category CRUD (POST/PATCH/DELETE
 * /category) has no UI yet; that's tracked separately.
 */
export async function getCategoriesRequest({ page = 1, limit = 20, q } = {}) {
  const params = { page, limit };
  if (q) params.q = q;
  const res = await axiosPrivate.get("/category", { params });
  return res.data.data;
}

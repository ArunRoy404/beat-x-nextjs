import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { env } from "@/config/env";
import { isrPaths } from "@/lib/revalidate/isrPaths";

/**
 * On-demand cache bust for every SSR/ISR page. Call this after a write on
 * the backend so cached pages don't have to wait out the 1-minute window.
 *   curl -X POST /api/revalidate -H "x-revalidate-secret: ..." \
 *     -H "content-type: application/json" -d '{"paths":["/admin/dashboard/users"]}'
 */
export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!env.revalidateSecret || secret !== env.revalidateSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const paths = body?.paths?.length ? body.paths : isrPaths;
  const tags = body?.tags ?? [];

  paths.forEach((path) => revalidatePath(path));
  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, paths, tags });
}

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getVideosRequest } from "@/services/admin/videosServices";
import { buildVideosParams } from "@/hooks/api/admin/videos/videosParams";
import AdminDashboardVideosPage from "@/templates/admin/dashboard/AdminDashboardVideosPage";

// No `export const revalidate` here on purpose: getVideosRequest reads
// the admin's session (cookies), which already forces Next.js into fully
// dynamic rendering — a `revalidate` value would be a no-op, and Next's
// segment config validator requires it to be a static literal anyway (not
// the env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildVideosParams(rawParams);
  const defaultParams = buildVideosParams();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.videos.list(params),
      queryFn: () => getVideosRequest(params),
    }),
    JSON.stringify(params) !== JSON.stringify(defaultParams)
      ? queryClient.prefetchQuery({
          queryKey: queryKeys.videos.list(defaultParams),
          queryFn: () => getVideosRequest(defaultParams),
        })
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardVideosPage />
    </HydrationBoundary>
  );
};

export default page;

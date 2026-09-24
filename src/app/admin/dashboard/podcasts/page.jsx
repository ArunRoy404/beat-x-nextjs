import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getPodcastsRequest } from "@/services/admin/podcastsServices";
import { getCategoriesRequest } from "@/services/admin/categoryServices";
import { buildPodcastsParams } from "@/hooks/api/admin/podcasts/podcastsParams";
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions";
import AdminDashboardPodcastsPage from "@/templates/admin/dashboard/AdminDashboardPodcastsPage";

// No `export const revalidate` here on purpose: getPodcastsRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway (not the
// env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildPodcastsParams(rawParams);
  const defaultParams = buildPodcastsParams();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.podcasts.list(params),
      queryFn: () => getPodcastsRequest(params),
    }),
    JSON.stringify(params) !== JSON.stringify(defaultParams)
      ? queryClient.prefetchQuery({
          queryKey: queryKeys.podcasts.list(defaultParams),
          queryFn: () => getPodcastsRequest(defaultParams),
        })
      : Promise.resolve(),
    queryClient.prefetchQuery({
      queryKey: queryKeys.categories.list(TAXONOMY_OPTIONS_PARAMS),
      queryFn: () => getCategoriesRequest(TAXONOMY_OPTIONS_PARAMS),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardPodcastsPage />
    </HydrationBoundary>
  );
};

export default page;

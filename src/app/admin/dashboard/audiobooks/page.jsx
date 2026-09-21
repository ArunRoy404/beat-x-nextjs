import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getAudioBooksRequest } from "@/services/admin/audioBooksServices";
import { getGenresRequest } from "@/services/admin/genreServices";
import { buildAudioBooksParams } from "@/hooks/api/admin/audiobooks/audioBooksParams";
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions";
import AdminDashboardAudioBooksPage from "@/templates/admin/dashboard/AdminDashboardAudioBooksPage";

// No `export const revalidate` here on purpose: getAudioBooksRequest reads
// the admin's session (cookies), which already forces Next.js into fully
// dynamic rendering — a `revalidate` value would be a no-op, and Next's
// segment config validator requires it to be a static literal anyway (not
// the env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildAudioBooksParams(rawParams);
  const defaultParams = buildAudioBooksParams();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.audiobooks.list(params),
      queryFn: () => getAudioBooksRequest(params),
    }),
    JSON.stringify(params) !== JSON.stringify(defaultParams)
      ? queryClient.prefetchQuery({
          queryKey: queryKeys.audiobooks.list(defaultParams),
          queryFn: () => getAudioBooksRequest(defaultParams),
        })
      : Promise.resolve(),
    queryClient.prefetchQuery({
      queryKey: queryKeys.genre.list(TAXONOMY_OPTIONS_PARAMS),
      queryFn: () => getGenresRequest(TAXONOMY_OPTIONS_PARAMS),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardAudioBooksPage />
    </HydrationBoundary>
  );
};

export default page;

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getSongsRequest } from "@/services/admin/songsServices";
import { buildSongsParams } from "@/hooks/api/admin/songs/songsParams";
import AdminDashboardMusicPage from "@/templates/admin/dashboard/AdminDashboardMusicPage";

// No `export const revalidate` here on purpose: getSongsRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway (not the
// env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildSongsParams(rawParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.music.list(params),
    queryFn: () => getSongsRequest(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardMusicPage />
    </HydrationBoundary>
  );
};

export default page;

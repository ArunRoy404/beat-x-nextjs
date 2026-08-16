import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getSongsRequest } from "@/services/admin/songsServices";
import { buildSongsParams } from "@/hooks/api/admin/songs/songsParams";
import { env } from "@/config/env";
import AdminDashboardMusicPage from "@/templates/admin/dashboard/AdminDashboardMusicPage";

// No-op on this route: getSongsRequest reads the admin's session (cookies),
// which forces Next.js into fully dynamic rendering regardless of this value.
// Kept for pages that stop depending on the session and can go fully static.
export const revalidate = env.revalidateTime;

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

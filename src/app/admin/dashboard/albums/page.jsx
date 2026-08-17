import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getAlbumsRequest } from "@/services/admin/albumsServices";
import { buildAlbumsParams } from "@/hooks/api/admin/albums/albumsParams";
import AdminDashboardAlbumsPage from "@/templates/admin/dashboard/AdminDashboardAlbumsPage";

// No `export const revalidate` here on purpose: getAlbumsRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway (not the
// env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildAlbumsParams(rawParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.albums.list(params),
    queryFn: () => getAlbumsRequest(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardAlbumsPage />
    </HydrationBoundary>
  );
};

export default page;

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getGenresRequest, searchGenresRequest } from "@/services/admin/genreServices";
import AdminDashboardGenrePage from "@/templates/admin/dashboard/AdminDashboardGenrePage";

// No `export const revalidate` here on purpose: getGenresRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway (not the
// env-derived `env.revalidateTime`), which fails the production build.

const page = async ({ searchParams }) => {
  const { q } = await searchParams;
  const queryClient = getQueryClient();

  if (q) {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.genre.search(q),
      queryFn: () => searchGenresRequest({ name: q }),
    });
  } else {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.genre.list(),
      queryFn: getGenresRequest,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardGenrePage />
    </HydrationBoundary>
  );
};

export default page;

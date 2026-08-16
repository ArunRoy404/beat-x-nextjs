import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getGenresRequest } from "@/services/admin/genreServices";
import { env } from "@/config/env";
import AdminDashboardGenrePage from "@/templates/admin/dashboard/AdminDashboardGenrePage";

// No-op on this route: getGenresRequest reads the admin's session (cookies),
// which forces Next.js into fully dynamic rendering regardless of this value.
// Kept for pages that stop depending on the session and can go fully static.
export const revalidate = env.revalidateTime;

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.genre.list(),
    queryFn: getGenresRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardGenrePage />
    </HydrationBoundary>
  );
};

export default page;

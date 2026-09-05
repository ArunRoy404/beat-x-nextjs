import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getGenresRequest, searchGenresRequest } from "@/services/admin/genreServices";
import { buildGenresParams } from "@/hooks/api/admin/genre/genreParams";
import AdminDashboardGenrePage from "@/templates/admin/dashboard/AdminDashboardGenrePage";

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildGenresParams(rawParams);
  const queryClient = getQueryClient();

  if (params.q) {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.genre.search(params.q),
      queryFn: () => searchGenresRequest({ name: params.q }),
    });
  } else {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.genre.list(params),
      queryFn: () => getGenresRequest(params),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardGenrePage />
    </HydrationBoundary>
  );
};

export default page;

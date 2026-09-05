import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getArtistsRequest } from "@/services/admin/artistsServices";
import { buildArtistsParams } from "@/hooks/api/admin/artists/artistsParams";
import AdminDashboardArtistsPage from "@/templates/admin/dashboard/AdminDashboardArtistsPage";

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildArtistsParams(rawParams);
  const defaultParams = buildArtistsParams();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.artists.list(params),
      queryFn: () => getArtistsRequest(params),
    }),
    JSON.stringify(params) !== JSON.stringify(defaultParams)
      ? queryClient.prefetchQuery({
          queryKey: queryKeys.artists.list(defaultParams),
          queryFn: () => getArtistsRequest(defaultParams),
        })
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardArtistsPage />
    </HydrationBoundary>
  );
};

export default page;

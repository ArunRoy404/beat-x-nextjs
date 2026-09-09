import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getSongsHomeRequest } from "@/services/user/songsServices";
import { getApprovedArtistsRequest } from "@/services/user/artistsServices";
import UserHomePage from "@/templates/user/dashboard/UserHomePage";

// No `export const revalidate` here: requests read cookies/session when authenticated,
// which already forces Next.js into fully dynamic rendering.

const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.home(),
      queryFn: getSongsHomeRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.artists(),
      queryFn: getApprovedArtistsRequest,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserHomePage />
    </HydrationBoundary>
  );
};

export default page;


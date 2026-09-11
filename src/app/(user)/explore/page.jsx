import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getUserGenresRequest } from "@/services/user/genreServices";
import { getFeaturedSongsRequest } from "@/services/user/songsServices";
import { getApprovedArtistsRequest } from "@/services/user/artistsServices";
import UserExplorePage from "@/templates/user/explore/UserExplorePage";

// No `export const revalidate` here: requests read cookies/session when authenticated,
// which already forces Next.js into fully dynamic rendering.

const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.genre.list(),
      queryFn: getUserGenresRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.featured(),
      queryFn: getFeaturedSongsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.artists(),
      queryFn: getApprovedArtistsRequest,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserExplorePage />
    </HydrationBoundary>
  );
};

export default page;


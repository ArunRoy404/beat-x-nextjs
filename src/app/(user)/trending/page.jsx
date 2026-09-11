import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getTrendingSongsRequest, getBrowseSongsRequest } from "@/services/user/songsServices";
import { getFeaturedAlbumsRequest } from "@/services/user/albumsServices";
import { getTrendingVideosRequest } from "@/services/user/videosServices";
import UserTrendingPage from "@/templates/user/trending/UserTrendingPage";

// No `export const revalidate` here: requests read cookies/session when authenticated,
// which already forces Next.js into fully dynamic rendering.

const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.trending(),
      queryFn: getTrendingSongsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.albums.featured(),
      queryFn: getFeaturedAlbumsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.videos.trending(),
      queryFn: getTrendingVideosRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.list({ page: 1, limit: 50 }),
      queryFn: () => getBrowseSongsRequest({ page: 1, limit: 50 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserTrendingPage />
    </HydrationBoundary>
  );
};

export default page;


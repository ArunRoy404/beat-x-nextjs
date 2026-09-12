import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getMyPlaylistsRequest } from "@/services/user/playlistsServices";
import { getBrowseSongsRequest } from "@/services/user/songsServices";
import UserPlaylistPage from "@/templates/user/playlist/UserPlaylistPage";

export const metadata = {
  title: "Playlists | BeatX",
  description: "Browse, manage, and curate your personalized playlists and soundscapes on BeatX.",
};

const Page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.playlists.mine({ page: 1, limit: 50 }),
      queryFn: () => getMyPlaylistsRequest({ page: 1, limit: 50 }),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.list({ page: 1, limit: 50 }),
      queryFn: () => getBrowseSongsRequest({ page: 1, limit: 50 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserPlaylistPage />
    </HydrationBoundary>
  );
};

export default Page;

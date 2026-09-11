import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getLikedSongsRequest } from "@/services/user/songsServices";
import { getMyPlaylistsRequest } from "@/services/user/playlistsServices";
import { getMyFavoritesRequest } from "@/services/user/profileServices";
import { getApprovedArtistsRequest } from "@/services/user/artistsServices";
import { getNewReleaseAlbumsRequest } from "@/services/user/albumsServices";
import UserLibraryPage from "@/templates/user/library/UserLibraryPage";

// No `export const revalidate` here: requests read cookies/session when authenticated,
// which already forces Next.js into fully dynamic rendering.

const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs.liked(),
      queryFn: getLikedSongsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.playlists.mine({ page: 1, limit: 20 }),
      queryFn: () => getMyPlaylistsRequest({ page: 1, limit: 20 }),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.favorites(),
      queryFn: getMyFavoritesRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.artists(),
      queryFn: getApprovedArtistsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.albums.newReleases({ page: 1, limit: 20 }),
      queryFn: () => getNewReleaseAlbumsRequest({ page: 1, limit: 20 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserLibraryPage />
    </HydrationBoundary>
  );
};

export default page;


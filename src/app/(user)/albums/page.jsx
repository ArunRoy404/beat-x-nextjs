import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import {
  getBrowseAlbumsRequest,
  getFeaturedAlbumsRequest,
  getNewReleaseAlbumsRequest,
} from "@/services/user/albumsServices";
import { getMyFavoritesRequest } from "@/services/user/profileServices";
import UserAlbumsPage from "@/templates/user/albums/UserAlbumsPage";

// Authenticated requests read session/cookies, dynamic SSR-first
const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.albums.list({ page: 1, limit: 20 }),
      queryFn: () => getBrowseAlbumsRequest({ page: 1, limit: 20 }),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.albums.featured(),
      queryFn: getFeaturedAlbumsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.albums.newReleases({ page: 1, limit: 20 }),
      queryFn: () => getNewReleaseAlbumsRequest({ page: 1, limit: 20 }),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.favorites(),
      queryFn: getMyFavoritesRequest,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserAlbumsPage />
    </HydrationBoundary>
  );
};

export default page;

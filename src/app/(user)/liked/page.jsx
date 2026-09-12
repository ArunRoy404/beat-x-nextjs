import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getLikedSongsRequest } from "@/services/user/songsServices";
import { buildLikedSongsParams } from "@/hooks/api/user/songs/likedSongsParams";
import UserLikedSongsPage from "@/templates/user/liked/UserLikedSongsPage";

export const metadata = {
  title: "Liked Songs | BeatX",
  description: "Your personal collection of favorite tracks, songs, and audio on BeatX.",
};

const Page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildLikedSongsParams(rawParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.songs.liked(params),
    queryFn: () => getLikedSongsRequest(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserLikedSongsPage />
    </HydrationBoundary>
  );
};

export default Page;

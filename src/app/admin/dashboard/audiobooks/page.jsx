import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getAudioBooksRequest } from "@/services/admin/audioBooksServices";
import { DEFAULT_AUDIOBOOKS_PARAMS } from "@/hooks/api/admin/audiobooks/useAudioBooks";
import { env } from "@/config/env";
import AdminDashboardAudioBooksPage from "@/templates/admin/dashboard/AdminDashboardAudioBooksPage";

// No-op on this route: getAudioBooksRequest reads the admin's session (cookies),
// which forces Next.js into fully dynamic rendering regardless of this value.
// Kept for pages that stop depending on the session and can go fully static.
export const revalidate = env.revalidateTime;

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.audiobooks.list(DEFAULT_AUDIOBOOKS_PARAMS),
    queryFn: () => getAudioBooksRequest(DEFAULT_AUDIOBOOKS_PARAMS),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardAudioBooksPage />
    </HydrationBoundary>
  );
};

export default page;

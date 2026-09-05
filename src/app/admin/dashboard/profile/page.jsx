import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getProfileRequest } from "@/services/admin/usersServices";
import { getLoginHistoryRequest } from "@/services/auth/authServices";
import AdminProfilePage from "@/templates/admin/profile/AdminProfilePage";

// No `export const revalidate` here on purpose: getProfileRequest / getLoginHistoryRequest
// read the admin's session via cookies/axiosPrivate, which already forces Next.js
// into fully dynamic rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway.

const page = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.auth.me(),
      queryFn: () => getProfileRequest(),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.auth.loginHistory(),
      queryFn: () => getLoginHistoryRequest(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminProfilePage />
    </HydrationBoundary>
  );
};

export default page;

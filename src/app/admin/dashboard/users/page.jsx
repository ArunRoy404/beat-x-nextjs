import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getUsersRequest } from "@/services/admin/usersServices";
import AdminDashboardUsersPage from "@/templates/admin/dashboard/AdminDashboardUsersPage";

// No `export const revalidate` here on purpose: getUsersRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway (not the
// env-derived `env.revalidateTime`), which fails the production build.

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.list(),
    queryFn: getUsersRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardUsersPage />
    </HydrationBoundary>
  );
};

export default page;

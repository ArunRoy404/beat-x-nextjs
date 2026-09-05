import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getUsersRequest } from "@/services/admin/usersServices";
import { buildUsersParams } from "@/hooks/api/admin/users/usersParams";
import AdminDashboardUsersPage from "@/templates/admin/dashboard/AdminDashboardUsersPage";

// No `export const revalidate` here on purpose: getUsersRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway.

const page = async ({ searchParams }) => {
  const rawParams = (await searchParams) || {};
  const params = buildUsersParams(rawParams);
  const defaultParams = buildUsersParams({});
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.list(params),
      queryFn: () => getUsersRequest(params),
    }),
    JSON.stringify(params) !== JSON.stringify(defaultParams)
      ? queryClient.prefetchQuery({
          queryKey: queryKeys.users.list(defaultParams),
          queryFn: () => getUsersRequest(defaultParams),
        })
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardUsersPage />
    </HydrationBoundary>
  );
};

export default page;


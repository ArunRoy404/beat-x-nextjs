import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getUsersRequest } from "@/services/admin/usersServices";
import { env } from "@/config/env";
import AdminDashboardUsersPage from "@/templates/admin/dashboard/AdminDashboardUsersPage";

// No-op on this route: getUsersRequest reads the admin's session (cookies),
// which forces Next.js into fully dynamic rendering regardless of this value.
// Kept for pages that stop depending on the session and can go fully static.
export const revalidate = env.revalidateTime;

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

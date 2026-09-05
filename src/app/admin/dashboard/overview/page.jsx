import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getAdminDashboardOverviewRequest } from "@/services/admin/dashboardServices";
import AdminDashboardOverviewPage from "@/templates/admin/dashboard/AdminDashboardOverviewPage";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.overview(),
    queryFn: getAdminDashboardOverviewRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardOverviewPage />
    </HydrationBoundary>
  );
};

export default page;
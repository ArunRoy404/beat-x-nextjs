import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getAdminAnalyticsRequest } from "@/services/admin/analyticsServices";
import { buildAnalyticsParams } from "@/hooks/api/admin/analytics/analyticsParams";
import AdminDashboardAnalyticsPage from "@/templates/admin/dashboard/AdminDashboardAnalyticsPage";

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildAnalyticsParams(rawParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.analytics.detail(params),
    queryFn: () => getAdminAnalyticsRequest(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardAnalyticsPage />
    </HydrationBoundary>
  );
};

export default page;
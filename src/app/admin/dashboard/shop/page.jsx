import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import {
  getProductsDashboardStatsRequest,
  getProductsRequest,
} from "@/services/admin/productsServices";
import { buildProductsParams } from "@/hooks/api/admin/products/productsParams";
import AdminDashboardShopPage from "@/templates/admin/dashboard/AdminDashboardShopPage";

// No `export const revalidate` here on purpose: getProductsRequest reads the
// admin's session (cookies), which already forces Next.js into fully dynamic
// rendering — a `revalidate` value would be a no-op, and Next's segment
// config validator requires it to be a static literal anyway.

const page = async ({ searchParams }) => {
  const rawParams = (await searchParams) || {};
  const params = buildProductsParams(rawParams);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.dashboard(),
      queryFn: getProductsDashboardStatsRequest,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.list(params),
      queryFn: () => getProductsRequest(params),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardShopPage />
    </HydrationBoundary>
  );
};

export default page;


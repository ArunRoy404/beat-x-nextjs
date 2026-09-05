import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { buildSubscriptionsParams } from "@/hooks/api/admin/subscriptions/subscriptionsParams";
import AdminDashboardSubscriptionsPage from "@/templates/admin/dashboard/AdminDashboardSubscriptionsPage";

export const metadata = {
  title: "Subscriptions | BeatX Admin",
  description: "Subscription plan management and billing overview",
};

const page = async ({ searchParams }) => {
  const rawParams = await searchParams;
  const params = buildSubscriptionsParams(rawParams);

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardSubscriptionsPage />
    </HydrationBoundary>
  );
};

export default page;

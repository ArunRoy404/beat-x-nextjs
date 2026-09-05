import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import AdminDashboardRolesRbacPage from "@/templates/admin/dashboard/AdminDashboardRolesRbacPage";

export const metadata = {
  title: "Roles & RBAC | BeatX Admin",
  description: "Role-based access control management",
};

const page = async () => {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardRolesRbacPage />
    </HydrationBoundary>
  );
};

export default page;

"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import CommonDashboardLayout from "./CommonDashboardLayout/CommonDashboardLayout";
import NavbarUserMenu from "./CommonDashboardLayout/NavbarUserMenu";
import { useAdminDashboardNavigationStore } from "@/navigationStore/adminDashboardNavigationStore";
import { useLogout } from "@/hooks/api/auth/useLogout";

const AdminDashboardLayout = ({ children }) => {
  const navigationData = useAdminDashboardNavigationStore((state) => state.navigationData);
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        // /admin/login may be cached client-side as an authenticated
        // redirect (proxy.js) from before logout — force a fresh check.
        router.refresh();
      },
      onError: () => {
        toast.error("Something went wrong while logging out");
      },
    });
  };

  return (
    <CommonDashboardLayout
      sidebarData={navigationData?.navMain}
      sidebarTitle={navigationData?.sidebarTitle}
      userMenu={
        <NavbarUserMenu
          name={session?.user?.email}
          role="Admin"
          href="/admin/dashboard/settings"
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      }
    >
      {children}
    </CommonDashboardLayout>
  );
};

export default AdminDashboardLayout;
"use client"

import { useSession } from "next-auth/react";
import CommonDashboardLayout from "./CommonDashboardLayout/CommonDashboardLayout";
import NavbarUserMenu from "./CommonDashboardLayout/NavbarUserMenu";
import { useAdminDashboardNavigationStore } from "@/navigationStore/adminDashboardNavigationStore";
import { useLogout } from "@/hooks/api/auth/useLogout";

const AdminDashboardLayout = ({ children }) => {
  const navigationData = useAdminDashboardNavigationStore((state) => state.navigationData);
  const { data: session } = useSession();
  const { logout, isPending: isLoggingOut } = useLogout({ redirectTo: "/admin/login" });

  return (
    <CommonDashboardLayout
      sidebarData={navigationData?.navMain}
      sidebarTitle={navigationData?.sidebarTitle}
      userMenu={
        <NavbarUserMenu
          name={session?.user?.email}
          role="Admin"
          href="/admin/dashboard/profile"
          onLogout={logout}
          isLoggingOut={isLoggingOut}
        />
      }
    >
      {children}
    </CommonDashboardLayout>
  );
};

export default AdminDashboardLayout;